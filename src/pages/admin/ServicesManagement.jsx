import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdminLogger } from '../../utils/adminLogger'

const ServicesManagement = () => {
  const { logAction } = useAdminLogger()
  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Accounting & Auditing',
      description: 'Comprehensive accounting services and professional auditing to ensure financial accuracy and compliance.',
      detailedDescription: 'Professional accounting and auditing services that provide accurate financial records, ensure regulatory compliance, and give you confidence in your financial reporting.',
      benefits: ['Accurate financial reporting', 'Regulatory compliance assurance', 'Risk identification and mitigation', 'Improved internal controls', 'Professional audit documentation'],
      features: ['Financial statement preparation', 'Internal and external audits', 'Compliance reporting', 'Risk assessment', 'Audit trail documentation'],
      href: '/services/accounting-auditing',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Taxation & Compliance',
      description: 'Strategic tax planning and comprehensive compliance services to minimize liability and ensure adherence.',
      detailedDescription: 'Expert tax services including strategic planning, preparation, and compliance management to optimize your tax position while maintaining full regulatory adherence.',
      benefits: ['Minimize tax liability legally', 'Ensure regulatory compliance', 'Avoid penalties and interest', 'Strategic tax planning', 'Comprehensive tax documentation'],
      features: ['Tax planning and strategy', 'Tax preparation and filing', 'Compliance monitoring', 'Tax audit support', 'Multi-jurisdiction expertise'],
      href: '/services/taxation-compliance',
      color: 'green'
    },
    {
      id: 3,
      title: 'CFO Service and Management Accounting',
      description: 'Executive-level financial leadership and strategic management accounting for business growth.',
      detailedDescription: 'Professional CFO services providing strategic financial guidance, management accounting, and executive-level financial leadership without the cost of a full-time executive.',
      benefits: ['Strategic financial leadership', 'Improved decision-making', 'Cost optimization', 'Performance measurement', 'Executive financial guidance'],
      features: ['Strategic financial planning', 'Management accounting', 'Budget development', 'Performance analysis', 'Executive financial reporting'],
      href: '/services/cfo-management-accounting',
      color: 'purple'
    },
    {
      id: 4,
      title: 'Financial Services',
      description: 'Comprehensive financial advisory and planning services for optimal financial performance.',
      detailedDescription: 'Complete financial services including advisory, planning, analysis, and strategic guidance to help you achieve your financial goals and maximize business value.',
      benefits: ['Strategic financial planning', 'Investment guidance', 'Risk management', 'Performance optimization', 'Financial decision support'],
      features: ['Financial analysis and reporting', 'Investment advisory', 'Risk assessment', 'Cash flow management', 'Strategic planning'],
      href: '/services/financial-services',
      color: 'orange'
    },
    {
      id: 5,
      title: 'Corporate Services',
      description: 'Comprehensive corporate solutions including structuring, governance, and business optimization.',
      detailedDescription: 'Professional corporate services covering business structuring, corporate governance, compliance management, and strategic business optimization for corporate entities.',
      benefits: ['Optimal corporate structure', 'Governance improvement', 'Compliance management', 'Business optimization', 'Risk mitigation'],
      features: ['Corporate structuring', 'Governance advisory', 'Compliance management', 'Business optimization', 'Corporate documentation'],
      href: '/services/corporate-services',
      color: 'indigo'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id) => {
    setServiceToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    const service = services.find(s => s.id === serviceToDelete)
    setServices(services.filter(service => service.id !== serviceToDelete))
    setShowDeleteModal(false)
    setServiceToDelete(null)
    
    // Log service deletion
    logAction('DELETE', {
      type: 'service',
      serviceId: serviceToDelete,
      serviceName: service?.title || 'Unknown',
      timestamp: new Date().toISOString()
    })
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setServiceToDelete(null)
  }

  const getColorBadge = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800',
      indigo: 'bg-indigo-100 text-indigo-800'
    }
    return colorMap[color] || colorMap.blue
  }

  useEffect(() => {
    // Log page view
    logAction('VIEW', {
      page: 'Services Management',
      timestamp: new Date().toISOString()
    })
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600 mt-1">Manage your service offerings</p>
        </div>
        <Link
          to="/admin/services/new"
          className="btn-primary"
        >
          ➕ Add New Service
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Color
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Benefits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Features
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.title}</div>
                    <div className="text-sm text-gray-500">{service.href}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2">{service.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getColorBadge(service.color)}`}>
                      {service.color}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{service.benefits.length} items</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{service.features.length} items</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/services/edit/${service.id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
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
                      Delete Service
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this service? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={cancelDelete}
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

export default ServicesManagement
