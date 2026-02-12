# Server-Side File Upload System - Setup Guide

## 🚀 Overview
This system saves photos as actual files on the server instead of using localStorage, making them available when you deploy your website.

## 📁 File Structure
```
d:\teem\
├── server/
│   ├── index.js              # Express server
│   └── api/
│       └── upload.js         # Upload API endpoints
├── src/
│   └── utils/
│       └── fileUpload.js     # Upload utility
├── public/
│   └── uploads/              # Uploaded images folder
│       ├── logos/            # Client logos
│       ├── gallery/          # Gallery images
│       └── team/             # Team photos
└── package.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install express multer cors concurrently nodemon
```

### 2. Start Development Server
```bash
npm run dev
```
This starts both the Vite dev server (port 5173) and Express upload server (port 3001)

### 3. Start Production Server
```bash
npm run build
npm start
```

## 📸 How It Works

### Development Mode
- Images are saved as base64 in localStorage (fallback)
- Works without server setup
- Good for local development

### Production Mode
- Images are uploaded to server via API
- Saved as actual files in `/public/uploads/`
- Accessible via URLs like `/uploads/logos/filename.jpg`

## 🔧 API Endpoints

### Upload Image
```
POST /api/upload
Content-Type: multipart/form-data

Body:
- file: (image file)
- folder: "uploads/logos" or "uploads/gallery"
```

### Delete Image
```
POST /api/delete
Content-Type: application/json

Body:
{
  "filePath": "uploads/logos/filename.jpg"
}
```

### List Files
```
GET /api/list/gallery
```

## 📱 Usage in Components

### Upload Handler
```javascript
import { handleImageUpload, getImageSrc } from '../../utils/fileUpload'

const handleLogoUpload = async (e) => {
  const file = e.target.files[0]
  const result = await handleImageUpload(file, 'uploads/logos', 'client_logo_')
  
  if (result.success) {
    setFormData(prev => ({ ...prev, logo: result.filePath }))
  }
}
```

### Display Images
```javascript
<img src={getImageSrc(client.logo)} alt={client.name} />
```

## 🌐 Deployment Options

### Option 1: Single Server Deployment
1. Build the React app: `npm run build`
2. Deploy `dist/` folder and `server/` folder to same server
3. Install dependencies and run: `npm start`

### Option 2: Separate Servers
1. Deploy React app to hosting service (Vercel, Netlify)
2. Deploy Express server to Node.js hosting
3. Update API URLs in fileUpload.js

### Option 3: Cloud Storage
Replace local file storage with cloud services like:
- AWS S3
- Cloudinary
- Firebase Storage

## 🔒 Security Considerations

### File Upload Security
- File type validation (images only)
- File size limits (2MB logos, 5MB gallery)
- Unique filename generation
- Malicious file scanning

### Production Security
- Use HTTPS in production
- Add authentication to upload endpoints
- Implement rate limiting
- Sanitize file names

## 🚨 Troubleshooting

### Common Issues

#### 1. Upload Fails
- Check if server is running on port 3001
- Verify file size limits
- Check browser console for errors

#### 2. Images Not Displaying
- Verify files exist in `/public/uploads/`
- Check file permissions
- Ensure correct file paths

#### 3. CORS Errors
- Check Vite proxy configuration
- Verify server CORS settings

### Debug Mode
Enable console logging to see upload progress:
```javascript
console.log('Uploading:', file.name)
console.log('Result:', result)
```

## 📊 File Management

### Automatic Organization
- Client logos → `/uploads/logos/`
- Gallery images → `/uploads/gallery/`
- Team photos → `/uploads/team/`

### File Naming
```
Format: {prefix}_{name}_{timestamp}_{random}.{ext}
Example: client_logo_mycompany_1640995200000_abc123.jpg
```

### Cleanup
- Implement automatic cleanup of unused files
- Add file management interface in admin panel
- Monitor storage usage

## 🔄 Migration from localStorage

### Current Data Migration
1. Extract base64 images from localStorage
2. Convert to files and upload to server
3. Update data references to file paths
4. Clear localStorage image data

### Backup Strategy
```javascript
// Export current data
const data = localStorage.getItem('websiteData')
downloadAsJSON(data, 'website-backup.json')
```

## 🎯 Next Steps

1. **Test the upload system** with various image types
2. **Implement file management** in admin panel
3. **Add image optimization** for better performance
4. **Set up backup system** for uploaded files
5. **Configure CDN** for production deployment

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify server is running correctly
3. Check file permissions in uploads folder
4. Review API endpoint responses
