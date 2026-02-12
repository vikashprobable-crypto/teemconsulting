import { useState, useEffect } from 'react'
import { getWebsiteData, updateWebsiteData } from '../../data/websiteData'
import { handleImageUpload as uploadImage, getImageSrc } from '../../utils/fileUpload'

const GalleryManagement = () => {
  const [gallery, setGallery] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    image: ''
  })

  const categories = ['general', 'team', 'office', 'events', 'projects']

  useEffect(() => {
    // Load gallery data from centralized store
    const galleryData = getWebsiteData('gallery')
    if (galleryData) {
      setGallery(galleryData)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log('🔍 Gallery upload started:', { 
        name: file.name, 
        size: file.size, 
        type: file.type 
      })
      
      // Check file size (limit to 5MB for gallery images)
      if (file.size > 5 * 1024 * 1024) {
        alert('❌ File size must be less than 5MB. Current size: ' + (file.size / 1024 / 1024).toFixed(2) + 'MB')
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('❌ Only image files are allowed. Current type: ' + file.type)
        return
      }
      
      try {
        console.log('📤 Uploading gallery image to server...')
        const result = await uploadImage(file, 'uploads/gallery', 'gallery_')
        
        if (result.success) {
          console.log('✅ Gallery image uploaded successfully:', result.filePath)
          setFormData(prev => ({
            ...prev,
            image: result.filePath
          }))
          
          // Show success feedback
          const input = e.target
          const label = input.nextElementSibling
          if (label) {
            const originalText = label.textContent
            label.textContent = '✅ Upload Successful!'
            label.classList.add('text-green-600')
            setTimeout(() => {
              label.textContent = originalText
              label.classList.remove('text-green-600')
            }, 2000)
          }
        } else {
          console.error('❌ Gallery image upload failed:', result.error)
          alert('❌ Failed to upload image: ' + result.error)
        }
      } catch (error) {
        console.error('💥 Gallery image upload error:', error)
        
        // Provide specific error messages
        let errorMessage = 'Error uploading image. Please try again.'
        
        if (error.message.includes('fetch')) {
          errorMessage = '❌ Cannot connect to upload server. Please ensure the server is running.'
        } else if (error.message.includes('HTTP 404')) {
          errorMessage = '❌ Upload endpoint not found. Server configuration issue.'
        } else if (error.message.includes('HTTP 500')) {
          errorMessage = '❌ Server error during upload. Please try again.'
        } else if (error.message.includes('NetworkError')) {
          errorMessage = '❌ Network error. Please check your connection.'
        }
        
        alert(errorMessage)
      }
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'general',
      image: ''
    })
    setEditingItem(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    try {
      const currentGallery = getWebsiteData('gallery') || []
      
      let updatedGallery
      if (editingItem) {
        // Update existing item
        updatedGallery = currentGallery.map(item => 
          item.id === editingItem.id 
            ? { ...formData, id: editingItem.id }
            : item
        )
      } else {
        // Add new item
        const newId = Math.max(...currentGallery.map(item => item.id), 0) + 1
        updatedGallery = [...currentGallery, { ...formData, id: newId }]
      }

      console.log('Saving gallery items:', updatedGallery) // Debug log
      
      // Check localStorage quota before saving
      const dataSize = JSON.stringify(updatedGallery).length
      console.log('Data size:', dataSize, 'characters') // Debug log

      // Update centralized data store
      updateWebsiteData('gallery', updatedGallery)
      setGallery(updatedGallery)
      
      // Verify the data was saved
      const savedGallery = getWebsiteData('gallery')
      console.log('Saved gallery items:', savedGallery) // Debug log
      
      // Reset form and close modal
      resetForm()
      setShowAddModal(false)
    } catch (error) {
      console.error('Error saving gallery items:', error)
      alert('Error saving gallery data. The image might be too large. Please try with a smaller image.')
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image
    })
    setShowAddModal(true)
  }

  const handleDelete = (id) => {
    setItemToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    const updatedGallery = gallery.filter(item => item.id !== itemToDelete)
    setGallery(updatedGallery)
    
    // Update centralized data store
    updateWebsiteData('gallery', updatedGallery)
    
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setItemToDelete(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600 mt-1">Manage your photo gallery</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          ➕ Add Photo
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-w-16 aspect-h-12 bg-gray-200">
              <img
                src={getImageSrc(item.image)}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2 truncate">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Photos Yet</h3>
          <p className="text-gray-600 mb-4">Start building your gallery by adding your first photo.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            Add Your First Photo
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        {editingItem ? 'Edit Photo' : 'Add New Photo'}
                      </h3>
                      
                      {/* Image Upload */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Photo *
                        </label>
                        <div className="space-y-4">
                          {formData.image ? (
                            <div className="relative">
                              <img 
                                src={getImageSrc(formData.image)} 
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                                onError={(e) => {
                                  console.error('Image preview failed:', formData.image);
                                  e.target.src = '/placeholder-image.jpg';
                                }}
                              />
                              <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <input
                              type="file"
                              id="galleryImage"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <label
                              htmlFor="galleryImage"
                              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              Choose Photo
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                              JPG, PNG or GIF (Max 5MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                          Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                          placeholder="Enter photo title"
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                          placeholder="Enter photo description"
                        />
                      </div>

                      {/* Category */}
                      <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingItem ? 'Update Photo' : 'Add Photo'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm()
                      setShowAddModal(false)
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Photo
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this photo? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryManagement
