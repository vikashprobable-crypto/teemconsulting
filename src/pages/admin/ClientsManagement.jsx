import { useState, useEffect } from 'react'
import { getWebsiteData, updateWebsiteData } from '../../data/websiteData'
import { handleImageUpload as uploadImage, getImageSrc } from '../../utils/fileUpload'
import { uploadDebugger } from '../../utils/uploadDebugger'

const ClientsManagement = () => {
  const [clients, setClients] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [clientToDelete, setClientToDelete] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    logo: ''
  })

  useEffect(() => {
    // Load clients data from centralized store
    const clientsData = getWebsiteData('clients')
    if (clientsData) {
      setClients(clientsData)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        return
      }
      
      try {
        console.log('🔍 Starting logo upload process...')
        console.log('📄 File details:', {
          name: file.name,
          size: file.size,
          type: file.type
        })
        
        const result = await uploadImage(file, 'uploads/logos', 'client_logo_')
        
        console.log('📥 Upload result:', result)
        
        if (result.success) {
          console.log('✅ Logo uploaded successfully:', result.filePath)
          setFormData(prev => ({
            ...prev,
            logo: result.filePath
          }))
        } else {
          console.error('❌ Logo upload failed:', result.error)
          alert(`Upload failed: ${result.error}`)
        }
      } catch (error) {
        console.error('💥 Logo upload error:', error)
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        })
        alert(`Error uploading logo: ${error.message}`)
      }
    }
  }

  const removeLogo = () => {
    setFormData(prev => ({
      ...prev,
      logo: ''
    }))
  }

  // Debug function to test upload
  const handleDebugUpload = async () => {
    console.log('🔍 Starting debug upload test...')
    await uploadDebugger.runFullDiagnostic()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      logo: ''
    })
    setEditingClient(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    try {
      const currentClients = getWebsiteData('clients') || []
      
      let updatedClients
      if (editingClient) {
        // Update existing client
        updatedClients = currentClients.map(client => 
          client.id === editingClient.id 
            ? { ...formData, id: editingClient.id }
            : client
        )
      } else {
        // Add new client
        const newId = Math.max(...currentClients.map(client => client.id), 0) + 1
        updatedClients = [...currentClients, { ...formData, id: newId }]
      }

      console.log('Saving clients:', updatedClients) // Debug log
      
      // Check localStorage quota before saving
      const dataSize = JSON.stringify(updatedClients).length
      console.log('Data size:', dataSize, 'characters') // Debug log
      
      // Update centralized data store
      updateWebsiteData('clients', updatedClients)
      setClients(updatedClients)
      
      // Verify the data was saved
      const savedClients = getWebsiteData('clients')
      console.log('Saved clients:', savedClients) // Debug log
      
      // Reset form and close modal
      resetForm()
      setShowAddModal(false)
    } catch (error) {
      console.error('Error saving clients:', error)
      alert('Error saving client data. The image might be too large. Please try with a smaller image.')
    }
  }

  const handleEdit = (client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      logo: client.logo
    })
    setShowAddModal(true)
  }

  const handleDelete = (id) => {
    setClientToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    const updatedClients = clients.filter(client => client.id !== clientToDelete)
    setClients(updatedClients)
    
    // Update centralized data store
    updateWebsiteData('clients', updatedClients)
    
    setShowDeleteModal(false)
    setClientToDelete(null)
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setClientToDelete(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">Manage your client logos and information</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleDebugUpload}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm"
          >
            🔍 Debug Upload
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            ➕ Add Client
          </button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-w-16 aspect-h-8 bg-gray-100 p-8 flex items-center justify-center">
              <img
                src={getImageSrc(client.logo)}
                alt={client.name}
                className="max-h-16 w-auto object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3 truncate">{client.name}</h3>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="text-primary-600 hover:text-primary-900"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Clients Yet</h3>
          <p className="text-gray-600 mb-4">Start building your client portfolio by adding your first client.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            Add Your First Client
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
                        {editingClient ? 'Edit Client' : 'Add New Client'}
                      </h3>
                      
                      {/* Logo Upload */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Client Logo *
                        </label>
                        <div className="space-y-4">
                          {formData.logo ? (
                            <div className="relative">
                              <img 
                                src={getImageSrc(formData.logo)} 
                                alt="Logo preview"
                                className="w-full h-32 object-contain bg-gray-100 rounded-lg p-4"
                              />
                              <button
                                type="button"
                                onClick={removeLogo}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <input
                              type="file"
                              id="clientLogo"
                              accept="image/*"
                              onChange={handleLogoUpload}
                              className="hidden"
                            />
                            <label
                              htmlFor="clientLogo"
                              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              Choose Logo
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                              JPG, PNG or GIF (Max 5MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Client Name */}
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Client Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                          placeholder="Enter client name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingClient ? 'Update Client' : 'Add Client'}
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
                      Delete Client
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this client? This action cannot be undone.
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

export default ClientsManagement
