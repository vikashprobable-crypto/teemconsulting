import { useState, useEffect } from 'react'
import { getWebsiteData, updateWebsiteData } from '../../data/websiteData'

const ThemeManagement = () => {
  const [activeTab, setActiveTab] = useState('colors')
  const [showResetModal, setShowResetModal] = useState(false)
  const [themeData, setThemeData] = useState(null)

  useEffect(() => {
    // Load theme data
    const loadThemeData = () => {
      const data = getWebsiteData('theme') || getDefaultTheme()
      setThemeData(data)
    }

    loadThemeData()

    // Listen for data updates
    const handleDataUpdate = () => {
      loadThemeData()
    }

    window.addEventListener('websiteDataUpdated', handleDataUpdate)
    
    return () => {
      window.removeEventListener('websiteDataUpdated', handleDataUpdate)
    }
  }, [])

  const getDefaultTheme = () => ({
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        900: '#1e3a8a'
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        900: '#0f172a'
      },
      accent: {
        50: '#fef3c7',
        100: '#fde68a',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        900: '#78350f'
      },
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        900: '#14532d'
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        900: '#7f1d1d'
      },
      background: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        tertiary: '#f1f5f9',
        dark: '#1e293b'
      },
      text: {
        primary: '#111827',
        secondary: '#6b7280',
        tertiary: '#9ca3af',
        inverse: '#ffffff'
      }
    },
    typography: {
      fontFamily: {
        primary: 'Inter, system-ui, sans-serif',
        secondary: 'Georgia, serif',
        mono: 'JetBrains Mono, monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem'
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800'
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px'
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    pageStyles: {
      home: {
        background: 'gradient',
        heroBackground: 'from-primary-50 to-white',
        sectionBackground: 'white',
        accentBackground: 'gray-50'
      },
      about: {
        background: 'solid',
        heroBackground: 'secondary',
        sectionBackground: 'white',
        accentBackground: 'primary-50'
      },
      services: {
        background: 'gradient',
        heroBackground: 'from-primary-100 to-white',
        sectionBackground: 'white',
        accentBackground: 'gray-50'
      },
      contact: {
        background: 'solid',
        heroBackground: 'primary-600',
        sectionBackground: 'white',
        accentBackground: 'gray-50'
      }
    }
  })

  if (!themeData) {
    return <div>Loading...</div>
  }

  const tabs = [
    { id: 'colors', label: 'Colors', icon: '🎨' },
    { id: 'typography', label: 'Typography', icon: '📝' },
    { id: 'spacing', label: 'Spacing', icon: '📏' },
    { id: 'borders', label: 'Borders & Shadows', icon: '🔲' },
    { id: 'pages', label: 'Page Styles', icon: '📄' },
    { id: 'presets', label: 'Theme Presets', icon: '🎭' }
  ]

  const themePresets = [
    {
      name: 'Professional Blue',
      description: 'Clean, professional blue theme',
      colors: {
        primary: { 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 900: '#1e3a8a' },
        background: { primary: '#ffffff', secondary: '#f8fafc', tertiary: '#f1f5f9', dark: '#1e293b' }
      },
      typography: {
        fontFamily: { primary: 'Inter, system-ui, sans-serif' }
      }
    },
    {
      name: 'Modern Dark',
      description: 'Sleek dark theme with high contrast',
      colors: {
        primary: { 50: '#1e293b', 100: '#334155', 500: '#64748b', 600: '#475569', 700: '#334155', 900: '#0f172a' },
        background: { primary: '#0f172a', secondary: '#1e293b', tertiary: '#334155', dark: '#ffffff' },
        text: { primary: '#f8fafc', secondary: '#e2e8f0', tertiary: '#cbd5e1', inverse: '#0f172a' }
      },
      typography: {
        fontFamily: { primary: 'Inter, system-ui, sans-serif' }
      }
    },
    {
      name: 'Nature Green',
      description: 'Fresh, natural green theme',
      colors: {
        primary: { 50: '#f0fdf4', 100: '#dcfce7', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 900: '#14532d' },
        background: { primary: '#ffffff', secondary: '#f0fdf4', tertiary: '#dcfce7', dark: '#14532d' }
      },
      typography: {
        fontFamily: { primary: 'Inter, system-ui, sans-serif' }
      }
    },
    {
      name: 'Elegant Purple',
      description: 'Sophisticated purple theme',
      colors: {
        primary: { 50: '#faf5ff', 100: '#f3e8ff', 500: '#a855f7', 600: '#9333ea', 700: '#7c3aed', 900: '#581c87' },
        background: { primary: '#ffffff', secondary: '#faf5ff', tertiary: '#f3e8ff', dark: '#581c87' }
      },
      typography: {
        fontFamily: { primary: 'Georgia, serif' }
      }
    }
  ]

  const handleColorChange = (category, shade, value) => {
    const updatedTheme = {
      ...themeData,
      colors: {
        ...themeData.colors,
        [category]: {
          ...themeData.colors[category],
          [shade]: value
        }
      }
    }
    setThemeData(updatedTheme)
    updateWebsiteData('theme', updatedTheme)
  }

  const handleTypographyChange = (category, property, value) => {
    const updatedTheme = {
      ...themeData,
      typography: {
        ...themeData.typography,
        [category]: {
          ...themeData.typography[category],
          [property]: value
        }
      }
    }
    setThemeData(updatedTheme)
    updateWebsiteData('theme', updatedTheme)
  }

  const handleSpacingChange = (size, value) => {
    const updatedTheme = {
      ...themeData,
      spacing: {
        ...themeData.spacing,
        [size]: value
      }
    }
    setThemeData(updatedTheme)
    updateWebsiteData('theme', updatedTheme)
  }

  const handleBorderRadiusChange = (size, value) => {
    const updatedTheme = {
      ...themeData,
      borderRadius: {
        ...themeData.borderRadius,
        [size]: value
      }
    }
    setThemeData(updatedTheme)
    updateWebsiteData('theme', updatedTheme)
  }

  const handlePageStyleChange = (page, property, value) => {
    const updatedTheme = {
      ...themeData,
      pageStyles: {
        ...themeData.pageStyles,
        [page]: {
          ...themeData.pageStyles[page],
          [property]: value
        }
      }
    }
    setThemeData(updatedTheme)
    updateWebsiteData('theme', updatedTheme)
  }

  const applyPreset = (preset) => {
    const updatedTheme = {
      ...themeData,
      colors: {
        ...themeData.colors,
        ...preset.colors
      },
      typography: {
        ...themeData.typography,
        ...preset.typography
      }
    }
    setThemeData(updatedTheme)
    updateWebsiteData('theme', updatedTheme)
  }

  const resetTheme = () => {
    const defaultTheme = getDefaultTheme()
    setThemeData(defaultTheme)
    updateWebsiteData('theme', defaultTheme)
    setShowResetModal(false)
  }

  const exportTheme = () => {
    const themeDataString = JSON.stringify(themeData, null, 2)
    const blob = new Blob([themeDataString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'theme-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importTheme = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedTheme = JSON.parse(e.target.result)
          setThemeData(importedTheme)
          updateWebsiteData('theme', importedTheme)
        } catch (error) {
          alert('Invalid theme file format')
        }
      }
      reader.readAsText(file)
    }
  }

  const renderColorEditor = (category) => {
    const colorData = themeData.colors[category]
    const shades = Object.keys(colorData)
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shades.map((shade) => (
            <div key={shade} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {category.charAt(0).toUpperCase() + category.slice(1)} {shade}
              </label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: colorData[shade] }}
                />
                <input
                  type="color"
                  value={colorData[shade]}
                  onChange={(e) => handleColorChange(category, shade, e.target.value)}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colorData[shade]}
                  onChange={(e) => handleColorChange(category, shade, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none font-mono text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTypographyEditor = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Font Families</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Font</label>
                <select
                  value={themeData.typography.fontFamily.primary}
                  onChange={(e) => handleTypographyChange('fontFamily', 'primary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                >
                  <option value="Inter, system-ui, sans-serif">Inter (Sans-serif)</option>
                  <option value="Georgia, serif">Georgia (Serif)</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Helvetica Neue', sans-serif">Helvetica</option>
                  <option value="'Courier New', monospace">Courier New</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Font</label>
                <select
                  value={themeData.typography.fontFamily.secondary}
                  onChange={(e) => handleTypographyChange('fontFamily', 'secondary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                >
                  <option value="Inter, system-ui, sans-serif">Inter (Sans-serif)</option>
                  <option value="Georgia, serif">Georgia (Serif)</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Helvetica Neue', sans-serif">Helvetica</option>
                  <option value="'Courier New', monospace">Courier New</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Font Sizes</h3>
            <div className="space-y-3">
              {Object.entries(themeData.typography.fontSize).map(([size, value]) => (
                <div key={size} className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700 w-16">{size}:</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleTypographyChange('fontSize', size, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                  />
                  <span 
                    className="text-sm"
                    style={{ fontSize: value }}
                  >
                    Sample
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderPageStylesEditor = () => {
    return (
      <div className="space-y-6">
        {Object.entries(themeData.pageStyles).map(([page, styles]) => (
          <div key={page} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">{page} Page</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background Type</label>
                <select
                  value={styles.background}
                  onChange={(e) => handlePageStyleChange(page, 'background', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                >
                  <option value="solid">Solid</option>
                  <option value="gradient">Gradient</option>
                  <option value="pattern">Pattern</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Background</label>
                <select
                  value={styles.heroBackground}
                  onChange={(e) => handlePageStyleChange(page, 'heroBackground', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="white">White</option>
                  <option value="gray-50">Gray 50</option>
                  <option value="primary-50">Primary 50</option>
                  <option value="from-primary-50 to-white">Light Gradient</option>
                  <option value="from-primary-100 to-white">Medium Gradient</option>
                  <option value="primary-600">Dark Primary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Background</label>
                <select
                  value={styles.sectionBackground}
                  onChange={(e) => handlePageStyleChange(page, 'sectionBackground', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                >
                  <option value="white">White</option>
                  <option value="gray-50">Gray 50</option>
                  <option value="primary-50">Primary 50</option>
                  <option value="secondary">Secondary</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderPreview = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
        
        {/* Typography Preview */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Typography</h4>
          <div className="space-y-2" style={{ fontFamily: themeData.typography.fontFamily.primary }}>
            <h1 style={{ fontSize: themeData.typography.fontSize['4xl'], fontWeight: themeData.typography.fontWeight.bold }}>
              Heading 1 Sample
            </h1>
            <h2 style={{ fontSize: themeData.typography.fontSize['3xl'], fontWeight: themeData.typography.fontWeight.semibold }}>
              Heading 2 Sample
            </h2>
            <p style={{ fontSize: themeData.typography.fontSize.lg, lineHeight: themeData.typography.lineHeight.relaxed }}>
              This is a paragraph sample with the current typography settings. It shows how the font family, size, and line height work together.
            </p>
            <p style={{ fontSize: themeData.typography.fontSize.sm }}>
              Small text sample for captions and meta information.
            </p>
          </div>
        </div>

        {/* Colors Preview */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Colors & Components</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-lg border-2"
              style={{ 
                borderColor: themeData.colors.primary[500],
                backgroundColor: themeData.colors.background.primary
              }}
            >
              <h5 style={{ color: themeData.colors.text.primary }} className="font-semibold mb-2">Primary Card</h5>
              <p style={{ color: themeData.colors.text.secondary }} className="text-sm">This card uses primary colors and current typography.</p>
              <button 
                className="mt-3 px-4 py-2 rounded text-white text-sm"
                style={{ 
                  backgroundColor: themeData.colors.primary[600],
                  borderRadius: themeData.borderRadius.md
                }}
              >
                Primary Button
              </button>
            </div>
            <div 
              className="p-4 rounded-lg border-2"
              style={{ 
                borderColor: themeData.colors.accent[500],
                backgroundColor: themeData.colors.background.secondary
              }}
            >
              <h5 style={{ color: themeData.colors.text.primary }} className="font-semibold mb-2">Accent Card</h5>
              <p style={{ color: themeData.colors.text.secondary }} className="text-sm">This card uses accent colors and current typography.</p>
              <button 
                className="mt-3 px-4 py-2 rounded text-white text-sm"
                style={{ 
                  backgroundColor: themeData.colors.accent[600],
                  borderRadius: themeData.borderRadius.md
                }}
              >
                Accent Button
              </button>
            </div>
          </div>
        </div>

        {/* Spacing Preview */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Spacing & Layout</h4>
          <div 
            className="border border-gray-300 rounded-lg p-4"
            style={{ borderRadius: themeData.borderRadius.lg }}
          >
            <div className="space-y-2">
              <div 
                className="bg-primary-100 rounded"
                style={{ 
                  height: '40px',
                  borderRadius: themeData.borderRadius.sm,
                  marginBottom: themeData.spacing.sm
                }}
              />
              <div 
                className="bg-primary-200 rounded"
                style={{ 
                  height: '40px',
                  borderRadius: themeData.borderRadius.base,
                  marginBottom: themeData.spacing.md
                }}
              />
              <div 
                className="bg-primary-300 rounded"
                style={{ 
                  height: '40px',
                  borderRadius: themeData.borderRadius.md,
                  marginBottom: themeData.spacing.lg
                }}
              />
              <div 
                className="bg-primary-400 rounded"
                style={{ 
                  height: '40px',
                  borderRadius: themeData.borderRadius.lg
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Theme Management</h1>
        <p className="text-gray-600 mt-1">Customize the entire website appearance</p>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={exportTheme}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            📥 Export Theme
          </button>
          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            📤 Import Theme
            <input
              type="file"
              accept=".json"
              onChange={importTheme}
              className="hidden"
            />
          </label>
          <button
            onClick={() => setShowResetModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            🔄 Reset to Default
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'presets' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Theme Presets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {themePresets.map((preset, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{preset.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{preset.description}</p>
                      <div className="flex space-x-2 mb-4">
                        <div 
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: preset.colors.primary[500] }}
                        />
                        <div 
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: preset.colors.background.primary }}
                        />
                      </div>
                      <button
                        onClick={() => applyPreset(preset)}
                        className="w-full px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Apply Preset
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === 'colors' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Color Settings</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Colors</h3>
                    {renderColorEditor('primary')}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Background Colors</h3>
                    {renderColorEditor('background')}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Text Colors</h3>
                    {renderColorEditor('text')}
                  </div>
                </div>
              </div>
            ) : activeTab === 'typography' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Typography Settings</h2>
                {renderTypographyEditor()}
              </div>
            ) : activeTab === 'spacing' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Spacing Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(themeData.spacing).map(([size, value]) => (
                    <div key={size} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">{size}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleSpacingChange(size, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === 'borders' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Borders & Shadows</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Border Radius</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(themeData.borderRadius).map(([size, value]) => (
                        <div key={size} className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">{size}</label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleBorderRadiusChange(size, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === 'pages' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Page Styles</h2>
                {renderPageStylesEditor()}
              </div>
            ) : null}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            {renderPreview()}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
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
                      Reset Theme to Default?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to reset all theme settings to the default? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={resetTheme}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Reset Theme
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
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

export default ThemeManagement
