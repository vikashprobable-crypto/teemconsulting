// Remove React imports from utility file
// import { useState, useEffect } from 'react'

class AdminLogger {
  constructor() {
    this.logs = []
    this.maxLogs = 100 // Keep only last 100 logs
    this.initializeLogs()
  }

  initializeLogs() {
    try {
      const savedLogs = localStorage.getItem('adminLogs')
      this.logs = savedLogs ? JSON.parse(savedLogs) : []
    } catch (error) {
      console.error('Error loading admin logs:', error)
      this.logs = []
    }
  }

  saveLogs() {
    try {
      localStorage.setItem('adminLogs', JSON.stringify(this.logs))
    } catch (error) {
      console.error('Error saving admin logs:', error)
    }
  }

  log(action, details = {}) {
    const logEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action: action,
      details: details,
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId()
    }

    this.logs.unshift(logEntry)
    
    // Keep only last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs)
    }

    this.saveLogs()
    console.log(`[Admin Log] ${action}:`, details)
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('adminSessionId')
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      sessionStorage.setItem('adminSessionId', sessionId)
    }
    return sessionId
  }

  getLogs() {
    return this.logs
  }

  clearLogs() {
    this.logs = []
    this.saveLogs()
    sessionStorage.removeItem('adminSessionId')
  }

  getLogsByAction(action) {
    return this.logs.filter(log => log.action === action)
  }

  getLogsByDateRange(startDate, endDate) {
    return this.logs.filter(log => {
      const logDate = new Date(log.timestamp)
      return logDate >= startDate && logDate <= endDate
    })
  }

  exportLogs() {
    const dataStr = JSON.stringify(this.logs, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `admin_logs_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  getStats() {
    const stats = {
      totalLogs: this.logs.length,
      sessions: new Set(this.logs.map(log => log.sessionId)).size,
      actions: {},
      todayLogs: 0,
      weeklyLogs: 0
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    this.logs.forEach(log => {
      // Count by action
      stats.actions[log.action] = (stats.actions[log.action] || 0) + 1

      // Count today's logs
      if (new Date(log.timestamp) >= today) {
        stats.todayLogs++
      }

      // Count weekly logs
      if (new Date(log.timestamp) >= weekAgo) {
        stats.weeklyLogs++
      }
    })

    return stats
  }
}

// Create singleton instance
let adminLoggerInstance = null

export const getAdminLogger = () => {
  if (!adminLoggerInstance) {
    adminLoggerInstance = new AdminLogger()
  }
  return adminLoggerInstance
}

// Export singleton for direct use
export const adminLogger = getAdminLogger()

// React hook for components to use logging
import { useState, useEffect } from 'react'

export const useAdminLogger = () => {
  const [logs, setLogs] = useState([])
  
  useEffect(() => {
    setLogs(adminLogger.getLogs())
    
    // Listen for storage changes from other tabs
    const handleStorageChange = () => {
      setLogs(adminLogger.getLogs())
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('adminLogUpdated', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('adminLogUpdated', handleStorageChange)
    }
  }, [])

  const logAction = (action, details) => {
    adminLogger.log(action, details)
    setLogs(adminLogger.getLogs())
    
    // Trigger custom event for immediate updates
    window.dispatchEvent(new Event('adminLogUpdated'))
  }

  const getLogs = () => adminLogger.getLogs()
  const clearLogs = () => {
    adminLogger.clearLogs()
    setLogs([])
    window.dispatchEvent(new Event('adminLogUpdated'))
  }
  const exportLogs = () => adminLogger.exportLogs()
  const getStats = () => adminLogger.getStats()

  return {
    logAction,
    getLogs,
    clearLogs,
    exportLogs,
    getStats,
    logs // Provide logs state for immediate updates
  }
}
