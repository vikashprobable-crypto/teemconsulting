import { useState } from 'react'

const ColorManagement = () => {
  const [activeTab, setActiveTab] = useState('primary')
  const [showResetModal, setShowResetModal] = useState(false)

  const [colors, setColors] = useState({
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
    }
  })

  const [presets] = useState([
    {
      name: 'Ocean Blue',
      primary: { 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 900: '#1e3a8a' },
      accent: { 50: '#fef3c7', 100: '#fde68a', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 900: '#78350f' }
    },
    {
      name: 'Forest Green',
      primary: { 50: '#f0fdf4', 100: '#dcfce7', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 900: '#14532d' },
      accent: { 50: '#fef3c7', 100: '#fde68a', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 900: '#78350f' }
    },
    {
      name: 'Royal Purple',
      primary: { 50: '#faf5ff', 100: '#f3e8ff', 500: '#a855f7', 600: '#9333ea', 700: '#7c3aed', 900: '#581c87' },
      accent: { 50: '#fef3c7', 100: '#fde68a', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 900: '#78350f' }
    },
    {
      name: 'Sunset Orange',
      primary: { 50: '#fff7ed', 100: '#ffedd5', 500: '#fb923c', 600: '#f97316', 700: '#ea580c', 900: '#7c2d12' },
      accent: { 50: '#f0fdf4', 100: '#dcfce7', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 900: '#14532d' }
    }
  ])

  const tabs = [
    { id: 'primary', label: 'Primary Colors', icon: '🎨' },
    { id: 'secondary', label: 'Secondary Colors', icon: '🌈' },
    { id: 'accent', label: 'Accent Colors', icon: '✨' },
    { id: 'success', label: 'Success Colors', icon: '✅' },
    { id: 'error', label: 'Error Colors', icon: '❌' },
    { id: 'presets', label: 'Color Presets', icon: '🎭' }
  ]

  const handleColorChange = (colorType, shade, value) => {
    setColors(prev => ({
      ...prev,
      [colorType]: {
        ...prev[colorType],
        [shade]: value
      }
    }))
  }

  const applyPreset = (preset) => {
    setColors(prev => ({
      ...prev,
      primary: preset.primary,
      accent: preset.accent
    }))
  }

  const resetColors = () => {
    setColors({
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
      }
    })
    setShowResetModal(false)
  }

  const exportColors = () => {
    const colorData = JSON.stringify(colors, null, 2)
    const blob = new Blob([colorData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'color-theme.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importColors = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedColors = JSON.parse(e.target.result)
          setColors(importedColors)
        } catch (error) {
          alert('Invalid color file format')
        }
      }
      reader.readAsText(file)
    }
  }

  const renderColorEditor = (colorType) => {
    const colorData = colors[colorType]
    const shades = ['50', '100', '500', '600', '700', '900']
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shades.map((shade) => (
            <div key={shade} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {colorType.charAt(0).toUpperCase() + colorType.slice(1)} {shade}
              </label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: colorData[shade] }}
                />
                <input
                  type="color"
                  value={colorData[shade]}
                  onChange={(e) => handleColorChange(colorType, shade, e.target.value)}
                  className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colorData[shade]}
                  onChange={(e) => handleColorChange(colorType, shade, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none font-mono text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderPreview = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
        
        {/* Buttons Preview */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Buttons</h4>
          <div className="flex flex-wrap gap-4">
            <button 
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: colors.primary[600] }}
            >
              Primary Button
            </button>
            <button 
              className="px-4 py-2 rounded-lg font-medium border-2"
              style={{ 
                borderColor: colors.primary[600],
                color: colors.primary[600]
              }}
            >
              Secondary Button
            </button>
            <button 
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: colors.accent[600] }}
            >
              Accent Button
            </button>
            <button 
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: colors.success[600] }}
            >
              Success Button
            </button>
            <button 
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: colors.error[600] }}
            >
              Error Button
            </button>
          </div>
        </div>

        {/* Cards Preview */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Cards</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              className="p-4 rounded-lg border-2"
              style={{ 
                borderColor: colors.primary[200],
                backgroundColor: colors.primary[50]
              }}
            >
              <h5 style={{ color: colors.primary[900] }} className="font-semibold mb-2">Primary Card</h5>
              <p style={{ color: colors.secondary[700] }} className="text-sm">This is a primary colored card with custom styling.</p>
            </div>
            <div 
              className="p-4 rounded-lg border-2"
              style={{ 
                borderColor: colors.accent[200],
                backgroundColor: colors.accent[50]
              }}
            >
              <h5 style={{ color: colors.accent[900] }} className="font-semibold mb-2">Accent Card</h5>
              <p style={{ color: colors.secondary[700] }} className="text-sm">This is an accent colored card with custom styling.</p>
            </div>
            <div 
              className="p-4 rounded-lg border-2"
              style={{ 
                borderColor: colors.success[200],
                backgroundColor: colors.success[50]
              }}
            >
              <h5 style={{ color: colors.success[900] }} className="font-semibold mb-2">Success Card</h5>
              <p style={{ color: colors.secondary[700] }} className="text-sm">This is a success colored card with custom styling.</p>
            </div>
          </div>
        </div>

        {/* Alert Preview */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Alerts</h4>
          <div className="space-y-2">
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.success[100], borderLeft: `4px solid ${colors.success[500]}` }}
            >
              <p style={{ color: colors.success[800] }} className="font-medium">Success Message</p>
              <p style={{ color: colors.success[700] }} className="text-sm">This is a success alert message.</p>
            </div>
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.error[100], borderLeft: `4px solid ${colors.error[500]}` }}
            >
              <p style={{ color: colors.error[800] }} className="font-medium">Error Message</p>
              <p style={{ color: colors.error[700] }} className="text-sm">This is an error alert message.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Color Theme Management</h1>
        <p className="text-gray-600 mt-1">Customize the website color scheme</p>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={exportColors}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            📥 Export Colors
          </button>
          <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            📤 Import Colors
            <input
              type="file"
              accept=".json"
              onChange={importColors}
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
        {/* Color Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'presets' ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Color Presets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {presets.map((preset, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">{preset.name}</h3>
                      <div className="flex space-x-2 mb-4">
                        <div 
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: preset.primary[500] }}
                        />
                        <div 
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: preset.accent[500] }}
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
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </h2>
                {renderColorEditor(activeTab)}
              </div>
            )}
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
                      Reset Colors to Default?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to reset all colors to the default theme? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={resetColors}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Reset Colors
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

export default ColorManagement
