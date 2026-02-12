import { useState, useEffect, createContext, useContext } from 'react'
import { adminLogger } from '../utils/adminLogger'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  // Admin credentials (in production, these should be properly secured)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123',
    email: 'admin@teemconsulting.com'
  }

  // Check authentication status on load
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    const authData = localStorage.getItem('adminAuth')
    const lockData = localStorage.getItem('adminLock')
    
    if (lockData) {
      const lock = JSON.parse(lockData)
      const now = Date.now()
      if (lock.lockUntil > now) {
        setIsLocked(true)
        setIsLoading(false)
        return
      } else {
        localStorage.removeItem('adminLock')
        setIsLocked(false)
        setLoginAttempts(0)
      }
    }

    if (authData) {
      try {
        const { isAuthenticated: auth, user: userData, expires } = JSON.parse(authData)
        if (expires > Date.now() && auth) {
          setIsAuthenticated(true)
          setUser(userData)
        } else {
          logout()
        }
      } catch (error) {
        logout()
      }
    }
    setIsLoading(false)
  }

  const login = async (username, password) => {
    if (isLocked) {
      return {
        success: false,
        error: 'Account temporarily locked due to too many failed attempts. Please try again later.'
      }
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const userData = {
        username: ADMIN_CREDENTIALS.username,
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
        lastLogin: new Date().toISOString()
      }

      const authData = {
        isAuthenticated: true,
        user: userData,
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }

      localStorage.setItem('adminAuth', JSON.stringify(authData))
      localStorage.removeItem('adminLock')
      
      setIsAuthenticated(true)
      setUser(userData)
      setLoginAttempts(0)
      setIsLocked(false)

      // Log successful login
      adminLogger.log('LOGIN', {
        username: username,
        success: true,
        timestamp: new Date().toISOString()
      })

      return { success: true }
    } else {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)

      if (newAttempts >= 5) {
        const lockUntil = Date.now() + (15 * 60 * 1000) // 15 minutes
        localStorage.setItem('adminLock', JSON.stringify({
          attempts: newAttempts,
          lockUntil
        }))
        setIsLocked(true)
        
        return {
          success: false,
          error: 'Too many failed attempts. Account locked for 15 minutes.'
        }
      }

      const remainingAttempts = 5 - newAttempts
      
      // Log failed login attempt
      adminLogger.log('LOGIN', {
        username: username,
        success: false,
        reason: 'Invalid credentials',
        remainingAttempts: remainingAttempts,
        timestamp: new Date().toISOString()
      })

      return {
        success: false,
        error: `Invalid credentials. ${remainingAttempts} attempts remaining.`
      }
    }
  }

  const logout = () => {
    // Log logout action
    adminLogger.log('LOGOUT', {
      username: user?.username || 'unknown',
      timestamp: new Date().toISOString()
    })

    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setUser(null)
    setLoginAttempts(0)
  }

  const extendSession = () => {
    const authData = localStorage.getItem('adminAuth')
    if (authData) {
      const parsed = JSON.parse(authData)
      parsed.expires = Date.now() + (24 * 60 * 60 * 1000)
      localStorage.setItem('adminAuth', JSON.stringify(parsed))
    }
  }

  const updatePassword = async (currentPassword, newPassword) => {
    if (currentPassword !== ADMIN_CREDENTIALS.password) {
      return { success: false, error: 'Current password is incorrect' }
    }

    // In production, this would update the database
    // For now, we'll just simulate it
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return { success: true, message: 'Password updated successfully' }
  }

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    extendSession,
    updatePassword,
    loginAttempts,
    isLocked,
    remainingAttempts: isLocked ? 0 : 5 - loginAttempts
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
