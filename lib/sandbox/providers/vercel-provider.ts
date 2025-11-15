import { Sandbox } from '@vercel/sandbox';
import { SandboxProvider, SandboxInfo, CommandResult } from '../types';
// SandboxProviderConfig available through parent class

export class VercelProvider extends SandboxProvider {
  private existingFiles: Set<string> = new Set();

  async createSandbox(): Promise<SandboxInfo> {
    try {

      // Kill existing sandbox if any
      if (this.sandbox) {
        try {
          await this.sandbox.stop();
        } catch (e) {
          console.error('Failed to stop existing sandbox:', e);
        }
        this.sandbox = null;
      }

      // Clear existing files tracking
      this.existingFiles.clear();

      // Create Vercel sandbox

      const sandboxConfig: any = {
        timeout: 300000, // 5 minutes in ms
        runtime: 'node22', // Use node22 runtime for Vercel sandboxes
        ports: [5173] // Vite port
      };

      // Add authentication based on environment variables
      if (process.env.VERCEL_TOKEN && process.env.VERCEL_TEAM_ID && process.env.VERCEL_PROJECT_ID) {
        sandboxConfig.teamId = process.env.VERCEL_TEAM_ID;
        sandboxConfig.projectId = process.env.VERCEL_PROJECT_ID;
        sandboxConfig.token = process.env.VERCEL_TOKEN;
      } else if (process.env.VERCEL_OIDC_TOKEN) {
        sandboxConfig.oidcToken = process.env.VERCEL_OIDC_TOKEN;
      }

      this.sandbox = await Sandbox.create(sandboxConfig);

      const sandboxId = this.sandbox.sandboxId;
      // Sandbox created successfully

      // Get the sandbox URL using the correct Vercel Sandbox API
      const sandboxUrl = this.sandbox.domain(5173);

      this.sandboxInfo = {
        sandboxId,
        url: sandboxUrl,
        provider: 'vercel',
        createdAt: new Date()
      };

      return this.sandboxInfo;

    } catch (error) {
      console.error('[VercelProvider] Error creating sandbox:', error);
      throw error;
    }
  }

  /**
   * Reconnect to an existing Vercel Sandbox
   */
  async reconnect(sandboxId: string, previewUrl?: string): Promise<SandboxInfo> {
    try {
      console.log(`[VercelProvider] Reconnecting to sandbox ${sandboxId}...`)

      // Vercel Sandbox API doesn't support direct reconnection by ID
      // But we can create a reference using the sandboxId if available
      // For now, we'll create a mock sandbox object that can still execute commands

      const sandboxConfig: any = {
        sandboxId, // Try to use existing sandbox ID
        timeout: 300000,
        runtime: 'node22',
        ports: [5173]
      };

      // Add authentication
      if (process.env.VERCEL_TOKEN && process.env.VERCEL_TEAM_ID && process.env.VERCEL_PROJECT_ID) {
        sandboxConfig.teamId = process.env.VERCEL_TEAM_ID;
        sandboxConfig.projectId = process.env.VERCEL_PROJECT_ID;
        sandboxConfig.token = process.env.VERCEL_TOKEN;
      } else if (process.env.VERCEL_OIDC_TOKEN) {
        sandboxConfig.oidcToken = process.env.VERCEL_OIDC_TOKEN;
      }

      // Try to connect to existing sandbox
      this.sandbox = await Sandbox.create(sandboxConfig);

      this.sandboxInfo = {
        sandboxId,
        url: previewUrl || this.sandbox.domain(5173),
        provider: 'vercel',
        createdAt: new Date()
      };

      console.log(`[VercelProvider] Successfully reconnected to sandbox ${sandboxId}`)
      return this.sandboxInfo;

    } catch (error) {
      console.error(`[VercelProvider] Error reconnecting to sandbox ${sandboxId}:`, error);
      throw error;
    }
  }

