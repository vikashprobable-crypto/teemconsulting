import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const stats = [
    { label: 'Home Page Sections', value: '6', icon: '🏠', color: 'bg-yellow-500', link: '/admin/home' },
    { label: 'Total Services', value: '5', icon: '🛠️', color: 'bg-blue-500', link: '/admin/services' },
    { label: 'Team Members', value: '4', icon: '👥', color: 'bg-green-500', link: '/admin/team' },
    { label: 'Testimonials', value: '2', icon: '💬', color: 'bg-indigo-500', link: '/admin/testimonials' },
    { label: 'FAQ Items', value: '4', icon: '❓', color: 'bg-orange-500', link: '/admin/faq' },
    { label: 'Contact Items', value: '4', icon: '📞', color: 'bg-teal-500', link: '/admin/contact' },
  ]

  const recentActivity = [
    { action: 'Updated service', item: 'Accounting & Auditing', time: '2 hours ago' },
    { action: 'Added team member', item: 'Sarah Mitchell', time: '1 day ago' },
    { action: 'Modified testimonial', item: 'Michael Chen', time: '3 days ago' },
    { action: 'Updated contact info', item: 'Phone number', time: '1 week ago' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your website content and settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} rounded-lg p-3 text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/home"
              className="block w-full text-left px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors duration-150"
            >
              🏠 Edit Home Page
            </Link>
            <Link
              to="/admin/services/new"
              className="block w-full text-left px-4 py-3 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors duration-150"
            >
              ➕ Add New Service
            </Link>
            <Link
              to="/admin/team/new"
              className="block w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-150"
            >
              👤 Add Team Member
            </Link>
            <Link
              to="/admin/testimonials/new"
              className="block w-full text-left px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-150"
            >
              💬 Add Testimonial
            </Link>
            <Link
              to="/admin/faq/new"
              className="block w-full text-left px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors duration-150"
            >
              ❓ Add FAQ Item
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-gray-100 rounded-full p-2 mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span> - {activity.item}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Website:</span>
            <span className="ml-2 font-medium text-gray-900">Teem Consulting</span>
          </div>
          <div>
            <span className="text-gray-600">Last Backup:</span>
            <span className="ml-2 font-medium text-gray-900">2 hours ago</span>
          </div>
          <div>
            <span className="text-gray-600">Version:</span>
            <span className="ml-2 font-medium text-gray-900">1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
