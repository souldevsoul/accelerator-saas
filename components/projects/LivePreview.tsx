'use client'

import { useState, useEffect, useRef } from 'react'
import { Code2, Monitor, Smartphone, Tablet, RefreshCw, ExternalLink, FolderTree } from 'lucide-react'
import { CodeExplorer } from './CodeExplorer'

type PreviewMode = 'desktop' | 'tablet' | 'mobile' | 'code' | 'files'

interface LivePreviewProps {
  code: string
  projectId: string
  previewUrl?: string | null
  sandboxId?: string | null
}

export function LivePreview({ code, projectId, previewUrl, sandboxId }: LivePreviewProps) {
  const [mode, setMode] = useState<PreviewMode>('desktop')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeKey, setIframeKey] = useState(0)
  // Only use previewUrl if it's a valid external URL (Vercel Sandbox)
  const hasLivePreview = !!previewUrl && (previewUrl.startsWith('http://') || previewUrl.startsWith('https://'))

  // Handle anchor links inside iframe
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleIframeLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
        if (!iframeDoc) return

        // Add event listener to all anchor links
        iframeDoc.addEventListener('click', (e) => {
          const target = e.target as HTMLElement
          const anchor = target.closest('a')

          if (anchor && anchor.hash) {
            e.preventDefault()
            const targetElement = iframeDoc.querySelector(anchor.hash)
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' })
            }
          }
        })
      } catch (error) {
        console.error('Error handling iframe links:', error)
      }
    }

    iframe.addEventListener('load', handleIframeLoad)
    return () => iframe.removeEventListener('load', handleIframeLoad)
  }, [iframeKey])

  const refresh = () => {
    setIsRefreshing(true)
    setIframeKey(prev => prev + 1)
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const openInNewTab = () => {
    if (hasLivePreview && previewUrl) {
      window.open(previewUrl, '_blank')
    } else {
      const blob = new Blob([code], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    }
  }

  const getPreviewWidth = () => {
    switch (mode) {
      case 'mobile':
        return '375px'
      case 'tablet':
        return '768px'
      case 'desktop':
      case 'code':
      default:
        return '100%'
    }
  }

  const modes = [
    { id: 'desktop' as PreviewMode, icon: Monitor, label: 'Desktop' },
    { id: 'tablet' as PreviewMode, icon: Tablet, label: 'Tablet' },
    { id: 'mobile' as PreviewMode, icon: Smartphone, label: 'Mobile' },
    { id: 'code' as PreviewMode, icon: Code2, label: 'Code' },
    ...(hasLivePreview && sandboxId ? [{ id: 'files' as PreviewMode, icon: FolderTree, label: 'Files' }] : []),
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Modern Preview Controls */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mode Switcher - Modern Tab Design */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 gap-1">
            {modes.map((modeItem) => {
              const Icon = modeItem.icon
              const isActive = mode === modeItem.id
              return (
                <button
                  key={modeItem.id}
                  onClick={() => setMode(modeItem.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                    transition-all duration-200 ease-in-out
                    ${isActive
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : ''}`} />
                  <span className="hidden sm:inline">{modeItem.label}</span>
                  {isActive && (
                    <div className="absolute inset-0 ring-2 ring-blue-500/20 rounded-md pointer-events-none" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Action Buttons - Modern Design */}
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh preview"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={openInNewTab}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100
                       transition-colors duration-200"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100">
        {mode === 'code' ? (
          <div className="p-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-400 ml-2">Generated HTML</span>
              </div>
              <pre className="text-gray-100 p-6 overflow-x-auto text-sm leading-relaxed max-h-[600px] overflow-y-auto">
                <code className="font-mono">{code}</code>
              </pre>
            </div>
          </div>
        ) : mode === 'files' && hasLivePreview && sandboxId ? (
          <div className="p-6">
            <CodeExplorer sandboxId={sandboxId} />
          </div>
        ) : (
          <div className="flex justify-center p-6 min-h-[600px]">
            <div
              className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                width: getPreviewWidth(),
                minHeight: '600px',
              }}
            >
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={hasLivePreview ? previewUrl! : undefined}
                srcDoc={hasLivePreview ? undefined : code}
                className="w-full h-full border-0"
                style={{ minHeight: '600px' }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                title="Live Preview"
              />
            </div>
          </div>
        )}
      </div>

      {/* Preview Info */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500">
            {mode === 'code'
              ? 'Generated HTML source code'
              : mode === 'files'
                ? 'Vercel Sandbox - Project file explorer'
                : hasLivePreview
                  ? 'Vercel Sandbox - Live interactive preview'
                  : 'Live preview - Interactive navigation enabled'
            }
          </p>
          {mode !== 'code' && mode !== 'files' && (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs">{hasLivePreview ? 'Vercel Sandbox' : 'Live'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
