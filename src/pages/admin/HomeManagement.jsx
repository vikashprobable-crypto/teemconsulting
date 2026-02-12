import { useState, useEffect } from 'react'
import { getWebsiteData, updateWebsiteData } from '../../data/websiteData'

const HomeManagement = () => {
  const [homeData, setHomeData] = useState(null)
  const [activeTab, setActiveTab] = useState('hero')

  useEffect(() => {
    // Load data from centralized store
    const loadData = () => {
      const data = getWebsiteData('homePage')
      setHomeData(data)
    }

    loadData()

    // Listen for data updates
    const handleDataUpdate = () => {
      loadData()
    }

    window.addEventListener('websiteDataUpdated', handleDataUpdate)
    
    return () => {
      window.removeEventListener('websiteDataUpdated', handleDataUpdate)
    }
  }, [])

  if (!homeData) {
    return <div>Loading...</div>
  }

  const handleHeroChange = (field, value) => {
    const updatedHero = { ...homeData.hero, [field]: value }
    setHomeData(prev => ({ ...prev, hero: updatedHero }))
    updateWebsiteData('homePage', { hero: updatedHero })
  }

  const handleStatsChange = (id, field, value) => {
    const updatedStats = homeData.stats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    )
    setHomeData(prev => ({ ...prev, stats: updatedStats }))
    updateWebsiteData('homePage', { stats: updatedStats })
  }

  const handleServicesChange = (field, value) => {
    const updatedServices = { ...homeData.servicesSection, [field]: value }
    setHomeData(prev => ({ ...prev, servicesSection: updatedServices }))
    updateWebsiteData('homePage', { servicesSection: updatedServices })
  }

  const handleWhyChooseChange = (id, field, value) => {
    const updatedPoints = homeData.whyChooseSection.points.map(point => 
      point.id === id ? { ...point, [field]: value } : point
    )
    setHomeData(prev => ({ 
      ...prev, 
      whyChooseSection: { ...prev.whyChooseSection, points: updatedPoints }
    }))
    updateWebsiteData('homePage', { whyChooseSection: { ...homeData.whyChooseSection, points: updatedPoints } })
  }

  const handleTestimonialsChange = (field, value) => {
    const updatedTestimonials = { ...homeData.testimonialsSection, [field]: value }
    setHomeData(prev => ({ ...prev, testimonialsSection: updatedTestimonials }))
    updateWebsiteData('homePage', { testimonialsSection: updatedTestimonials })
  }

  const handleCTAChange = (field, value) => {
    const updatedCTA = { ...homeData.ctaSection, [field]: value }
    setHomeData(prev => ({ ...prev, ctaSection: updatedCTA }))
    updateWebsiteData('homePage', { ctaSection: updatedCTA })
  }

  const addWhyChoosePoint = () => {
    const newPoint = {
      id: Date.now(),
      title: '',
      description: ''
    }
    const updatedPoints = [...homeData.whyChooseSection.points, newPoint]
    setHomeData(prev => ({ 
      ...prev, 
      whyChooseSection: { ...prev.whyChooseSection, points: updatedPoints }
    }))
    updateWebsiteData('homePage', { whyChooseSection: { ...homeData.whyChooseSection, points: updatedPoints } })
  }

  const removeWhyChoosePoint = (id) => {
    const updatedPoints = homeData.whyChooseSection.points.filter(point => point.id !== id)
    setHomeData(prev => ({ 
      ...prev, 
      whyChooseSection: { ...prev.whyChooseSection, points: updatedPoints }
    }))
    updateWebsiteData('homePage', { whyChooseSection: { ...homeData.whyChooseSection, points: updatedPoints } })
  }

  const addStat = () => {
    const newStat = {
      id: Date.now(),
      value: '',
      label: ''
    }
    const updatedStats = [...homeData.stats, newStat]
    setHomeData(prev => ({ ...prev, stats: updatedStats }))
    updateWebsiteData('homePage', { stats: updatedStats })
  }

  const removeStat = (id) => {
    const updatedStats = homeData.stats.filter(stat => stat.id !== id)
    setHomeData(prev => ({ ...prev, stats: updatedStats }))
    updateWebsiteData('homePage', { stats: updatedStats })
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: '🏠' },
    { id: 'stats', label: 'Statistics', icon: '📊' },
    { id: 'services', label: 'Services Preview', icon: '🛠️' },
    { id: 'whyChoose', label: 'Why Choose Us', icon: '⭐' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'cta', label: 'Call to Action', icon: '📞' }
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Home Page Management</h1>
        <p className="text-gray-600 mt-1">Customize the homepage content and layout</p>
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

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Hero Section */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hero Section</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
              <input
                type="text"
                value={homeData.hero.title}
                onChange={(e) => handleHeroChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={homeData.hero.subtitle}
                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
                <input
                  type="text"
                  value={homeData.hero.primaryButtonText}
                  onChange={(e) => handleHeroChange('primaryButtonText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
                <input
                  type="text"
                  value={homeData.hero.secondaryButtonText}
                  onChange={(e) => handleHeroChange('secondaryButtonText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-lg p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{homeData.hero.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{homeData.hero.subtitle}</p>
                <div className="flex space-x-4">
                  <button className="btn-primary">{homeData.hero.primaryButtonText}</button>
                  <button className="btn-secondary">{homeData.hero.secondaryButtonText}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Statistics Section</h2>
              <button
                onClick={addStat}
                className="btn-primary"
              >
                + Add Stat
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {homeData.stats.map((stat) => (
                <div key={stat.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Stat #{stat.id}</h3>
                    <button
                      onClick={() => removeStat(stat.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Value (e.g., 500+)"
                      value={stat.value}
                      onChange={(e) => handleStatsChange(stat.id, 'value', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Label (e.g., Clients Served)"
                      value={stat.label}
                      onChange={(e) => handleStatsChange(stat.id, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
              <div className="bg-primary-600 text-white rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {homeData.stats.map((stat) => (
                    <div key={stat.id} className="text-center">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-primary-100 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Section */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Services Preview Section</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={homeData.servicesSection.title}
                onChange={(e) => handleServicesChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
              <textarea
                value={homeData.servicesSection.subtitle}
                onChange={(e) => handleServicesChange('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={homeData.servicesSection.buttonText}
                onChange={(e) => handleServicesChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Why Choose Us Section */}
        {activeTab === 'whyChoose' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Why Choose Us Section</h2>
              <button
                onClick={addWhyChoosePoint}
                className="btn-primary"
              >
                + Add Point
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={homeData.whyChooseSection.title}
                onChange={(e) => setHomeData(prev => ({ ...prev, whyChooseSection: { ...prev.whyChooseSection, title: e.target.value } }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div className="space-y-4">
              {homeData.whyChooseSection.points.map((point) => (
                <div key={point.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Point #{point.id}</h3>
                    <button
                      onClick={() => removeWhyChoosePoint(point.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={point.title}
                      onChange={(e) => handleWhyChooseChange(point.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                    />
                    <textarea
                      placeholder="Description"
                      value={point.description}
                      onChange={(e) => handleWhyChooseChange(point.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Testimonials Section</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={homeData.testimonialsSection.title}
                onChange={(e) => handleTestimonialsChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
              <textarea
                value={homeData.testimonialsSection.subtitle}
                onChange={(e) => handleTestimonialsChange('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={homeData.testimonialsSection.buttonText}
                onChange={(e) => handleTestimonialsChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* CTA Section */}
        {activeTab === 'cta' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Call to Action Section</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={homeData.ctaSection.title}
                onChange={(e) => handleCTAChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
              <textarea
                value={homeData.ctaSection.subtitle}
                onChange={(e) => handleCTAChange('subtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={homeData.ctaSection.buttonText}
                onChange={(e) => handleCTAChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
              <div className="bg-gradient-to-br from-primary-700 to-primary-800 text-white rounded-lg p-6 text-center">
                <h2 className="text-2xl font-bold mb-2">{homeData.ctaSection.title}</h2>
                <p className="mb-4 text-white/90">{homeData.ctaSection.subtitle}</p>
                <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 border border-primary-200">
                  {homeData.ctaSection.buttonText}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeManagement
