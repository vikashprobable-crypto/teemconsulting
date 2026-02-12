import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import uploadRoutes from './api/upload.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')))

// API routes
app.use('/api', uploadRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Upload server is running'
  })
})

// Create upload directories on startup
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log('📁 Created directory:', dir)
  }
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error)
  res.status(500).json({ error: error.message })
})

// Start server
app.listen(PORT, () => {
  console.log('🚀 Upload server started successfully!')
  console.log(`📡 Server running on: http://localhost:${PORT}`)
  console.log(`📁 Static files: ${path.join(__dirname, '../public')}`)
  console.log(`📸 Upload endpoint: http://localhost:${PORT}/api/upload`)
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`)
  
  // Create upload directories
  ensureDirExists(path.join(__dirname, '../public/uploads'))
  ensureDirExists(path.join(__dirname, '../public/uploads/logos'))
  ensureDirExists(path.join(__dirname, '../public/uploads/gallery'))
  ensureDirExists(path.join(__dirname, '../public/uploads/team'))
})
