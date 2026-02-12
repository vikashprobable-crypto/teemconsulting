import { useState, useEffect } from 'react'
import { dataMigrationTool } from '../../utils/dataMigration'

const DataManagement = () => {
  const [storageInfo, setStorageInfo] = useState({
    size: 0,
    formattedSize: '0 Bytes',
    imageCounts: { clients: 0, gallery: 0, team: 0, total: 0 },
    hasData: false
  })

  useEffect(() => {
    updateStorageInfo()
  }, [])

  const updateStorageInfo = () => {
    const data = dataMigrationTool.getCurrentData()
    const size = dataMigrationTool.getStorageSize()
    const counts = data ? dataMigrationTool.countBase64Images(data) : { clients: 0, gallery: 0, team: 0, total: 0 }

    setStorageInfo({
      size,
      formattedSize: dataMigrationTool.formatBytes(size),
      imageCounts: counts,
      hasData: !!data
    })
  }

  const handleExport = () => {
    dataMigrationTool.exportData()
  }

  const handleCleanBase64 = () => {
    dataMigrationTool.saveCleanedData()
  }

  const handleClearAll = () => {
    if (confirm('⚠️ WARNING: This will delete ALL website data from localStorage including text content, not just images. This action cannot be undone!\n\nAre you absolutely sure you want to continue?')) {
      const success = dataMigrationTool.clearAllData()
      if (success) {
        alert('All data cleared. Please refresh the page.')
        setTimeout(() => window.location.reload(), 2000)
      }
    }
  }

  const handleFullMigration = () => {
    dataMigrationTool.migrateToServer()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Data Management & Migration</h1>
        
        {/* Storage Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Current Storage Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-blue-700">Total Size:</span>
              <div className="text-lg font-bold text-blue-900">{storageInfo.formattedSize}</div>
            </div>
            <div>
              <span className="text-sm text-blue-700">Base64 Images:</span>
              <div className="text-lg font-bold text-blue-900">{storageInfo.imageCounts.total} images</div>
            </div>
          </div>
          
          {storageInfo.imageCounts.total > 0 && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <div className="text-sm text-blue-700 space-y-1">
                <div>• Client logos: {storageInfo.imageCounts.clients}</div>
                <div>• Gallery images: {storageInfo.imageCounts.gallery}</div>
                <div>• Team photos: {storageInfo.imageCounts.team}</div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Export Backup */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">📥 Export Backup</h3>
              <p className="text-sm text-green-700 mb-3">
                Download all current data as a JSON backup file.
              </p>
              <button
                onClick={handleExport}
                disabled={!storageInfo.hasData}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Export Data
              </button>
            </div>

            {/* Clean Base64 Images */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">🧹 Clean Base64 Images</h3>
              <p className="text-sm text-yellow-700 mb-3">
                Remove base64 images but keep text data. Reduces storage size.
              </p>
              <button
                onClick={handleCleanBase64}
                disabled={storageInfo.imageCounts.total === 0}
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Clean Images ({storageInfo.imageCounts.total})
              </button>
            </div>

            {/* Full Migration */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">🚀 Full Migration</h3>
              <p className="text-sm text-purple-700 mb-3">
                Export backup + clean images in one step.
              </p>
              <button
                onClick={handleFullMigration}
                disabled={!storageInfo.hasData}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Migrate to Server
              </button>
            </div>

            {/* Clear All Data */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">🗑️ Clear All Data</h3>
              <p className="text-sm text-red-700 mb-3">
                ⚠️ Delete ALL data including text content. Cannot be undone!
              </p>
              <button
                onClick={handleClearAll}
                disabled={!storageInfo.hasData}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Clear Everything
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">📋 Instructions</h3>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li><strong>Always export backup first</strong> before making any changes</li>
            <li><strong>Clean Base64 Images</strong> to remove large image data from browser storage</li>
            <li><strong>Upload new images</strong> using the admin panels - they'll be saved to server</li>
            <li><strong>Refresh page</strong> after cleanup to see changes</li>
          </ol>
        </div>

        {/* Console Commands */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">💻 Console Commands</h3>
          <p className="text-sm text-gray-700 mb-2">
            You can also use these commands in browser console:
          </p>
          <code className="text-xs bg-gray-800 text-green-400 p-2 rounded block">
            dataMigrationTool.exportData()<br/>
            dataMigrationTool.saveCleanedData()<br/>
            dataMigrationTool.clearAllData()<br/>
            dataMigrationTool.migrateToServer()
          </code>
        </div>
      </div>
    </div>
  )
}

export default DataManagement
