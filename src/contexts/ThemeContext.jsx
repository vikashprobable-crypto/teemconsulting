import { createContext, useContext, useState, useEffect } from 'react'
import { getWebsiteData } from '../data/websiteData'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadTheme = () => {
    const themeData = getWebsiteData('theme')
    if (themeData) {
      setTheme(themeData)
      applyThemeToDOM(themeData)
    }
    setIsLoading(false)
  }

  const applyThemeToDOM = (themeData) => {
    // Apply CSS custom properties to the root element
    const root = document.documentElement
    
    // Apply colors
    if (themeData.colors) {
      Object.entries(themeData.colors).forEach(([category, colors]) => {
        Object.entries(colors).forEach(([shade, value]) => {
          root.style.setProperty(`--color-${category}-${shade}`, value)
        })
      })
    }

    // Apply typography
    if (themeData.typography) {
      if (themeData.typography.fontFamily) {
        Object.entries(themeData.typography.fontFamily).forEach(([type, value]) => {
          root.style.setProperty(`--font-family-${type}`, value)
        })
      }
      if (themeData.typography.fontSize) {
        Object.entries(themeData.typography.fontSize).forEach(([size, value]) => {
          root.style.setProperty(`--font-size-${size}`, value)
        })
      }
      if (themeData.typography.fontWeight) {
        Object.entries(themeData.typography.fontWeight).forEach(([weight, value]) => {
          root.style.setProperty(`--font-weight-${weight}`, value)
        })
      }
      if (themeData.typography.lineHeight) {
        Object.entries(themeData.typography.lineHeight).forEach(([height, value]) => {
          root.style.setProperty(`--line-height-${height}`, value)
        })
      }
    }

    // Apply spacing
    if (themeData.spacing) {
      Object.entries(themeData.spacing).forEach(([size, value]) => {
        root.style.setProperty(`--spacing-${size}`, value)
      })
    }

    // Apply border radius
    if (themeData.borderRadius) {
      Object.entries(themeData.borderRadius).forEach(([size, value]) => {
        root.style.setProperty(`--border-radius-${size}`, value)
      })
    }

    // Apply shadows
    if (themeData.shadows) {
      Object.entries(themeData.shadows).forEach(([size, value]) => {
        root.style.setProperty(`--shadow-${size}`, value)
      })
    }
  }

  useEffect(() => {
    loadTheme()

    // Listen for theme updates
    const handleThemeUpdate = () => {
      loadTheme()
    }

    window.addEventListener('websiteDataUpdated', handleThemeUpdate)
    
    return () => {
      window.removeEventListener('websiteDataUpdated', handleThemeUpdate)
    }
  }, [])

  if (isLoading) {
    return <div>Loading theme...</div>
  }

  const value = {
    theme,
    applyThemeToDOM
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
