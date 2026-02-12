import { useState, useEffect } from 'react'
import { getWebsiteData, updateWebsiteData } from '../../data/websiteData'

const StatsManagement = () => {
  const [stats, setStats] = useState([])
  const [newStat, setNewStat] = useState({ value: '', label: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    // Load stats data from centralized store
    const homePageData = getWebsiteData('homePage')
    if (homePageData && homePageData.stats) {
      setStats(homePageData.stats)
    }
  }, [])

  useEffect(() => {
    // Listen for data updates
    const handleDataUpdate = () => {
      const homePageData = getWebsiteData('homePage')
      if (homePageData && homePageData.stats) {
        setStats(homePageData.stats)
      }
    }

    window.addEventListener('websiteDataUpdated', handleDataUpdate)
    return () => window.removeEventListener('websiteDataUpdated', handleDataUpdate)
  }, [])

  const handleAdd = () => {
    if (newStat.value && newStat.label) {
      const updatedStats = [...stats, { id: Date.now(), ...newStat }]
      setStats(updatedStats)
      
      // Update centralized data store
      const homePageData = getWebsiteData('homePage') || {}
      updateWebsiteData('homePage', { ...homePageData, stats: updatedStats })
      
      setNewStat({ value: '', label: '' })
    }
  }

  const handleUpdate = (id, field, value) => {
    const updatedStats = stats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    )
    setStats(updatedStats)
    
    // Update centralized data store
    const homePageData = getWebsiteData('homePage') || {}
    updateWebsiteData('homePage', { ...homePageData, stats: updatedStats })
  }

  const handleDelete = (id) => {
    const updatedStats = stats.filter(stat => stat.id !== id)
    setStats(updatedStats)
    
    // Update centralized data store
    const homePageData = getWebsiteData('homePage') || {}
    updateWebsiteData('homePage', { ...homePageData, stats: updatedStats })
  }

  const startEdit = (id) => {
    setEditingId(editingId === id ? null : id)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Statistics Management</h1>
        <p className="text-gray-600 mt-1">Manage homepage statistics</p>
      </div>

      {/* Add New Stat */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Statistic</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Value (e.g., 500+)"
            value={newStat.value}
            onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Label (e.g., Clients Served)"
            value={newStat.label}
            onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="btn-primary"
          >
            Add Statistic
          </button>
        </div>
      </div>

      {/* Existing Stats */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Label
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.map((stat) => (
                <tr key={stat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === stat.id ? (
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleUpdate(stat.id, 'value', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                      />
                    ) : (
                      <span className="text-sm font-medium text-gray-900">{stat.value}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === stat.id ? (
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleUpdate(stat.id, 'label', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{stat.label}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {editingId === stat.id ? (
                        <button
                          onClick={() => startEdit(null)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(stat.id)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(stat.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StatsManagement