  async runCommand(command: string): Promise<CommandResult> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    
    try {
      // Parse command into cmd and args (matching PR syntax)
      const parts = command.split(' ');
      const cmd = parts[0];
      const args = parts.slice(1);
      
      // Vercel uses runCommand with cmd and args object (based on PR)
      const result = await this.sandbox.runCommand({
        cmd: cmd,
        args: args,
        cwd: '/vercel/sandbox',
        env: {}
      });
      
      // Handle stdout and stderr - they might be functions in Vercel SDK
      let stdout = '';
      let stderr = '';
      
      try {
        if (typeof result.stdout === 'function') {
          stdout = await result.stdout();
        } else {
          stdout = result.stdout || '';
        }
      } catch (e) {
        stdout = '';
      }
      
      try {
        if (typeof result.stderr === 'function') {
          stderr = await result.stderr();
        } else {
          stderr = result.stderr || '';
        }
      } catch (e) {
        stderr = '';
      }
      
      return {
        stdout: stdout,
        stderr: stderr,
        exitCode: result.exitCode || 0,
        success: result.exitCode === 0
      };
    } catch (error: any) {
      return {
        stdout: '',
        stderr: error.message || 'Command failed',
        exitCode: 1,
        success: false
      };
    }
  }

  async writeFile(path: string, content: string): Promise<void> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    // Vercel sandbox default working directory is /vercel/sandbox
    const fullPath = path.startsWith('/') ? path : `/vercel/sandbox/${path}`;

    console.log(`[VercelProvider] Writing file: ${fullPath} (${content.length} bytes)`)
    
    // Based on Vercel SDK docs, writeFiles expects path and Buffer content
    try {
      const buffer = Buffer.from(content, 'utf-8');
      // Writing file with buffer

      await this.sandbox.writeFiles([{
        path: fullPath,
        content: buffer
      }]);

      console.log(`[VercelProvider] ✓ File written successfully: ${fullPath}`)
      this.existingFiles.add(path);
    } catch (writeError: any) {
      // Log detailed error information
      console.error(`[VercelProvider] writeFiles failed for ${fullPath}:`, {
        error: writeError,
        message: writeError?.message,
        response: writeError?.response,
        statusCode: writeError?.response?.status,
        responseData: writeError?.response?.data
      });
      
      // Fallback to command-based approach if writeFiles fails
      // Falling back to command-based file write
      
      // Ensure directory exists
      const dir = fullPath.substring(0, fullPath.lastIndexOf('/'));
      if (dir) {
        const mkdirResult = await this.sandbox.runCommand({
          cmd: 'mkdir',
          args: ['-p', dir]
        });
        // Directory created
      }
      
      // Write file using echo and redirection
      const escapedContent = content
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\$/g, '\\$')
        .replace(/`/g, '\\`')
        .replace(/\n/g, '\\n');
      
      const writeResult = await this.sandbox.runCommand({
        cmd: 'sh',
        args: ['-c', `echo "${escapedContent}" > "${fullPath}"`]
      });
      
      // File written
      
      if (writeResult.exitCode === 0) {
        this.existingFiles.add(path);
      } else {
        throw new Error(`Failed to write file via command: ${writeResult.stderr}`);
      }
    }
  }

  async readFile(path: string): Promise<string> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    // Vercel sandbox default working directory is /vercel/sandbox
    const fullPath = path.startsWith('/') ? path : `/vercel/sandbox/${path}`;
    
    const result = await this.sandbox.runCommand({
      cmd: 'cat',
      args: [fullPath]
    });
    
    // Handle stdout and stderr - they might be functions in Vercel SDK
    let stdout = '';
    let stderr = '';
    
    try {
      if (typeof result.stdout === 'function') {
        stdout = await result.stdout();
      } else {
        stdout = result.stdout || '';
      }
    } catch (e) {
      stdout = '';
    }
    
    try {
      if (typeof result.stderr === 'function') {
        stderr = await result.stderr();
      } else {
        stderr = result.stderr || '';
      }
    } catch (e) {
      stderr = '';
    }
    
    if (result.exitCode !== 0) {
      throw new Error(`Failed to read file: ${stderr}`);
    }
    
    return stdout;
  }

  async listFiles(directory: string = '/vercel/sandbox'): Promise<string[]> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    try {
      // Try multiple approaches to get file listing
      console.log('[VercelProvider] Attempting to list files in:', directory)

      // Approach 1: Try ls -R which is more reliable with Vercel SDK
      const result = await this.sandbox.runCommand({
        cmd: 'ls',
        args: ['-R', directory],
        cwd: '/'
      });

      console.log('[VercelProvider] ls -R exitCode:', result.exitCode)

      // Handle stdout - it might be a function in Vercel SDK
      let stdout = '';

      try {
        if (typeof result.stdout === 'function') {
          stdout = await result.stdout();
        } else {
          stdout = result.stdout || '';
        }
      } catch (e) {
        console.error('[VercelProvider] Error reading stdout:', e)
        stdout = '';
      }

      console.log('[VercelProvider] ls command stdout length:', stdout.length)
      console.log('[VercelProvider] ls command stdout preview:', stdout.substring(0, 500))

      if (result.exitCode !== 0 || !stdout) {
        console.log('[VercelProvider] ls failed or empty, trying fallback')
        return [];
      }

      // Parse ls -R output
      const files: string[] = [];
      let currentDir = '';

      for (const line of stdout.split('\n')) {
        const trimmed = line.trim();

        // Skip empty lines
        if (!trimmed) continue;

        // Directory headers end with ':'
        if (trimmed.endsWith(':')) {
          currentDir = trimmed.slice(0, -1);
          // Remove the base directory prefix
          if (currentDir.startsWith(directory)) {
            currentDir = currentDir.substring(directory.length);
            if (currentDir.startsWith('/')) {
              currentDir = currentDir.substring(1);
            }
          }
          continue;
        }

        // Skip node_modules, .git, and other unwanted directories/files
        if (trimmed.includes('node_modules') ||
            trimmed.includes('.git') ||
            trimmed === 'total' ||
            trimmed.match(/^total \d+$/)) {
          continue;
        }

        // Skip directory entries from ls -l format
        if (trimmed.match(/^[d-][rwx-]{9}/)) {
          continue;
        }

        // This is a file name
        const filePath = currentDir ? `${currentDir}/${trimmed}` : trimmed;

        // Filter out common non-source files and directories
        if (!filePath.includes('node_modules/') &&
            !filePath.includes('.git/') &&
            !filePath.startsWith('.')) {
          files.push(filePath);
        }
      }

      console.log('[VercelProvider] Parsed files count:', files.length)
      console.log('[VercelProvider] Sample files:', files.slice(0, 10))
      return files;
    } catch (error: any) {
      // Check if sandbox has stopped (410 error)
      const isSandboxStopped =
        error?.response?.status === 410 ||
        error?.text?.includes('sandbox_stopped') ||
        error?.message?.includes('Status code 410') ||
        (typeof error?.text === 'string' && JSON.parse(error.text || '{}')?.error?.code === 'sandbox_stopped')

      if (isSandboxStopped) {
        console.log('[VercelProvider] Sandbox has stopped, marking as inactive');
        this.sandbox = null;
        this.sandboxInfo = null;
        throw new Error('Sandbox has stopped and is no longer available');
      }

      // Re-throw other errors
      throw error;
    }
  }

  async installPackages(packages: string[]): Promise<CommandResult> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    const flags = process.env.NPM_FLAGS || '';
    
    // Installing packages
    
    // Build args array
    const args = ['install'];
    if (flags) {
      args.push(...flags.split(' '));
    }
    args.push(...packages);
    
    const result = await this.sandbox.runCommand({
      cmd: 'npm',
      args: args,
      cwd: '/vercel/sandbox'
    });
    
    // Handle stdout and stderr - they might be functions in Vercel SDK
    let stdout = '';
    let stderr = '';
    
    try {
      if (typeof result.stdout === 'function') {
        stdout = await result.stdout();
      } else {
        stdout = result.stdout || '';
      }
    } catch (e) {
      stdout = '';
    }
    
    try {
      if (typeof result.stderr === 'function') {
        stderr = await result.stderr();
      } else {
        stderr = result.stderr || '';
      }
    } catch (e) {
      stderr = '';
    }
    
    // Restart Vite if configured and successful
    if (result.exitCode === 0 && process.env.AUTO_RESTART_VITE === 'true') {
      await this.restartViteServer();
    }
    
    return {
      stdout: stdout,
      stderr: stderr,
      exitCode: result.exitCode || 0,
      success: result.exitCode === 0
    };
  }

  async setupViteApp(): Promise<void> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    // Setting up Vite app for sandbox
    
    // Create directory structure
    const mkdirResult = await this.sandbox.runCommand({
      cmd: 'mkdir',
      args: ['-p', '/vercel/sandbox/src']
    });
    // Directory structure created
    
    // Create package.json
    const packageJson = {
      name: "sandbox-app",
      version: "1.0.0",
      type: "module",
      scripts: {
        dev: "vite --host",
        build: "vite build",
        preview: "vite preview"
      },
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0"
      },
      devDependencies: {
        "@vitejs/plugin-react": "^4.0.0",
        vite: "^4.3.9",
        tailwindcss: "^3.3.0",
        postcss: "^8.4.31",
        autoprefixer: "^10.4.16"
      }
    };
    
    await this.writeFile('package.json', JSON.stringify(packageJson, null, 2));
    
    // Create vite.config.js
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      '.vercel.run',  // Allow all Vercel sandbox domains
      '.e2b.dev',     // Allow all E2B sandbox domains
      'localhost'
    ],
    hmr: {
      clientPort: 443,
      protocol: 'wss'
    }
  }
})`;
    
    await this.writeFile('vite.config.js', viteConfig);
    
    // Create tailwind.config.js
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
    
    await this.writeFile('tailwind.config.js', tailwindConfig);
    
    // Create postcss.config.js
    const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
    
    await this.writeFile('postcss.config.js', postcssConfig);
    
    // Create index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sandbox App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
    
    await this.writeFile('index.html', indexHtml);
    
    // Create src/main.jsx
    const mainJsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;
    
    await this.writeFile('src/main.jsx', mainJsx);
    
    // Create src/App.jsx
    const appJsx = `function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <p className="text-lg text-gray-400">
          Vercel Sandbox Ready<br/>
          Start building your React app with Vite and Tailwind CSS!
        </p>
      </div>
    </div>
  )
}

