// Asset Manager for handling file uploads and organizing assets
class AssetManager {
  constructor() {
    this.assetsPath = '/assets'
    this.imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    this.maxFileSize = 5 * 1024 * 1024 // 5MB
  }

  // Validate file type and size
  validateFile(file) {
    if (!this.imageTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload JPG, PNG, GIF, or WebP images.')
    }

    if (file.size > this.maxFileSize) {
      throw new Error('File size too large. Maximum size is 5MB.')
    }

    return true
  }

  // Generate unique filename
  generateFilename(originalName, category) {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const extension = originalName.split('.').pop()
    return `${category}/${timestamp}_${randomString}.${extension}`
  }

  // Convert file to base64 and save to assets
  async saveAsset(file, category = 'general') {
    this.validateFile(file)

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const base64Data = e.target.result
          const filename = this.generateFilename(file.name, category)
          
          // Save to localStorage assets registry
          this.saveAssetRegistry(filename, file.name, category, base64Data)
          
          resolve({
            filename,
            originalName: file.name,
            category,
            data: base64Data,
            url: base64Data // For immediate use
          })
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  // Save asset information to registry
  saveAssetRegistry(filename, originalName, category, data) {
    const registry = this.getAssetRegistry()
    const assetInfo = {
      filename,
      originalName,
      category,
      data,
      uploadedAt: new Date().toISOString(),
      size: this.getDataSize(data)
    }

    registry[filename] = assetInfo
    localStorage.setItem('assetsRegistry', JSON.stringify(registry))
  }

  // Get assets registry from localStorage
  getAssetRegistry() {
    const saved = localStorage.getItem('assetsRegistry')
    return saved ? JSON.parse(saved) : {}
  }

  // Get asset by filename
  getAsset(filename) {
    const registry = this.getAssetRegistry()
    return registry[filename] || null
  }

  // Get all assets by category
  getAssetsByCategory(category) {
    const registry = this.getAssetRegistry()
    return Object.values(registry).filter(asset => asset.category === category)
  }

  // Get all assets
  getAllAssets() {
    return this.getAssetRegistry()
  }

  // Delete asset
  deleteAsset(filename) {
    const registry = this.getAssetRegistry()
    delete registry[filename]
    localStorage.setItem('assetsRegistry', JSON.stringify(registry))
  }

  // Estimate data size
  getDataSize(data) {
    if (!data) return 0
    const base64Length = data.length - 'data:image/jpeg;base64,'.length
    return Math.round(base64Length * 0.75) // Approximate size in bytes
  }

  // Format file size for display
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Get storage usage statistics
  getStorageStats() {
    const registry = this.getAssetRegistry()
    const assets = Object.values(registry)
    
    const totalSize = assets.reduce((sum, asset) => sum + (asset.size || 0), 0)
    const categoryStats = {}
    
    assets.forEach(asset => {
      if (!categoryStats[asset.category]) {
        categoryStats[asset.category] = { count: 0, size: 0 }
      }
      categoryStats[asset.category].count++
      categoryStats[asset.category].size += asset.size || 0
    })

    return {
      totalAssets: assets.length,
      totalSize,
      formattedTotalSize: this.formatFileSize(totalSize),
      categoryStats
    }
  }

  // Clean up old assets (older than specified days)
  cleanupOldAssets(daysOld = 30) {
    const registry = this.getAssetRegistry()
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)

    let deletedCount = 0
    Object.keys(registry).forEach(filename => {
      const asset = registry[filename]
      const uploadDate = new Date(asset.uploadedAt)
      
      if (uploadDate < cutoffDate) {
        delete registry[filename]
        deletedCount++
      }
    })

    localStorage.setItem('assetsRegistry', JSON.stringify(registry))
    return deletedCount
  }

  // Export assets data for backup
  exportAssets() {
    const registry = this.getAssetRegistry()
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      assets: registry,
      stats: this.getStorageStats()
    }
    
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `assets_backup_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    
    URL.revokeObjectURL(url)
  }

  // Import assets from backup
  importAssets(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        try {
          const importData = JSON.parse(e.target.result)
          
          if (importData.version && importData.assets) {
            localStorage.setItem('assetsRegistry', JSON.stringify(importData.assets))
            resolve({
              imported: Object.keys(importData.assets).length,
              stats: importData.stats
            })
          } else {
            reject(new Error('Invalid backup file format'))
          }
        } catch (error) {
          reject(new Error('Failed to parse backup file'))
        }
      }

      reader.onerror = () => reject(new Error('Failed to read backup file'))
      reader.readAsText(file)
    })
  }
}

// Create singleton instance
export const assetManager = new AssetManager()

// React hook for asset management
export const useAssetManager = () => {
  const [assets, setAssets] = useState({})
  const [stats, setStats] = useState({})

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

  return {
    assets,
    stats,
    saveAsset,
    deleteAsset,
    getAsset: assetManager.getAsset.bind(assetManager),
    getAssetsByCategory: assetManager.getAssetsByCategory.bind(assetManager),
    exportAssets: assetManager.exportAssets.bind(assetManager),
    importAssets: assetManager.importAssets.bind(assetManager),
    cleanupOldAssets: assetManager.cleanupOldAssets.bind(assetManager)
  }
}
