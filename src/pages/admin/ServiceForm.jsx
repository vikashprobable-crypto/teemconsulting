import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ServiceForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  // Mock services data - in production this would come from API
  const mockServices = [
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
      benefits: ['Business structure optimization', 'Corporate governance', 'Compliance management', 'Strategic planning', 'Risk mitigation'],
      features: ['Corporate structuring', 'Governance frameworks', 'Compliance programs', 'Strategic business planning', 'Risk assessment'],
      href: '/services/corporate-services',
      color: 'indigo'
    }
  ]

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    href: '',
    color: 'blue',
    benefits: [''],
    features: ['']
  })

  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-100 text-blue-800' },
    { value: 'green', label: 'Green', class: 'bg-green-100 text-green-800' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-100 text-purple-800' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-100 text-orange-800' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-100 text-indigo-800' }
  ]

  useEffect(() => {
    if (isEditing) {
      // Find the service by ID
      const serviceId = parseInt(id)
      const service = mockServices.find(s => s.id === serviceId)
      
      if (service) {
        setFormData({
          title: service.title,
          description: service.description,
          detailedDescription: service.detailedDescription,
          href: service.href,
          color: service.color,
          benefits: service.benefits.length > 0 ? [...service.benefits] : [''],
          features: service.features.length > 0 ? [...service.features] : ['']
        })
      } else {
        // Service not found, redirect to services management
        navigate('/admin/services')
      }
    }
  }, [isEditing, id, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formData.benefits]
    newBenefits[index] = value
    setFormData(prev => ({
      ...prev,
      benefits: newBenefits
    }))
  }

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }))
  }

  const removeBenefit = (index) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      benefits: newBenefits.length > 0 ? newBenefits : ['']
    }))
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      features: newFeatures.length > 0 ? newFeatures : ['']
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Filter out empty strings
    const cleanedData = {
      ...formData,
      benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
      features: formData.features.filter(feature => feature.trim() !== '')
    }

    // In a real app, this would save to a backend
    console.log('Saving service:', cleanedData)
    
    // Navigate back to services list
    navigate('/admin/services')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Service' : 'Add New Service'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditing ? 'Update service information' : 'Create a new service offering'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Service Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                placeholder="e.g., Accounting & Auditing"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                placeholder="Brief description for service cards"
              />
            </div>

            {/* Detailed Description */}
            <div>
              <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                placeholder="Comprehensive description for service detail page"
              />
            </div>

            {/* URL Path */}
            <div>
              <label htmlFor="href" className="block text-sm font-medium text-gray-700 mb-2">
                URL Path *
              </label>
              <input
                type="text"
                id="href"
                name="href"
                value={formData.href}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                placeholder="/services/service-name"
              />
            </div>

            {/* Color */}
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                Color Theme *
              </label>
              <select
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              >
                {colorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  colorOptions.find(c => c.value === formData.color)?.class
                }`}>
                  {formData.color}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Benefits
              </label>
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                      placeholder="Enter a benefit"
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBenefit}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  + Add Benefit
                </button>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features Included
              </label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                      placeholder="Enter a feature"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  + Add Feature
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/admin/services')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {isEditing ? 'Update Service' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ServiceForm
