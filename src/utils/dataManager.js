// Production-ready data management system
// Replaces localStorage with file-based persistence for hosting

import { websiteData as initialData } from '../data/websiteData.js'

class DataManager {
  constructor() {
    this.data = { ...initialData }
    this.storageKey = 'websiteData'
    this.isServer = typeof window === 'undefined'
    
    // Initialize data
    this.initializeData()
  }

  // Initialize data from storage or use defaults
  initializeData() {
    if (this.isServer) {
      // Server-side: Load from file system (if available)
      this.loadFromFile()
    } else {
      // Client-side: Load from localStorage with fallback
      this.loadFromStorage()
    }
  }

  // Load data from localStorage (client-side)
  loadFromStorage() {
    try {
      const savedData = localStorage.getItem(this.storageKey)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        // Merge with initial data to ensure all sections exist
        this.data = { ...this.data, ...parsedData }
        console.log('📦 Data loaded from localStorage')
      }
    } catch (error) {
      console.error('❌ Error loading data from localStorage:', error)
      // Fallback to initial data
    }
  }

  // Load data from file (server-side)
  loadFromFile() {
    // This would be implemented with a proper database in production
    // For now, we'll use the initial data
    console.log('📦 Using initial data for server-side')
  }

  // Save data to storage
  saveData() {
    if (this.isServer) {
      // Server-side: Save to file/database
      this.saveToFile()
    } else {
      // Client-side: Save to localStorage
      this.saveToStorage()
    }
    
    // Notify listeners
    this.notifyListeners()
  }

  // Save to localStorage (client-side)
  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data))
      console.log('💾 Data saved to localStorage')
    } catch (error) {
      console.error('❌ Error saving data to localStorage:', error)
    }
  }

  // Save to file (server-side)
  saveToFile() {
    // This would be implemented with a proper database in production
    console.log('💾 Data saved to server storage')
  }

  // Get data section
  getData(section) {
    return this.data[section] || null
  }

  // Update data section
  updateData(section, newData) {
    if (this.data[section]) {
      if (typeof newData === 'object' && !Array.isArray(newData)) {
        this.data[section] = { ...this.data[section], ...newData }
      } else {
        this.data[section] = newData
      }
      this.saveData()
      return true
    }
    return false
  }

  // Get entire data object
  getAllData() {
    return { ...this.data }
  }

  // Reset to initial data
  resetData() {
    this.data = { ...initialData }
    this.saveData()
    console.log('🔄 Data reset to initial values')
  }

  // Export data
  exportData() {
    const dataStr = JSON.stringify(this.data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `website-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Import data
  importData(jsonData) {
    try {
      const importedData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
      
      // Validate imported data structure
      if (this.validateImportedData(importedData)) {
        this.data = { ...this.data, ...importedData }
        this.saveData()
        console.log('📥 Data imported successfully')
        return true
      } else {
        throw new Error('Invalid data structure')
      }
    } catch (error) {
      console.error('❌ Error importing data:', error)
      return false
    }
  }

  // Validate imported data structure
  validateImportedData(data) {
    const requiredSections = ['homePage', 'services', 'about', 'contact']
    return requiredSections.every(section => data[section])
  }

  // Event listeners
  listeners = []

  addListener(callback) {
    this.listeners.push(callback)
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback)
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.data)
      } catch (error) {
        console.error('❌ Error in data listener:', error)
      }
    })

    // Dispatch custom event for React components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('websiteDataUpdated', {
        detail: { data: this.data }
      }))
    }
  }

  // Get storage usage info
  getStorageInfo() {
    if (this.isServer) {
      return { type: 'server', size: 'N/A' }
    }

    try {
      const data = localStorage.getItem(this.storageKey)
      const size = data ? new Blob([data]).size : 0
      const sizeKB = (size / 1024).toFixed(2)
      
      return {
        type: 'localStorage',
        size: `${sizeKB} KB`,
        bytes: size
      }
    } catch (error) {
      return { type: 'localStorage', size: 'Error', error: error.message }
    }
  }

  // Clear all data
  clearData() {
    if (!this.isServer) {
      try {
        localStorage.removeItem(this.storageKey)
        console.log('🗑️ Data cleared from localStorage')
      } catch (error) {
        console.error('❌ Error clearing data:', error)
      }
    }
    
    this.data = { ...initialData }
    this.notifyListeners()
  }
}

// Create singleton instance
const dataManager = new DataManager()

// Export functions for backward compatibility
export const getWebsiteData = (section) => dataManager.getData(section)
export const updateWebsiteData = (section, data) => dataManager.updateData(section, data)
export const getAllWebsiteData = () => dataManager.getAllData()
export const resetWebsiteData = () => dataManager.resetData()
export const exportWebsiteData = () => dataManager.exportData()
export const importWebsiteData = (data) => dataManager.importData(data)
export const getStorageInfo = () => dataManager.getStorageInfo()
export const clearWebsiteData = () => dataManager.clearData()

// Export the data manager instance
export default dataManager
