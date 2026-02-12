import { Link } from 'react-router-dom'

const FinancialServices = () => {
  const services = [
    {
      title: 'Financial Structuring',
      description: 'Our experienced professionals work closely with you to develop tailored financial structures that align with the unique requirements of your project.',
      features: [
        'Tailored financial structure development',
        'Cash flow projections analysis',
        'Risk assessments integration',
        'Market conditions evaluation',
        'Optimal financing plan creation'
      ]
    },
    {
      title: 'Funding Identification',
      description: 'Identifying suitable funding sources can be challenging. Our team has extensive knowledge and networks within the finance industry.',
      features: [
        'Funding source identification',
        'Lender connections',
        'Investor networks',
        'Project-specific funding matching',
        'Finance industry expertise'
      ]
    },
    {
      title: 'Due Diligence',
      description: 'Thorough due diligence is crucial before entering into any financial agreement. We conduct detailed assessments of project feasibility.',
      features: [
        'Project feasibility assessment',
        'Market potential analysis',
        'Legal considerations review',
        'Risk identification and mitigation',
        'Comprehensive due diligence reports'
      ]
    },
    {
      title: 'Financial Modeling',
      description: 'Accurate financial modeling is essential for projecting future cash flows and assessing the viability of your project.',
      features: [
        'Advanced financial modeling',
        'Cash flow projections',
        'Project viability assessment',
        'Scenario analysis',
        'Decision-making optimization'
      ]
    },
    {
      title: 'Risk Management',
      description: 'Managing risks associated with project finance is vital for its success. Our team conducts comprehensive risk assessments.',
      features: [
        'Comprehensive risk assessments',
        'Risk mitigation strategies',
        'Insurance coverage assistance',
        'Project risk management',
        'Risk monitoring systems'
      ]
    },
    {
      title: 'Negotiation Support',
      description: 'Negotiating favorable terms with lenders or investors requires expertise in deal structuring and understanding market dynamics.',
      features: [
        'Deal structuring expertise',
        'Market dynamics understanding',
        'Negotiation strategy development',
        'Competitive financing arrangements',
        'Term optimization'
      ]
    },
    {
      title: 'Project Monitoring',
      description: 'Once financing is secured, we continue working closely with you during the implementation phase by monitoring key performance indicators.',
      features: [
        'KPI monitoring',
        'Performance tracking against targets',
        'Milestone monitoring',
        'Implementation phase support',
        'Financial plan adherence'
      ]
    }
  ]

  const benefits = [
    'Tailored financial structures for project requirements',
    'Access to extensive funding networks and sources',
    'Comprehensive due diligence and risk assessment',
    'Advanced financial modeling and viability analysis',
    'Expert risk management and mitigation strategies',
    'Professional negotiation support for favorable terms',
    'Ongoing project monitoring and performance tracking',
    'End-to-end project finance solutions'
  ]

  const financialProducts = [
    { name: 'Project Finance', description: 'Comprehensive project financing solutions and structuring' },
    { name: 'Funding Solutions', description: 'Identification and connection with suitable funding sources' },
    { name: 'Risk Management', description: 'Comprehensive risk assessment and mitigation strategies' },
    { name: 'Financial Modeling', description: 'Advanced financial modeling and viability analysis' },
    { name: 'Due Diligence', description: 'Thorough project feasibility and market assessment' },
    { name: 'Negotiation Support', description: 'Expert support for favorable financing terms' }
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
            <span className="text-gray-900">Financial Services</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Comprehensive Financial Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Complete financial solutions including planning, analysis, investment 
                guidance, and risk management for optimal financial performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  Free Financial Assessment
                </Link>
                <Link to="/services" className="btn-secondary">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Excellence</h3>
                <p className="text-gray-600 mb-6">Strategic financial services for business success.</p>
                <div className="text-3xl font-bold text-orange-600 mb-2">35%</div>
                <p className="text-gray-600">Average ROI improvement for clients</p>
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
              Why Professional Financial Services Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert financial guidance is essential for making informed decisions, 
              managing risks, and achieving long-term financial success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-orange-100 rounded-lg p-2 mr-3 mt-1">
                  <svg className="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Our Financial Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions to support your business growth and success.
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
                      <svg className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Financial Products Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Financial Products & Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized financial products to meet your unique business and personal needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialProducts.map((product, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-orange-100 rounded-lg p-3 inline-flex mb-4">
                  <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
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
              Our Financial Services Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to deliver comprehensive financial solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Discovery', description: 'Understand your financial goals and needs' },
              { step: '2', title: 'Analysis', description: 'Comprehensive financial analysis and assessment' },
              { step: '3', title: 'Strategy', description: 'Develop customized financial strategies' },
              { step: '4', title: 'Implementation', description: 'Execute financial plans and monitor results' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
      <section className="bg-orange-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Financial Future?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our comprehensive financial services can help you 
            achieve your financial goals and secure your business future.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-orange-600 hover:bg-gray-100">
            Schedule Your Free Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}

export default FinancialServices
