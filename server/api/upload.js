import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Ensure upload directories exist
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder || 'uploads'
    const uploadDir = path.join(process.cwd(), 'public', folder)
    ensureDirExists(uploadDir)
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 9)
    const extension = path.extname(file.originalname)
    const name = path.basename(file.originalname, extension)
    cb(null, `${name}_${timestamp}_${random}${extension}`)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'), false)
    }
  }
})

// Upload endpoint
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    console.log('📤 Upload request received')
    console.log('📁 Folder:', req.body.folder)
    console.log('📄 File:', req.file ? req.file.originalname : 'No file')
    
    if (!req.file) {
      console.log('❌ No file uploaded')
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const folder = req.body.folder || 'uploads'
    const filePath = `${folder}/${req.file.filename}`
    
    console.log('✅ Upload successful:', filePath)
    console.log('📊 File size:', req.file.size, 'bytes')
    
    res.json({
      success: true,
      filePath: filePath,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    })
  } catch (error) {
    console.error('❌ Upload error:', error)
    res.status(500).json({ error: 'Upload failed: ' + error.message })
  }
})

// Delete endpoint
router.post('/delete', (req, res) => {
  try {
    const { filePath } = req.body
    
    if (!filePath) {
      return res.status(400).json({ error: 'File path required' })
    }

    const fullPath = path.join(process.cwd(), 'public', filePath)
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
      res.json({ success: true })
    } else {
      res.status(404).json({ error: 'File not found' })
    }
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: 'Delete failed' })
  }
})

// List files endpoint (optional)
router.get('/list/:folder?', (req, res) => {
  try {
    const folder = req.params.folder || 'uploads'
    const folderPath = path.join(process.cwd(), 'public', folder)
    
    if (!fs.existsSync(folderPath)) {
      return res.json({ files: [] })
    }

    const files = fs.readdirSync(folderPath).map(file => ({
      name: file,
      path: `${folder}/${file}`,
      size: fs.statSync(path.join(folderPath, file)).size
    }))

    res.json({ files })
  } catch (error) {
    console.error('List error:', error)
    res.status(500).json({ error: 'Failed to list files' })
  }
})

export default router
