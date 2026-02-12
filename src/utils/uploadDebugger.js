// Upload Debug Tool - Helps troubleshoot upload issues
class UploadDebugger {
  constructor() {
    // Use environment variable or fallback to localhost
    this.serverUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
  }

  // Test server connection
  async testServerConnection() {
    try {
      console.log('🔍 Testing server connection...')
      const response = await fetch(`${this.serverUrl}/api/health`)
      const data = await response.json()
      console.log('✅ Server is running:', data)
      return true
    } catch (error) {
      console.error('❌ Server connection failed:', error.message)
      console.log('💡 Make sure server is running with: npm run server')
      return false
    }
  }

  // Test upload with detailed logging
  async testUpload(file) {
    if (!file) {
      console.error('❌ No file provided')
      return
    }

    console.log('🧪 Starting upload test...')
    console.log('📄 File info:', {
      name: file.name,
      size: file.size,
      type: file.type
    })

    try {
      // Create FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'uploads/test')

      console.log('📤 Sending upload request...')

      // Send request with detailed logging
      const response = await fetch(`${this.serverUrl}/api/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary
      })

      console.log('📡 Response status:', response.status)
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

      const data = await response.json()
      console.log('📥 Response data:', data)

      if (data.success) {
        console.log('✅ Upload successful!')
        console.log('📁 File path:', data.filePath)
        console.log('🌐 File URL:', `${this.serverUrl}/${data.filePath}`)
        
        // Test if file is accessible
        await this.testFileAccess(data.filePath)
      } else {
        console.error('❌ Upload failed:', data.error)
      }

      return data
    } catch (error) {
      console.error('❌ Upload error:', error)
      return { success: false, error: error.message }
    }
  }

  // Test if uploaded file is accessible
  async testFileAccess(filePath) {
    try {
      console.log('🔍 Testing file access...')
      const response = await fetch(`${this.serverUrl}/${filePath}`)
      console.log('📡 File response status:', response.status)
      
      if (response.ok) {
        console.log('✅ File is accessible via URL')
        console.log('🌐 File URL:', `${this.serverUrl}/${filePath}`)
      } else {
        console.error('❌ File not accessible:', response.status)
      }
    } catch (error) {
      console.error('❌ File access error:', error)
    }
  }

  // List files in upload directory
  async listUploads(folder = 'uploads') {
    try {
      console.log(`📋 Listing files in ${folder}...`)
      const response = await fetch(`${this.serverUrl}/api/list/${folder}`)
      const data = await response.json()
      
      console.log('📁 Files:', data.files)
      
      if (data.files.length === 0) {
        console.log('📭 No files found in upload directory')
      } else {
        console.log(`📊 Found ${data.files.length} files:`)
        data.files.forEach(file => {
          console.log(`  📄 ${file.name} (${file.size} bytes)`)
        })
      }
      
      return data.files
    } catch (error) {
      console.error('❌ List files error:', error)
      return []
    }
  }

  // Create test file and upload
  async createAndUploadTestFile() {
    console.log('🎨 Creating test file...')
    
    // Create a simple test image
    const canvas = document.createElement('canvas')
    canvas.width = 200
    canvas.height = 200
    const ctx = canvas.getContext('2d')
    
    // Draw a simple test image
    ctx.fillStyle = '#3B82F6'
    ctx.fillRect(0, 0, 200, 200)
    ctx.fillStyle = 'white'
    ctx.font = '20px Arial'
    ctx.fillText('TEST', 70, 100)
    
    // Convert to blob
    canvas.toBlob(async (blob) => {
      const testFile = new File([blob], 'test-upload.jpg', { type: 'image/jpeg' })
      console.log('📄 Test file created:', testFile)
      
      // Test upload
      await this.testUpload(testFile)
      
      // List files after upload
      setTimeout(() => {
        this.listUploads('uploads')
      }, 1000)
    }, 'image/jpeg')
  }

  // Full diagnostic test
  async runFullDiagnostic() {
    console.log('🔬 Starting full upload diagnostic...')
    
    // Step 1: Test server connection
    const serverOk = await this.testServerConnection()
    if (!serverOk) return
    
    // Step 2: List current files
    await this.listUploads()
    
    // Step 3: Create and upload test file
    await this.createAndUploadTestFile()
    
    console.log('🏁 Diagnostic complete!')
  }
}

// Create global instance
export const uploadDebugger = new UploadDebugger()

// Make available globally
if (typeof window !== 'undefined') {
  window.uploadDebugger = uploadDebugger
  
  console.log('🔧 Upload debugger available!')
  console.log('💻 Run uploadDebugger.runFullDiagnostic() for complete test')
  console.log('💻 Or run individual tests:')
  console.log('   uploadDebugger.testServerConnection()')
  console.log('   uploadDebugger.listUploads()')
  console.log('   uploadDebugger.createAndUploadTestFile()')
}

export default uploadDebugger
