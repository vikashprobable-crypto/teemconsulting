// Data Migration Tool - Clean localStorage and migrate to server files
class DataMigrationTool {
  constructor() {
    this.storageKey = 'websiteData'
  }

  // Get current data from localStorage
  getCurrentData() {
    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error reading localStorage:', error)
      return null
    }
  }

  // Export current data as JSON file
  exportData() {
    const data = this.getCurrentData()
    if (!data) {
      alert('No data found in localStorage')
      return
    }

    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = `website-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    console.log('Data exported successfully')
  }

  // Clean base64 images from data
  cleanBase64Images(data) {
    if (!data) return null

    const cleanedData = JSON.parse(JSON.stringify(data)) // Deep clone

    // Clean client logos
    if (cleanedData.clients) {
      cleanedData.clients = cleanedData.clients.map(client => {
        if (client.logo && client.logo.startsWith('data:')) {
          console.log(`Removing base64 logo for client: ${client.name}`)
          return { ...client, logo: '' }
        }
        return client
      })
    }

    // Clean gallery images
    if (cleanedData.gallery) {
      cleanedData.gallery = cleanedData.gallery.map(item => {
        if (item.image && item.image.startsWith('data:')) {
          console.log(`Removing base64 image for gallery item: ${item.title}`)
          return { ...item, image: '' }
        }
        return item
      })
    }

    // Clean team member photos
    if (cleanedData.team) {
      cleanedData.team = cleanedData.team.map(member => {
        if (member.photo && member.photo.startsWith('data:')) {
          console.log(`Removing base64 photo for team member: ${member.name}`)
          return { ...member, photo: '' }
        }
        return member
      })
    }

    return cleanedData
  }

  // Count base64 images in data
  countBase64Images(data) {
    if (!data) return { clients: 0, gallery: 0, team: 0, total: 0 }

    let counts = { clients: 0, gallery: 0, team: 0, total: 0 }

    // Count client logos
    if (data.clients) {
      counts.clients = data.clients.filter(client => 
        client.logo && client.logo.startsWith('data:')
      ).length
    }

    // Count gallery images
    if (data.gallery) {
      counts.gallery = data.gallery.filter(item => 
        item.image && item.image.startsWith('data:')
      ).length
    }

    // Count team photos
    if (data.team) {
      counts.team = data.team.filter(member => 
        member.photo && member.photo.startsWith('data:')
      ).length
    }

    counts.total = counts.clients + counts.gallery + counts.team
    return counts
  }

  // Calculate localStorage size
  getStorageSize() {
    try {
      const data = localStorage.getItem(this.storageKey)
      if (!data) return 0
      return new Blob([data]).size
    } catch (error) {
      console.error('Error calculating storage size:', error)
      return 0
    }
  }

  // Format bytes to human readable format
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Clear all website data from localStorage
  clearAllData() {
    try {
      localStorage.removeItem(this.storageKey)
      console.log('All website data cleared from localStorage')
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }

  // Save cleaned data back to localStorage
  saveCleanedData() {
    const currentData = this.getCurrentData()
    if (!currentData) {
      alert('No data found to clean')
      return
    }

    const counts = this.countBase64Images(currentData)
    const confirmMessage = `Found ${counts.total} base64 images:
- Client logos: ${counts.clients}
- Gallery images: ${counts.gallery}
- Team photos: ${counts.team}

Current storage size: ${this.formatBytes(this.getStorageSize())}

This will remove all base64 images and save cleaned data.
Make sure you have exported a backup first!

Continue with cleanup?`

    if (!confirm(confirmMessage)) {
      return
    }

    const cleanedData = this.cleanBase64Images(currentData)
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(cleanedData))
      
      const newSize = this.formatBytes(this.getStorageSize())
      const savedSpace = this.formatBytes(this.getStorageSize() - 
        (cleanedData ? new Blob([JSON.stringify(cleanedData)]).size : 0))
      
      console.log('Data cleaned successfully')
      console.log(`New storage size: ${newSize}`)
      console.log(`Space saved: ${savedSpace}`)
      
      alert(`Cleanup completed!
New storage size: ${newSize}
Space saved: ${savedSpace}

Please refresh the page to see changes.`)
      
      // Refresh page to show changes
      setTimeout(() => {
        window.location.reload()
      }, 2000)
      
    } catch (error) {
      console.error('Error saving cleaned data:', error)
      alert('Error saving cleaned data: ' + error.message)
    }
  }

  // Complete migration process
  async migrateToServer() {
    const currentData = this.getCurrentData()
    if (!currentData) {
      alert('No data found to migrate')
      return
    }

    console.log('Starting migration to server...')
    
    // First export backup
    this.exportData()
    
    // Then clean local data
    setTimeout(() => {
      this.saveCleanedData()
    }, 1000)
  }
}

// Create global instance
export const dataMigrationTool = new DataMigrationTool()

// Make available globally for console access
window.dataMigrationTool = dataMigrationTool

// Console commands for easy access:
// dataMigrationTool.exportData()           // Export backup
// dataMigrationTool.saveCleanedData()      // Clean base64 images
// dataMigrationTool.clearAllData()         // Clear everything
// dataMigrationTool.migrateToServer()      // Full migration
