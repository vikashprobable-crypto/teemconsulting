import { Link } from 'react-router-dom'

const Industries = () => {
  const industries = [
    {
      name: 'Technology & Software',
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Specialized financial solutions for tech companies, SaaS providers, and software developers.',
      challenges: [
        'Revenue recognition for subscription models',
        'R&D tax credit optimization',
        'Equity compensation planning',
        'International tax compliance'
      ],
      services: ['Tax Planning', 'Financial Advisory', 'Bookkeeping'],
      color: 'blue'
    },
    {
      name: 'Healthcare & Medical',
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Comprehensive financial services for medical practices, clinics, and healthcare providers.',
      challenges: [
        'Healthcare billing and reimbursement',
        'HIPAA compliance in financial records',
        'Medical practice profitability',
        'Healthcare tax regulations'
      ],
      services: ['Bookkeeping', 'Tax Planning', 'Business Consulting'],
      color: 'red'
    },
    {
      name: 'Manufacturing',
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      description: 'Financial expertise for manufacturing companies, from small workshops to large production facilities.',
      challenges: [
        'Inventory and cost accounting',
        'Equipment depreciation strategies',
        'Supply chain financial management',
        'Manufacturing tax incentives'
      ],
      services: ['Bookkeeping', 'Financial Advisory', 'Tax Planning'],
      color: 'gray'
    },
    {
      name: 'Retail & E-commerce',
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      description: 'Tailored financial solutions for retail stores, online shops, and e-commerce businesses.',
      challenges: [
        'Multi-channel sales tracking',
        'Inventory management accounting',
        'Sales tax compliance',
        'Seasonal cash flow management'
      ],
      services: ['Bookkeeping', 'Tax Planning', 'Business Consulting'],
      color: 'green'
    },
    {
      name: 'Construction',
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: 'Specialized financial services for construction companies, contractors, and builders.',
      challenges: [
        'Project-based accounting',
        'Job costing and profitability',
        'Construction tax deductions',
        'Bonding and insurance requirements'
      ],
      services: ['Bookkeeping', 'Financial Advisory', 'Tax Planning'],
      color: 'yellow'
    },
    {
      name: 'Professional Services',
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Financial guidance for law firms, consulting agencies, and other professional service providers.',
      challenges: [
        'Billable hours tracking',
        'Client trust accounting',
        'Professional liability planning',
        'Partnership tax structures'
      ],
      services: ['Tax Planning', 'Bookkeeping', 'Business Consulting'],
      color: 'purple'
    },
    {
      name: 'Real Estate',
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      description: 'Expert financial services for real estate agents, property managers, and real estate investors.',
      challenges: [
        'Property investment analysis',
        'Rental income tracking',
        'Real estate tax strategies',
        '1031 exchange planning'
      ],
      services: ['Tax Planning', 'Financial Advisory', 'Bookkeeping'],
      color: 'indigo'
    },
    {
      name: 'Hospitality & Food Service',
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: 'Financial solutions for restaurants, hotels, cafes, and food service businesses.',
      challenges: [
        'Food cost management',
        'Tip and payroll compliance',
        'Seasonal revenue planning',
        'Hospitality tax regulations'
      ],
      services: ['Bookkeeping', 'Tax Planning', 'Business Consulting'],
      color: 'orange'
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
      red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
      gray: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
      green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
      yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' }
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industries We Serve
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Specialized financial expertise tailored to your industry's unique challenges 
              and opportunities. We understand the specific needs of your business sector.
            </p>
            <Link to="/contact" className="btn-primary">
              Discuss Your Industry
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const colors = getColorClasses(industry.color)
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className={`${colors.bg} rounded-lg p-4 inline-flex mb-4`}>
                      <div className={colors.text}>
                        {industry.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{industry.name}</h3>
                    <p className="text-gray-600 mb-6">{industry.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Common Challenges We Solve:</h4>
                      <ul className="space-y-2">
                        {industry.challenges.map((challenge, challengeIndex) => (
                          <li key={challengeIndex} className="flex items-start">
                            <svg className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-600 text-sm">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">Our Services:</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.services.map((service, serviceIndex) => (
                          <span key={serviceIndex} className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-sm`}>
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link 
                      to="/contact"
                      className={`inline-flex items-center ${colors.text} font-medium hover:opacity-80 transition-opacity`}
                    >
                      Learn More
                      <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Industry Expertise Matters */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Industry-Specific Expertise Matters
              </h2>
              <p className="text-xl text-gray-600">
                Every industry has unique financial challenges and opportunities. 
                Here's how specialized knowledge makes a difference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry Knowledge</h3>
                <p className="text-gray-600">
                  Deep understanding of industry-specific regulations, tax codes, and best practices.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Tailored Solutions</h3>
                <p className="text-gray-600">
                  Customized strategies that address your industry's unique financial challenges.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Proven Results</h3>
                <p className="text-gray-600">
                  Track record of success helping businesses in your industry achieve financial goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from businesses we've helped across different industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                industry: 'Technology Startup',
                result: 'Saved $250K in R&D tax credits',
                company: 'SaaS Company'
              },
              {
                industry: 'Manufacturing',
                result: 'Reduced costs by 18% through better inventory management',
                company: 'Parts Manufacturer'
              },
              {
                industry: 'Retail',
                result: 'Improved cash flow by 35% with better financial planning',
                company: 'Online Retailer'
              }
            ].map((story, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="bg-primary-100 rounded-lg p-3 inline-flex mb-4">
                  <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{story.industry}</h3>
                <p className="text-primary-600 font-medium mb-2">{story.result}</p>
                <p className="text-gray-600 text-sm">{story.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't See Your Industry Listed?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We work with businesses across all industries. Contact us to discuss how our 
            expertise can benefit your specific business needs.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Discuss Your Industry Needs
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Industries
