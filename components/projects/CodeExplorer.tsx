'use client'

import { useState, useEffect } from 'react'
import { File, Folder, FolderOpen, Code2, Loader2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeExplorerProps {
  sandboxId: string
}

interface FileNode {
  name: string
  path: string
  isDirectory: boolean
  children?: FileNode[]
}

export function CodeExplorer({ sandboxId }: CodeExplorerProps) {
  const [files, setFiles] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [loadingContent, setLoadingContent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch file list on mount
  useEffect(() => {
    fetchFiles()
  }, [sandboxId])

  const fetchFiles = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/sandbox/${sandboxId}/files`)

      if (!response.ok) {
        throw new Error('Failed to fetch files')
      }

      const data = await response.json()
      setFiles(data.files || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching files:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchFileContent = async (filePath: string) => {
    try {
      setLoadingContent(true)
      const response = await fetch(
        `/api/sandbox/${sandboxId}/read?path=${encodeURIComponent(filePath)}`
      )

      if (!response.ok) {
        throw new Error('Failed to read file')
      }

      const data = await response.json()
      setFileContent(data.content || '')
      setSelectedFile(filePath)
    } catch (err: any) {
      console.error('Error reading file:', err)
      setFileContent(`Error: ${err.message}`)
    } finally {
      setLoadingContent(false)
    }
  }

  const buildFileTree = (filePaths: string[]): FileNode[] => {
    const root: FileNode[] = []

    filePaths.forEach(path => {
      const parts = path.split('/')
      let currentLevel = root

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1
        const existingNode = currentLevel.find(node => node.name === part)

        if (existingNode) {
          if (!isLast && existingNode.children) {
            currentLevel = existingNode.children
          }
        } else {
          const newNode: FileNode = {
            name: part,
            path: parts.slice(0, index + 1).join('/'),
            isDirectory: !isLast,
            children: !isLast ? [] : undefined
          }
          currentLevel.push(newNode)
          if (!isLast && newNode.children) {
            currentLevel = newNode.children
          }
        }
      })
    })

    return root
  }

  const getLanguageFromPath = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase()
    const langMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'jsx',
      ts: 'typescript',
      tsx: 'tsx',
      json: 'json',
      html: 'html',
      css: 'css',
      md: 'markdown',
      sh: 'bash',
    }
    return langMap[ext || ''] || 'text'
  }

  const FileTreeNode = ({ node, level = 0 }: { node: FileNode; level?: number }) => {
    const [isOpen, setIsOpen] = useState(level < 2)

    if (node.isDirectory) {
      return (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded w-full text-left text-sm"
            style={{ paddingLeft: `${level * 16 + 8}px` }}
          >
            {isOpen ? (
              <FolderOpen className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-blue-500" />
            )}
            <span className="text-gray-700">{node.name}</span>
          </button>
          {isOpen && node.children && (
            <div>
              {node.children.map((child, index) => (
                <FileTreeNode key={`${child.path}-${index}`} node={child} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <button
        onClick={() => fetchFileContent(node.path)}
        className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded w-full text-left text-sm ${
          selectedFile === node.path ? 'bg-blue-50' : ''
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <File className="w-4 h-4 text-gray-400" />
        <span className="text-gray-700">{node.name}</span>
      </button>
    )
  }

  const fileTree = buildFileTree(files)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Code2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-4 h-[600px]">
      {/* File Tree Sidebar */}
      <div className="col-span-3 bg-white border border-gray-200 rounded-lg overflow-y-auto">
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-4 py-3">
          <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
            <Folder className="w-4 h-4" />
            Project Files
          </h3>
        </div>
        <div className="p-2">
          {fileTree.map((node, index) => (
            <FileTreeNode key={`${node.path}-${index}`} node={node} />
          ))}
        </div>
      </div>

      {/* Code Viewer */}
      <div className="col-span-9 bg-white border border-gray-200 rounded-lg overflow-hidden">
        {selectedFile ? (
          <>
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{selectedFile}</span>
              </div>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(600px - 40px)' }}>
              {loadingContent ? (
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : (
                <SyntaxHighlighter
                  language={getLanguageFromPath(selectedFile)}
                  style={vscDarkPlus}
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    fontSize: '13px',
                  }}
                >
                  {fileContent}
                </SyntaxHighlighter>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Code2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a file to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