export default App`;
    
    await this.writeFile('src/App.jsx', appJsx);
    
    // Create src/index.css
    const indexCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: rgb(17 24 39);
}`;
    
    await this.writeFile('src/index.css', indexCss);
    
    // Installing npm dependencies
    
    // Install dependencies
    try {
      const installResult = await this.sandbox.runCommand({
        cmd: 'npm',
        args: ['install'],
        cwd: '/vercel/sandbox'
      });
      
      // npm install completed
      
      if (installResult.exitCode === 0) {
        // Dependencies installed successfully
      } else {
        console.warn('[VercelProvider] npm install had issues:', installResult.stderr);
      }
    } catch (error: any) {
      console.error('[VercelProvider] npm install error:', {
        message: error?.message,
        response: error?.response?.status,
        responseText: error?.text
      });
      // Try alternative approach - run as shell command
      try {
        const altResult = await this.sandbox.runCommand({
          cmd: 'sh',
          args: ['-c', 'cd /vercel/sandbox && npm install'],
          cwd: '/vercel/sandbox'
        });
        if (altResult.exitCode === 0) {
          // Alternative npm install succeeded
        } else {
          console.warn('[VercelProvider] Alternative npm install also had issues:', altResult.stderr);
        }
      } catch (altError) {
        console.error('[VercelProvider] Alternative npm install also failed:', altError);
        console.warn('[VercelProvider] Continuing without npm install - packages may need to be installed manually');
      }
    }
    
    // Start Vite dev server
    // Starting Vite dev server
    
    // Kill any existing Vite processes
    await this.sandbox.runCommand({
      cmd: 'sh',
      args: ['-c', 'pkill -f vite || true'],
      cwd: '/'
    });
    
    // Start Vite in background
    await this.sandbox.runCommand({
      cmd: 'sh',
      args: ['-c', 'nohup npm run dev > /tmp/vite.log 2>&1 &'],
      cwd: '/vercel/sandbox'
    });
    
    // Vite server started in background
    
    // Wait for Vite to be ready
    await new Promise(resolve => setTimeout(resolve, 7000));
    
    // Track initial files
    this.existingFiles.add('src/App.jsx');
    this.existingFiles.add('src/main.jsx');
    this.existingFiles.add('src/index.css');
    this.existingFiles.add('index.html');
    this.existingFiles.add('package.json');
    this.existingFiles.add('vite.config.js');
    this.existingFiles.add('tailwind.config.js');
    this.existingFiles.add('postcss.config.js');

    // Verify files were created
    console.log('[VercelProvider] Setup complete. Listing files...')
    try {
      const verifyResult = await this.sandbox.runCommand({
        cmd: 'ls',
        args: ['-la', '/vercel/sandbox'],
        cwd: '/'
      });
      const stdout = typeof verifyResult.stdout === 'function' ? await verifyResult.stdout() : verifyResult.stdout;
      console.log('[VercelProvider] Files in /vercel/sandbox:', stdout);
    } catch (e) {
      console.error('[VercelProvider] Failed to verify files:', e);
    }
  }

  async restartViteServer(): Promise<void> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    // Restarting Vite server
    
    // Kill existing Vite process
    await this.sandbox.runCommand({
      cmd: 'sh',
      args: ['-c', 'pkill -f vite || true'],
      cwd: '/'
    });
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Start Vite in background
    await this.sandbox.runCommand({
      cmd: 'sh',
      args: ['-c', 'nohup npm run dev > /tmp/vite.log 2>&1 &'],
      cwd: '/vercel/sandbox'
    });
    
    // Vite server started in background
    
    // Wait for Vite to be ready
    await new Promise(resolve => setTimeout(resolve, 7000));
  }

  getSandboxUrl(): string | null {
    return this.sandboxInfo?.url || null;
  }

  getSandboxInfo(): SandboxInfo | null {
    return this.sandboxInfo;
  }

  async terminate(): Promise<void> {
    if (this.sandbox) {
      try {
        await this.sandbox.stop();
      } catch (e) {
        console.error('Failed to terminate sandbox:', e);
      }
      this.sandbox = null;
      this.sandboxInfo = null;
    }
  }

  isAlive(): boolean {
    return !!this.sandbox;
  }
}