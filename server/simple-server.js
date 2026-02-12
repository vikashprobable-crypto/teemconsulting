const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Ensure upload directories exist
const ensureDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('📁 Created directory:', dir);
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder || 'uploads';
    const uploadDir = path.join(__dirname, '../public', folder);
    ensureDirExists(uploadDir);
    console.log('💾 Saving file to:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const extension = path.extname(file.originalname);
    const name = path.basename(file.originalname, extension);
    const filename = `${name}_${timestamp}_${random}${extension}`;
    console.log('📝 Generated filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
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
    message: 'Upload server is running'
  });
});

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    console.log('📤 Upload request received');
    console.log('📁 Folder:', req.body.folder);
    console.log('📄 File:', req.file ? req.file.originalname : 'No file');
    
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const folder = req.body.folder || 'uploads';
    const filePath = `${folder}/${req.file.filename}`;
    
    console.log('✅ Upload successful:', filePath);
    console.log('📊 File size:', req.file.size, 'bytes');
    
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

    const fullPath = path.join(__dirname, '../public', filePath);
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log('🗑️ File deleted:', fullPath);
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
    const folderPath = path.join(__dirname, '../public', folder);
    
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

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Server error:', error);
  res.status(500).json({ error: error.message });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Upload server started successfully!');
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`📁 Static files: ${path.join(__dirname, '../public')}`);
  console.log(`📸 Upload endpoint: http://localhost:${PORT}/api/upload`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📋 List files: http://localhost:${PORT}/api/list`);
  
  // Create upload directories
  ensureDirExists(path.join(__dirname, '../public/uploads'));
  ensureDirExists(path.join(__dirname, '../public/uploads/logos'));
  ensureDirExists(path.join(__dirname, '../public/uploads/gallery'));
  ensureDirExists(path.join(__dirname, '../public/uploads/team'));
  
  console.log('✅ Server is ready to accept uploads!');
});

module.exports = app;
