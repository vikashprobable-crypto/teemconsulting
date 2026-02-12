import { useState, useEffect } from 'react'
import { assetManager } from '../../utils/assetManager'

const AssetsManagement = () => {
  const [assets, setAssets] = useState({})
  const [stats, setStats] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('uploadedAt')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    const loadAssets = () => {
      const allAssets = assetManager.getAllAssets()
      const storageStats = assetManager.getStorageStats()
      setAssets(allAssets)
      setStats(storageStats)
    }

    loadAssets()

    // Listen for asset changes
    const handleAssetChange = () => loadAssets()
    window.addEventListener('assetsUpdated', handleAssetChange)
    
    return () => window.removeEventListener('assetsUpdated', handleAssetChange)
  }, [])

  const saveAsset = async (file, category) => {
    try {
      const result = await assetManager.saveAsset(file, category)
      window.dispatchEvent(new CustomEvent('assetsUpdated'))
      return result
    } catch (error) {
      throw error
    }
  }

  const deleteAsset = (filename) => {
    assetManager.deleteAsset(filename)
    window.dispatchEvent(new CustomEvent('assetsUpdated'))
  }

  const exportAssets = () => {
    assetManager.exportAssets()
  }

  const importAssets = async (file) => {
    return await assetManager.importAssets(file)
  }

  const cleanupOldAssets = (days) => {
    return assetManager.cleanupOldAssets(days)
  }

  const categories = ['all', 'team', 'clients', 'gallery', 'general']

  const filteredAssets = Object.values(assets).filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    const matchesSearch = asset.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.filename.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  }).sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]
    const multiplier = sortOrder === 'asc' ? 1 : -1
    
    if (sortBy === 'uploadedAt') {
      return multiplier * (new Date(aValue) - new Date(bValue))
    }
    return multiplier * aValue.localeCompare(bValue)
  })

  const handleFileUpload = async (files, category) => {
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        await saveAsset(file, category || 'general')
        setUploadProgress(((i + 1) / files.length) * 100)
      }
    } catch (error) {
      alert(`Upload failed: ${error.message}`)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files, selectedCategory === 'all' ? 'general' : selectedCategory)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const result = await importAssets(file)
      alert(`Successfully imported ${result.imported} assets`)
    } catch (error) {
      alert(`Import failed: ${error.message}`)
    }
  }

  const handleCleanup = () => {
    const days = prompt('Delete assets older than how many days?', '30')
    if (days && !isNaN(days)) {
      const deletedCount = cleanupOldAssets(parseInt(days))
      alert(`Cleaned up ${deletedCount} old assets`)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assets Management</h1>
          <p className="text-gray-600 mt-1">Manage your photos, logos, and media files</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => exportAssets()}
            className="btn-secondary"
          >
            📥 Export
          </button>
          <label className="btn-secondary cursor-pointer">
            📤 Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={handleCleanup}
            className="btn-secondary"
          >
            🧹 Cleanup
          </button>
        </div>
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{stats.totalAssets || 0}</div>
          <div className="text-sm text-gray-600">Total Assets</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{stats.formattedTotalSize || '0 Bytes'}</div>
          <div className="text-sm text-gray-600">Storage Used</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900">{Object.keys(stats.categoryStats || {}).length}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900">5MB</div>
          <div className="text-sm text-gray-600">Max File Size</div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-primary-400 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="mb-4">
          <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Supports JPG, PNG, GIF, WebP (Max 5MB per file)
        </p>
        <div className="flex items-center justify-center space-x-4">
          <label className="btn-primary cursor-pointer">
            Choose Files
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(Array.from(e.target.files), selectedCategory === 'all' ? 'general' : selectedCategory)}
              className="hidden"
              disabled={isUploading}
            />
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        {isUploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Uploading... {Math.round(uploadProgress)}%</p>
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="uploadedAt">Sort by Date</option>
            <option value="originalName">Sort by Name</option>
            <option value="category">Sort by Category</option>
            <option value="size">Sort by Size</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAssets.map((asset) => (
          <div key={asset.filename} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="aspect-w-16 aspect-h-12 bg-gray-100">
              <img
                src={asset.data}
                alt={asset.originalName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 truncate">{asset.originalName}</h3>
              <p className="text-sm text-gray-600 mb-2 truncate">{asset.filename}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span className="bg-gray-100 px-2 py-1 rounded">{asset.category}</span>
                <span>{assetManager.formatFileSize(asset.size)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(asset.data)}
                    className="text-primary-600 hover:text-primary-900"
                    title="Copy URL"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <a
                    href={asset.data}
                    download={asset.originalName}
                    className="text-primary-600 hover:text-primary-900"
                    title="Download"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${asset.originalName}?`)) {
                      deleteAsset(asset.filename)
                    }
                  }}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assets Found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'No assets match your search.' : 'No assets uploaded yet.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default AssetsManagement
