import { Link } from 'react-router-dom'

const CorporateServices = () => {
  const services = [
    {
      title: 'Company Formation (Mainland & Free Zone)',
      description: 'We provide end-to-end support for company incorporation in Mainland and Free Zones, including advisory on the appropriate legal structure, licensing requirements, and initial regulatory compliance.',
      features: [
        'End-to-end company incorporation support',
        'Mainland and Free Zone setup',
        'Legal structure advisory',
        'Licensing requirements guidance',
        'Initial regulatory compliance',
        'Business objective alignment'
      ]
    },
    {
      title: 'Corporate Structuring & Restructuring',
      description: 'We advise on optimal corporate and group structures, including holding company arrangements and shareholding frameworks.',
      features: [
        'Optimal corporate structure advisory',
        'Group structure optimization',
        'Holding company arrangements',
        'Shareholding framework design',
        'Operational efficiency focus',
        'Tax consideration integration',
        'Long-term growth support'
      ]
    },
    {
      title: 'Shareholder & Board Documentation',
      description: 'We assist in the preparation and maintenance of statutory corporate documents, including shareholder agreements, board resolutions, and ownership-related documentation.',
      features: [
        'Statutory corporate document preparation',
        'Shareholder agreements drafting',
        'Board resolutions preparation',
        'Ownership documentation maintenance',
        'Governance compliance assurance',
        'Transparency documentation',
        'Regulatory requirement compliance'
      ]
    },
    {
      title: 'Regulatory Compliance & Filings (ESR, UBO, etc.)',
      description: 'We manage ongoing corporate compliance obligations, including Economic Substance Regulations (ESR), Ultimate Beneficial Owner (UBO) filings, and other statutory submissions.',
      features: [
        'Economic Substance Regulations (ESR) compliance',
        'Ultimate Beneficial Owner (UBO) filings',
        'Statutory submission management',
        'Ongoing compliance obligations',
        'Penalty avoidance strategies',
        'Authority relationship maintenance',
        'Good standing assurance'
      ]
    },
    {
      title: 'Company Liquidation & Deregistration',
      description: 'We provide structured support for company liquidation and deregistration, including preparation of liquidation accounts, coordination with authorities, and final compliance filings.',
      features: [
        'Structured liquidation support',
        'Company deregistration assistance',
        'Liquidation accounts preparation',
        'Authority coordination',
        'Final compliance filings',
        'Orderly exit process',
        'UAE regulations compliance'
      ]
    }
  ]

  const benefits = [
    'End-to-end company formation support for Mainland and Free Zones',
    'Optimal corporate structuring and restructuring advisory',
    'Comprehensive shareholder and board documentation',
    'Regulatory compliance management (ESR, UBO, etc.)',
    'Structured company liquidation and deregistration',
    'UAE regulatory compliance assurance',
    'Professional governance framework implementation',
    'Risk mitigation and penalty avoidance'
  ]

  const corporateSolutions = [
    { name: 'Company Formation', description: 'Mainland and Free Zone company incorporation services' },
    { name: 'Corporate Structuring', description: 'Optimal corporate and group structure advisory' },
    { name: 'Compliance Management', description: 'ESR, UBO, and regulatory compliance services' },
    { name: 'Documentation Services', description: 'Shareholder and board documentation preparation' },
    { name: 'Liquidation Services', description: 'Company liquidation and deregistration support' },
    { name: 'Regulatory Advisory', description: 'UAE regulatory compliance and advisory services' }
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <div className="container">
          <nav className="flex text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/services" className="text-gray-600 hover:text-primary-600">Services</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Corporate Services</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Corporate Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive corporate solutions including structuring, governance, 
                compliance management, and strategic business optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  Free Corporate Assessment
                </Link>
                <Link to="/services" className="btn-secondary">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporate Excellence</h3>
                <p className="text-gray-600 mb-6">Strategic corporate solutions for business success.</p>
                <div className="text-3xl font-bold text-indigo-600 mb-2">250+</div>
                <p className="text-gray-600">Corporate entities structured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Professional Corporate Services Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert corporate guidance is essential for optimal structure, governance, 
              compliance, and sustainable business growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-indigo-100 rounded-lg p-2 mr-3 mt-1">
                  <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Corporate Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive corporate solutions to support your business structure and governance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Solutions Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Corporate Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized corporate services for complex business needs and transactions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporateSolutions.map((solution, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-indigo-100 rounded-lg p-3 inline-flex mb-4">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{solution.name}</h3>
                <p className="text-gray-600 text-sm">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Corporate Services Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach to deliver comprehensive corporate solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Analysis', description: 'Comprehensive corporate needs assessment' },
              { step: '2', title: 'Strategy', description: 'Develop customized corporate strategy' },
              { step: '3', title: 'Implementation', description: 'Execute corporate solutions and changes' },
              { step: '4', title: 'Optimization', description: 'Continuous improvement and optimization' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Corporate Structure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our corporate services can help your business 
            achieve optimal structure, governance, and operational excellence.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-indigo-600 hover:bg-gray-100">
            Schedule Your Free Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CorporateServices
