import { useState, useEffect } from 'react'
import { useAdminLogger } from '../../utils/adminLogger'

const AdminLogsManagement = () => {
  const { getLogs, clearLogs, exportLogs, getStats, logs } = useAdminLogger()
  const [stats, setStats] = useState({})
  const [filter, setFilter] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')

  useEffect(() => {
    setStats(getStats())
  }, [getStats, logs]) // Update stats when logs change

  const filteredLogs = logs.filter(log => {
    const matchesSearch = !filter || 
      log.action.toLowerCase().includes(filter.toLowerCase()) ||
      JSON.stringify(log.details).toLowerCase().includes(filter.toLowerCase())
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter
    
    let matchesDate = true
    if (dateFilter) {
      const logDate = new Date(log.timestamp).toISOString().split('T')[0]
      matchesDate = logDate === dateFilter
    }

    return matchesSearch && matchesAction && matchesDate
  })

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all admin logs? This action cannot be undone.')) {
      clearLogs()
      setStats({})
    }
  }

  const handleExportLogs = () => {
    exportLogs()
  }

  const getActionColor = (action) => {
    const colors = {
      'LOGIN': 'text-green-600 bg-green-50',
      'LOGOUT': 'text-red-600 bg-red-50',
      'CREATE': 'text-blue-600 bg-blue-50',
      'UPDATE': 'text-orange-600 bg-orange-50',
      'DELETE': 'text-red-600 bg-red-50',
      'VIEW': 'text-gray-600 bg-gray-50',
      'EXPORT': 'text-purple-600 bg-purple-50',
      'IMPORT': 'text-indigo-600 bg-indigo-50'
    }
    return colors[action] || 'text-gray-600 bg-gray-50'
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const uniqueActions = [...new Set(logs.map(log => log.action))]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Logs</h1>
        <p className="text-gray-600 mt-1">Monitor and manage admin panel activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-primary-600">{stats.totalLogs || 0}</div>
          <div className="text-sm text-gray-600">Total Logs</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-green-600">{stats.sessions || 0}</div>
          <div className="text-sm text-gray-600">Sessions</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-blue-600">{stats.todayLogs || 0}</div>
          <div className="text-sm text-gray-600">Today's Activity</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-2xl font-bold text-orange-600">{stats.weeklyLogs || 0}</div>
          <div className="text-sm text-gray-600">Weekly Activity</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search logs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
          />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
          >
            <option value="all">All Actions</option>
            {uniqueActions.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleExportLogs}
              className="btn-primary"
            >
              Export Logs
            </button>
            <button
              onClick={handleClearLogs}
              className="btn-secondary"
            >
              Clear Logs
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.slice(0, 50).map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatTimestamp(log.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate">
                      {Object.keys(log.details).length > 0 ? JSON.stringify(log.details, null, 2) : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.sessionId.split('_')[1]?.substr(0, 8) || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLogs.length > 50 && (
          <div className="px-6 py-4 bg-gray-50 text-center text-sm text-gray-600">
            Showing first 50 of {filteredLogs.length} logs. Use filters to narrow results.
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminLogsManagement
