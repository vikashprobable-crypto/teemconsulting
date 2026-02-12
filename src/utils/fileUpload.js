// File upload utility for saving images to server
class FileUploadManager {
  constructor() {
    // Use environment variable or fallback to relative URL
    this.uploadUrl = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/upload` : '/api/upload'
    // Prefer the API server for serving uploaded files when configured
    this.baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_APP_URL || window.location.origin
  }

  // Upload file to server
  async uploadFile(file, folder = 'uploads') {
    console.log('📤 uploadFile called:', { file: file.name, folder })
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)
      
      console.log('🌐 Making request to:', this.uploadUrl)
      console.log('📋 FormData contents:')
      console.log('  - file:', file.name, `(${file.size} bytes)`)
      console.log('  - folder:', folder)

      const response = await fetch(this.uploadUrl, {
        method: 'POST',
        body: formData
      })

      console.log('📡 Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Response not OK:', errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`)
      }

      const result = await response.json()
      console.log('✅ Upload response parsed:', result)
      return result
    } catch (error) {
      console.error('💥 Upload failed:', error)
      console.error('Error type:', error.constructor.name)
      console.error('Error message:', error.message)
      
      // Check for specific error types
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return {
          success: false,
          error: 'Network error - server not reachable. Make sure upload server is running on port 3001.'
        }
      } else if (error.message.includes('Failed to fetch')) {
        return {
          success: false,
          error: 'Cannot connect to upload server. Please start the server with "npm run server".'
        }
      } else {
        return {
          success: false,
          error: error.message
        }
      }
    }
  }

  // Convert base64 to file and upload
  async uploadBase64Image(base64Data, fileName, folder = 'uploads') {
    try {
      // Convert base64 to blob
      const response = await fetch(base64Data)
      const blob = await response.blob()
      
      // Create file from blob
      const file = new File([blob], fileName, { type: blob.type })
      
      // Upload the file
      return await this.uploadFile(file, folder)
    } catch (error) {
      console.error('Base64 upload error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Delete file from server
  async deleteFile(filePath) {
    try {
      const response = await fetch('/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filePath })
      })

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`)
      }

      return { success: true }
    } catch (error) {
      console.error('Delete error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Get full URL for a file path
  getFileUrl(filePath) {
    const base = String(this.baseUrl || '').replace(/\/+$/, '')
    const path = String(filePath || '').replace(/^\/+/, '')
    return `${base}/${path}`
  }

  // Generate unique filename
  generateFileName(originalName, prefix = '') {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substr(2, 9)
    const extension = originalName.split('.').pop()
    const nameWithoutExt = originalName.split('.').slice(0, -1).join('.')
    
    return `${prefix}${nameWithoutExt}_${timestamp}_${random}.${extension}`
  }
}

export const fileUploadManager = new FileUploadManager()

// Helper function to handle image uploads with fallback
export const handleImageUpload = async (file, folder, prefix = '') => {
  console.log('🚀 handleImageUpload called with:', { file: file.name, folder, prefix })
  
  // Try server upload first (even in development)
  try {
    console.log('📡 Attempting server upload...')
    console.log('🌐 Upload URL:', '/api/upload')
    
    const result = await fileUploadManager.uploadFile(file, folder)
    
    console.log('📊 Server upload result:', result)
    
    if (result.success) {
      console.log('✅ Server upload successful:', result.filePath)
      return {
        ...result,
        isBase64: false
      }
    } else {
      console.log('❌ Server upload returned failure:', result.error)
    }
  } catch (error) {
    console.log('💥 Server upload failed with exception:', error)
    console.log('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    })
  }

  // Fallback to base64 if server is not available
  console.log('🔄 Using base64 fallback...')
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      console.log('✅ Base64 fallback completed')
      resolve({
        success: true,
        filePath: reader.result, // base64 for development
        isBase64: true
      })
    }
    reader.onerror = (error) => {
      console.error('❌ Base64 fallback failed:', error)
      resolve({
        success: false,
        error: 'Base64 fallback failed: ' + error.message
      })
    }
    reader.readAsDataURL(file)
  })
}

// Helper function to display images (handles both base64 and file paths)
export const getImageSrc = (imagePath) => {
  if (!imagePath) return ''

  // Normalize Windows paths (backslashes) and strip leading public/
  const normalized = String(imagePath)
    .replace(/\\/g, '/')
    .replace(/^public\//, '')
  
  // If it's a base64 string, return as is
  if (normalized.startsWith('data:')) {
    return normalized
  }

  // If it's already a full URL (or blob), return as is
  if (/^(https?:)?\/\//i.test(normalized) || normalized.startsWith('blob:')) {
    return normalized
  }
  
  // If it's a relative path, convert to full URL
  if (
    normalized.startsWith('/uploads/') ||
    normalized.startsWith('uploads/') ||
    normalized.startsWith('/public/uploads/') ||
    normalized.startsWith('public/uploads/')
  ) {
    const cleaned = normalized.replace(/^\/?public\//, '/')
    return fileUploadManager.getFileUrl(cleaned.startsWith('/') ? cleaned : `/${cleaned}`)
  }
  
  // Otherwise, return as is
  return normalized
}
