import { useState } from 'react'

const ContactManagement = () => {
  const [contactInfo, setContactInfo] = useState([
    {
      id: 1,
      title: 'Phone',
      info: '+97143557266',
      icon: 'phone'
    },
    {
      id: 2,
      title: 'Email',
      info: 'murthy@teemconsulting.com',
      icon: 'email'
    },
    {
      id: 3,
      title: 'Office',
      info: 'Office No.214, Bank Street Building, Bank Street, Bur Dubai, Dubai, UAE',
      icon: 'location'
    },
    {
      id: 4,
      title: 'Hours',
      info: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM',
      icon: 'clock'
    }
  ])

  const [editingId, setEditingId] = useState(null)

  const handleUpdate = (id, field, value) => {
    setContactInfo(contactInfo.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const startEdit = (id) => {
    setEditingId(editingId === id ? null : id)
  }

  const getIcon = (iconType) => {
    const icons = {
      phone: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      email: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      location: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      clock: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
    return icons[iconType] || icons.phone
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Contact Information Management</h1>
        <p className="text-gray-600 mt-1">Manage contact details displayed on the website</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contactInfo.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-primary-100 rounded-lg p-2 mr-3">
                  <div className="text-primary-600">
                    {getIcon(item.icon)}
                  </div>
                </div>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                    className="text-lg font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-primary-500 focus:outline-none"
                  />
                ) : (
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                )}
              </div>
              <button
                onClick={() => startEdit(item.id)}
                className="text-primary-600 hover:text-primary-900"
              >
                {editingId === item.id ? 'Save' : 'Edit'}
              </button>
            </div>
            
            {editingId === item.id ? (
              item.title === 'Hours' ? (
                <textarea
                  value={item.info}
                  onChange={(e) => handleUpdate(item.id, 'info', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                />
              ) : (
                <input
                  type="text"
                  value={item.info}
                  onChange={(e) => handleUpdate(item.id, 'info', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                />
              )
            ) : (
              <p className="text-gray-600 whitespace-pre-line">{item.info}</p>
            )}
          </div>
        ))}
      </div>

      {/* Preview Section */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item) => (
            <div key={item.id} className="text-center">
              <div className="bg-primary-100 rounded-lg p-3 inline-flex mb-3">
                <div className="text-primary-600">
                  {getIcon(item.icon)}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 whitespace-pre-line text-sm">{item.info}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactManagement
