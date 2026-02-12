#!/usr/bin/env node

// Upload Server Startup Script
// This script ensures the upload server is running properly

import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🚀 Starting Upload Server Setup...')

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules')
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...')
  const installProcess = spawn('npm', ['install'], {
    stdio: 'inherit',
    shell: true
  })
  
  installProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Dependencies installed successfully')
      startServer()
    } else {
      console.error('❌ Failed to install dependencies')
      process.exit(1)
    }
  })
} else {
  console.log('✅ Dependencies already installed')
  startServer()
}

function startServer() {
  console.log('🔧 Starting upload server...')
  
  const serverProcess = spawn('node', ['server/index.js'], {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
  })
  
  serverProcess.on('error', (error) => {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  })
  
  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`)
  })
  
  // Handle shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...')
    serverProcess.kill('SIGINT')
    process.exit(0)
  })
  
  console.log('📡 Server starting on http://localhost:3001')
  console.log('💡 Use Ctrl+C to stop the server')
}
