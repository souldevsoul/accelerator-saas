import { NextRequest, NextResponse } from 'next/server'
import { prisma, MVP_COST } from 'db'
import { auth } from '@/auth'
import { reserveCredits, InsufficientCreditsError } from 'lib'
import { SandboxFactory } from '@/lib/sandbox/factory'
import { sandboxManager } from '@/lib/sandbox/sandbox-manager'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * POST /api/projects/generate
 * Create a new project and immediately start AI generation
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = session.user
    const body = await request.json()

    const { prompt, aiModel } = body

    if (!prompt || !aiModel) {
      return NextResponse.json(
        { error: 'Prompt and AI model are required' },
        { status: 400 }
      )
    }

    // Validate AI model
    const validModels = ['CLAUDE', 'ANTHROPIC', 'OPENAI', 'GEMINI', 'GROQ']
    if (!validModels.includes(aiModel)) {
      return NextResponse.json(
        { error: 'Invalid AI model selected' },
        { status: 400 }
      )
    }

    // Get or create user in database
    let dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: user.email!,
          name: user.name || user.email!.split('@')[0],
        },
      })

      // Create wallet for new user
      await prisma.wallet.create({
        data: {
          userId: dbUser.id,
          balance: 0,
        },
      })
    }

    // Reserve credits for generation
    try {
      await reserveCredits(
        dbUser.id,
        MVP_COST,
        'project_generation',
        'pending'
      )
    } catch (error) {
      if (error instanceof InsufficientCreditsError) {
        return NextResponse.json(
          { error: 'Insufficient credits. Please top up your wallet.' },
          { status: 402 }
        )
      }
      throw error
    }

    // Generate project name from prompt (first 50 chars)
    const name = prompt.slice(0, 50).trim() + (prompt.length > 50 ? '...' : '')

    // Create project
    const project = await prisma.project.create({
      data: {
        ownerId: dbUser.id,
        name,
        prompt,
        aiModel,
        status: 'mvp_pending',
      },
    })

    // Create AI run record
    const aiRun = await prisma.aIRun.create({
      data: {
        projectId: project.id,
        kind: 'mvp',
        status: 'queued',
        costCredits: MVP_COST,
      },
    })

    // Start generation in background (async)
    // In production, this would be queued to a background worker
    generateProject(project.id, aiRun.id, prompt, aiModel).catch((error) => {
      console.error('Background generation error:', error)
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    )
  }
}

/**
 * Background generation function
 * In production, this would be a separate worker/queue
 */
async function generateProject(
  projectId: string,
  aiRunId: string,
  prompt: string,
  aiModel: string
) {
  try {
    // Update status to running
    await prisma.aIRun.update({
      where: { id: aiRunId },
      data: { status: 'running' },
    })

    // Generate HTML code with AI
    const generatedCode = await generateCodeWithAI(prompt, aiModel)
    console.log('[Generation] AI generated code length:', generatedCode?.length || 0)
    console.log('[Generation] AI code preview (first 200 chars):', generatedCode?.substring(0, 200))

    // Create sandbox and get live preview URL
    let previewUrl = `/dashboard/projects/${projectId}/preview` // Fallback to static preview
    let sandboxId: string | null = null

    try {
      // Create sandbox provider
      const provider = SandboxFactory.create()

      // Create sandbox
      console.log('[Generation] Creating sandbox...')
      const sandboxInfo = await provider.createSandbox()
      sandboxId = sandboxInfo.sandboxId

      // Register with manager
      sandboxManager.registerSandbox(sandboxId, provider)

      // Setup Vite React app with Tailwind
      console.log('[Generation] Setting up Vite app...')
      await provider.setupViteApp()

      // Convert HTML to React component
      const reactComponent = convertHtmlToReact(generatedCode)
      console.log('[Generation] React component length:', reactComponent?.length || 0)
      console.log('[Generation] React component preview (first 300 chars):', reactComponent?.substring(0, 300))

      // Write React component to App.jsx
      console.log('[Generation] Writing component...')
      await provider.writeFile('src/App.jsx', reactComponent)

      // Get preview URL
      previewUrl = provider.getSandboxUrl() || previewUrl
      console.log('[Generation] Sandbox ready:', previewUrl)
    } catch (error) {
      console.error('[Generation] Sandbox setup failed, using static preview:', error)
      // Continue with static preview on error
    }

    // Update AI run with generated code and preview URL
    await prisma.aIRun.update({
      where: { id: aiRunId },
      data: {
        status: 'completed',
        generatedCode,
        previewUrl,
        sandboxId,
      },
    })

    // Update project status
    await prisma.project.update({
      where: { id: projectId },
      data: {
        status: 'mvp_preview',
      },
    })
  } catch (error) {
    console.error('Generation error:', error)

    // Update AI run status to failed
    await prisma.aIRun.update({
      where: { id: aiRunId },
      data: { status: 'failed' },
    })

    // Refund credits
    const { refundCredits } = await import('lib')
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })
    if (project) {
      await refundCredits(project.ownerId, MVP_COST, 'generation_failed', projectId)
    }
  }
}

/**
 * Generate code using AI
 * Calls the appropriate AI model API based on user selection
 */
async function generateCodeWithAI(prompt: string, aiModel: string): Promise<string> {
  const { createOpenAI } = await import('@ai-sdk/openai')
  const { createAnthropic } = await import('@ai-sdk/anthropic')
  const { createGoogleGenerativeAI } = await import('@ai-sdk/google')
  const { createGroq } = await import('@ai-sdk/groq')
  const { generateText } = await import('ai')

  // Determine which AI provider to use
  let model: any
  let modelName: string

  switch (aiModel) {
    case 'OPENAI':
      const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
      modelName = 'gpt-4-turbo'
      model = openai(modelName)
      break
    case 'CLAUDE':
    case 'ANTHROPIC':
      const anthropic = createAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      })
      modelName = 'claude-3-5-sonnet-20241022'
      model = anthropic(modelName)
      break
    case 'GEMINI':
      const gemini = createGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY,
      })
      modelName = 'gemini-2.0-flash-exp'
      model = gemini(modelName)
      break
    case 'GROQ':
      const groq = createGroq({
        apiKey: process.env.GROQ_API_KEY,
      })
      modelName = 'llama-3.3-70b-versatile'
      model = groq(modelName)
      break
    default:
      throw new Error(`Unsupported AI model: ${aiModel}`)
  }

  // Create a detailed system prompt for generating unique websites
  const systemPrompt = `You are an expert React developer. Generate a COMPLETE React component file (App.jsx) based on the user's description.

CRITICAL OUTPUT FORMAT:
- Return a complete, valid React component file
- Include ALL necessary imports (React, useState, useEffect, etc.)
- Include the full function declaration: export default function App() { ... }
- Include ALL hooks at the top of the component (before return)
- Include the complete return statement with JSX
- Do NOT wrap the code in \`\`\`jsx or \`\`\`javascript code fences
- Return ONLY valid JavaScript/JSX code - no explanations

CRITICAL REQUIREMENTS:
1. Create a UNIQUE, fully functional React component
2. Use modern React patterns (useState, useEffect, hooks)
3. Use Tailwind CSS classes for all styling (already configured - don't import)
4. Generate fully responsive, mobile-first designs
5. Include realistic, relevant content - NO lorem ipsum or placeholder text
6. Add interactive features where appropriate (buttons with onClick, forms, state management)
7. Use proper React best practices (hooks at top level, event handlers, etc.)
8. Include accessibility features (ARIA labels, semantic HTML)

APPLICATION STRUCTURE:
- Break complex UIs into multiple logical sections
- Use state management where needed (useState, useEffect)
- Include navigation if the app has multiple sections
- Add user interactions (buttons, forms, modals, dropdowns)
- Implement smooth animations and transitions using Tailwind
- Create a cohesive design system (colors, typography, spacing)

DESIGN GUIDELINES:
- Choose a color palette that matches the industry/topic
- Use modern design patterns (cards, gradients, shadows, glassmorphism)
- Ensure excellent mobile responsiveness
- Add micro-interactions and hover effects
- Follow modern UX best practices
- Create visual hierarchy with typography and spacing

CODE QUALITY:
- Use clean, maintainable code
- Follow React best practices
- Use JSX syntax correctly (className, htmlFor, self-closing tags)
- Use camelCase for SVG attributes (strokeWidth, fillRule, viewBox, etc.)
- Add helpful comments for complex logic
- Structure code for readability

INTERACTIVITY:
- Add state management for dynamic features
- Include form validation where applicable
- Implement smooth page transitions
- Add loading states for async operations
- Create interactive components (accordions, tabs, modals, etc.)

CRITICAL OUTPUT FORMAT:
- Return ONLY the React component code - NO markdown, NO code fences, NO explanations
- Start directly with the import statement
- Make it production-ready and impressive

Example output format:
import React, { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="...">
      ...your JSX here...
    </div>
  )
}`

  // Generate the React code using AI
  const result = await generateText({
    model,
    system: systemPrompt,
    prompt: `Create a complete React component (App.jsx) for: ${prompt}

Requirements:
- Make it a fully functional component with interactive features using hooks
- Include state management with useState where needed
- Add event handlers (onClick, onChange, etc.) for interactivity
- Use real, contextual content (no placeholders or lorem ipsum)
- Implement modern UI patterns and animations with Tailwind CSS
- Ensure mobile responsiveness
- Make it production-ready and visually impressive

CRITICAL: Return ONLY the complete App.jsx file code. Start with "import React" and end with the closing brace of the App function. No markdown, no code fences, no explanations.`,
    temperature: 0.7, // Balanced temperature for creativity and consistency
    maxTokens: 8000, // Increased token limit for more complex applications
  })

  return result.text
}

/**
 * Clean up generated React code
 * Removes markdown code fences and ensures proper formatting
 */
function convertHtmlToReact(code: string): string {
  // Remove markdown code fences if present
  code = code.replace(/```(?:jsx|javascript|js|tsx|ts)?\n?/g, '').replace(/```\s*$/g, '')

  // Remove any leading/trailing explanatory text
  // Look for the start of imports or the function declaration
  const codeStartMatch = code.match(/import\s+React|export\s+default\s+function/i)
  if (codeStartMatch && codeStartMatch.index && codeStartMatch.index > 0) {
    code = code.substring(codeStartMatch.index)
  }

  // Trim whitespace
  code = code.trim()

  console.log('[Conversion] Cleaned code length:', code.length)
  console.log('[Conversion] Code preview:', code.substring(0, 300))

  return code
}
