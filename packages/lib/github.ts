import { App } from '@octokit/app'
import { Octokit } from '@octokit/rest'

const GITHUB_ENABLED = !!(process.env.GITHUB_APP_ID && process.env.GITHUB_PRIVATE_KEY)

const app = GITHUB_ENABLED
  ? new App({
      appId: process.env.GITHUB_APP_ID!,
      privateKey: process.env.GITHUB_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    })
  : null

export function isGitHubConfigured(): boolean {
  return GITHUB_ENABLED
}

/**
 * Get authenticated Octokit instance for the installation
 */
export async function getOctokit(): Promise<Octokit> {
  if (!GITHUB_ENABLED || !app) {
    throw new Error('GitHub App is not configured')
  }

  if (!process.env.GITHUB_INSTALLATION_ID) {
    throw new Error('Missing GitHub installation ID')
  }

  const octokit = await app.getInstallationOctokit(
    parseInt(process.env.GITHUB_INSTALLATION_ID)
  )

  return octokit as unknown as Octokit
}

/**
 * Create a new branch in a repository
 * @param repoFullName - Repository in format "owner/repo"
 * @param branchName - Name of the new branch
 * @param baseBranch - Base branch to create from (default: "main")
 */
export async function createBranch(
  repoFullName: string,
  branchName: string,
  baseBranch = 'main'
): Promise<void> {
  const [owner, repo] = repoFullName.split('/')
  const octokit = await getOctokit()

  // Get base branch ref
  const { data: ref } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${baseBranch}`,
  })

  // Create new branch
  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: ref.object.sha,
  })
}

/**
 * Create or update a file in a repository
 * @param repoFullName - Repository in format "owner/repo"
 * @param branch - Branch name
 * @param filePath - Path to the file
 * @param content - File content
 * @param message - Commit message
 */
export async function createOrUpdateFile(
  repoFullName: string,
  branch: string,
  filePath: string,
  content: string,
  message: string
): Promise<void> {
  const [owner, repo] = repoFullName.split('/')
  const octokit = await getOctokit()

  // Try to get existing file
  let sha: string | undefined

  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    })

    if ('sha' in data) {
      sha = data.sha
    }
  } catch (error: any) {
    if (error.status !== 404) throw error
  }

  // Create or update file
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message,
    content: Buffer.from(content).toString('base64'),
    branch,
    sha,
  })
}

/**
 * Create a pull request
 * @param repoFullName - Repository in format "owner/repo"
 * @param title - PR title
 * @param head - Head branch
 * @param base - Base branch (default: "main")
 * @param body - PR description
 * @returns PR URL
 */
export async function createPullRequest(
  repoFullName: string,
  title: string,
  head: string,
  base = 'main',
  body?: string
): Promise<string> {
  const [owner, repo] = repoFullName.split('/')
  const octokit = await getOctokit()

  const { data: pr } = await octokit.pulls.create({
    owner,
    repo,
    title,
    head,
    base,
    body,
  })

  return pr.html_url
}

/**
 * Close a pull request
 * @param repoFullName - Repository in format "owner/repo"
 * @param prNumber - PR number
 */
export async function closePullRequest(
  repoFullName: string,
  prNumber: number
): Promise<void> {
  const [owner, repo] = repoFullName.split('/')
  const octokit = await getOctokit()

  await octokit.pulls.update({
    owner,
    repo,
    pull_number: prNumber,
    state: 'closed',
  })
}

/**
 * Get pull request status
 * @param repoFullName - Repository in format "owner/repo"
 * @param prNumber - PR number
 * @returns PR data including state and merged status
 */
export async function getPullRequest(repoFullName: string, prNumber: number) {
  const [owner, repo] = repoFullName.split('/')
  const octokit = await getOctokit()

  const { data } = await octokit.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
  })

  return {
    state: data.state,
    merged: data.merged,
    mergedAt: data.merged_at,
    closedAt: data.closed_at,
    url: data.html_url,
  }
}

/**
 * Verify GitHub webhook signature
 * @param payload - Request body
 * @param signature - X-Hub-Signature-256 header
 * @returns True if signature is valid
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  if (!process.env.GITHUB_WEBHOOK_SECRET) {
    throw new Error('Missing GitHub webhook secret')
  }

  const crypto = require('crypto')
  const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}
