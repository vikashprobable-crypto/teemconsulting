// Simple upload test script
const testUpload = async () => {
  try {
    console.log('🧪 Testing upload server...');
    
    // Test health endpoint
    const healthResponse = await fetch('http://localhost:3001/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
    
    // Create a test file
    const testBlob = new Blob(['test image data'], { type: 'image/jpeg' });
    const testFile = new File([testBlob], 'test.jpg', { type: 'image/jpeg' });
    
    // Test upload
    const formData = new FormData();
    formData.append('file', testFile);
    formData.append('folder', 'uploads/test');
    
    const uploadResponse = await fetch('http://localhost:3001/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const uploadData = await uploadResponse.json();
    console.log('✅ Upload test:', uploadData);
    
    if (uploadData.success) {
      console.log('🎉 Upload server is working correctly!');
      console.log('📁 File saved to:', uploadData.filePath);
    } else {
      console.log('❌ Upload failed:', uploadData.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure the server is running with: npm run server');
  }
};

// Auto-run if in browser
if (typeof window !== 'undefined') {
  window.testUpload = testUpload;
  console.log('💻 Run testUpload() in console to test the server');
}

export default testUpload;
