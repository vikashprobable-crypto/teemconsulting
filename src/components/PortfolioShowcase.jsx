import { useState } from 'react'

const PortfolioShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'Financial Audit for Tech Startup',
      category: 'Audit',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      description: 'Comprehensive financial audit for a rapidly growing technology startup',
      client: 'TechStart Inc.',
      duration: '3 months',
      result: 'Identified 15% cost savings opportunities'
    },
    {
      id: 2,
      title: 'Tax Strategy Implementation',
      category: 'Taxation',
      image: 'https://images.unsplash.com/photo-1554224155-6af6b5a5c9c8?w=800&h=600&fit=crop',
      description: 'Strategic tax planning and implementation for manufacturing company',
      client: 'Manufacturing Co.',
      duration: '6 months',
      result: 'Reduced tax liability by 22%'
    },
    {
      id: 3,
      title: 'CFO Services for SME',
      category: 'CFO Services',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      description: 'Part-time CFO services for small to medium enterprise',
      client: 'Growth Partners Ltd.',
      duration: 'Ongoing',
      result: 'Improved financial reporting accuracy by 95%'
    },
    {
      id: 4,
      title: 'Business Process Optimization',
      category: 'Consulting',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      description: 'Complete business process reengineering for retail chain',
      client: 'Retail Chain Corp.',
      duration: '4 months',
      result: 'Increased operational efficiency by 30%'
    },
    {
      id: 5,
      title: 'International Tax Compliance',
      category: 'Taxation',
      image: 'https://images.unsplash.com/photo-1454161305795-02bcbec3a6b8?w=800&h=600&fit=crop',
      description: 'Multi-jurisdiction tax compliance for export business',
      client: 'Global Exports Ltd.',
      duration: '8 months',
      result: 'Achieved 100% compliance across 5 countries'
    },
    {
      id: 6,
      title: 'Financial System Implementation',
      category: 'CFO Services',
      image: 'https://images.unsplash.com/photo-1556742502-4b87d5b6c1a1?w=800&h=600&fit=crop',
      description: 'ERP and financial system implementation for logistics company',
      client: 'LogiTech Solutions',
      duration: '5 months',
      result: 'Reduced month-end closing time by 60%'
    }
  ]

  const categories = ['All', 'Audit', 'Taxation', 'CFO Services', 'Consulting']

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our recent projects and see how we've helped businesses achieve their financial goals
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="aspect-w-16 aspect-h-10 bg-gray-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {project.category}
                </span>
                <span className="text-xs text-gray-500">{project.duration}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Client: {project.client}</span>
                <svg className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded">
                  {selectedProject.category}
                </span>
                <span className="text-sm text-gray-500">{selectedProject.duration}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedProject.title}</h3>
              <p className="text-gray-600 mb-6">{selectedProject.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Client</h4>
                  <p className="text-gray-600">{selectedProject.client}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Result</h4>
                  <p className="text-gray-600">{selectedProject.result}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="btn-primary">View Case Study</button>
                <button className="btn-secondary">Similar Projects</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PortfolioShowcase
