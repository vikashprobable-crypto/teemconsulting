const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'public/uploads';
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Ensure upload directories exist
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    if (NODE_ENV === 'development') {
      console.log('📁 Created directory:', dir);
    }
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder || 'uploads';
    const uploadDir = path.join(__dirname, '..', UPLOAD_DIR, folder);
    ensureDirExists(uploadDir);
    if (NODE_ENV === 'development') {
      console.log('💾 Saving file to:', uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const extension = path.extname(file.originalname);
    const name = path.basename(file.originalname, extension);
    const filename = `${name}_${timestamp}_${random}${extension}`;
    if (NODE_ENV === 'development') {
      console.log('📝 Generated filename:', filename);
    }
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Upload server is running',
    environment: NODE_ENV,
    version: '1.0.0'
  });
});

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (NODE_ENV === 'development') {
      console.log('📤 Upload request received');
      console.log('📁 Folder:', req.body.folder);
      console.log('📄 File:', req.file ? req.file.originalname : 'No file');
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const folder = req.body.folder || 'uploads';
    const filePath = `${folder}/${req.file.filename}`;
    
    if (NODE_ENV === 'development') {
      console.log('✅ Upload successful:', filePath);
      console.log('📊 File size:', req.file.size, 'bytes');
    }
    
    res.json({
      success: true,
      filePath: filePath,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ error: 'Upload failed: ' + error.message });
  }
});

// Delete endpoint
app.post('/api/delete', (req, res) => {
  try {
    const { filePath } = req.body;
    
    if (!filePath) {
      return res.status(400).json({ error: 'File path required' });
    }

    const fullPath = path.join(__dirname, '..', UPLOAD_DIR, filePath);
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      if (NODE_ENV === 'development') {
        console.log('🗑️ File deleted:', fullPath);
      }
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// List files endpoint
app.get('/api/list/:folder?', (req, res) => {
  try {
    const folder = req.params.folder || 'uploads';
    const folderPath = path.join(__dirname, '..', UPLOAD_DIR, folder);
    
    if (!fs.existsSync(folderPath)) {
      return res.json({ files: [] });
    }

    const files = fs.readdirSync(folderPath).map(file => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        path: `${folder}/${file}`,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      };
    });

    res.json({ files });
  } catch (error) {
    console.error('❌ List error:', error);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

// Serve React app for production
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large' });
  }
  
  res.status(500).json({ 
    error: NODE_ENV === 'production' ? 'Internal server error' : error.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Upload server started successfully!`);
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`📁 Upload directory: ${path.join(__dirname, '..', UPLOAD_DIR)}`);
  console.log(`📸 Upload endpoint: http://localhost:${PORT}/api/upload`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  
  // Create upload directories
  ensureDirExists(path.join(__dirname, '..', UPLOAD_DIR));
  ensureDirExists(path.join(__dirname, '..', UPLOAD_DIR, 'logos'));
  ensureDirExists(path.join(__dirname, '..', UPLOAD_DIR, 'gallery'));
  ensureDirExists(path.join(__dirname, '..', UPLOAD_DIR, 'team'));
  
  if (NODE_ENV === 'development') {
    console.log('✅ Server is ready to accept uploads!');
  }
});

module.exports = app;
