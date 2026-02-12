import { Link } from 'react-router-dom'

const CFOManagementAccounting = () => {
  const services = [
    {
      title: 'Financial Planning and Analysis',
      description: 'Our CFOs will work closely with you to develop comprehensive financial plans, including budgeting, forecasting, and cash flow management.',
      features: [
        'Comprehensive financial planning',
        'Budgeting and forecasting',
        'Cash flow management',
        'Financial data analysis',
        'Informed decision-making insights'
      ]
    },
    {
      title: 'Strategic Financial Advice',
      description: 'Our CFOs act as trusted advisors, offering strategic guidance on various financial matters such as mergers and acquisitions, investment opportunities, risk management, cost optimization strategies.',
      features: [
        'Mergers and acquisitions guidance',
        'Investment opportunity analysis',
        'Risk management strategies',
        'Cost optimization strategies',
        'Financial goal alignment'
      ]
    },
    {
      title: 'Financial Reporting',
      description: 'Accurate and timely reporting is crucial for monitoring the health of your business. Our CFOs can prepare detailed financial statements tailored to meet the specific needs of stakeholders.',
      features: [
        'Detailed financial statements',
        'Stakeholder-specific reporting',
        'Investor reporting',
        'Lender documentation',
        'Board member presentations'
      ]
    },
    {
      title: 'Performance Measurement',
      description: 'We assist in setting up key performance indicators (KPIs) that align with your business goals so that you can track progress effectively.',
      features: [
        'KPI development and implementation',
        'Progress tracking systems',
        'Trend analysis',
        'Industry benchmarking',
        'Improvement area identification'
      ]
    },
    {
      title: 'Cash Flow Management',
      description: 'Maintaining a healthy cash flow is vital for any organization\'s success. Our CFOs will work closely with you to optimize cash flow by implementing effective strategies.',
      features: [
        'Cash flow optimization',
        'Receivables management',
        'Payables management',
        'Financing options exploration',
        'Liquidity management'
      ]
    },
    {
      title: 'Risk Management',
      description: 'Identifying potential risks early on is essential for mitigating their impact on your business operations. Our CFOs conduct thorough risk assessments and develop robust risk management strategies.',
      features: [
        'Risk assessment and identification',
        'Risk mitigation strategies',
        'Business continuity planning',
        'Financial risk management',
        'Organizational-specific solutions'
      ]
    },
    {
      title: 'Interim Support',
      description: 'Whether it\'s during a transition period or unexpected absence of an in-house finance executive, our interim support service ensures continuity in financial management.',
      features: [
        'Transition period support',
        'Executive absence coverage',
        'Financial management continuity',
        'Seamless integration',
        'Business stability assurance'
      ]
    }
  ]

  const benefits = [
    'Comprehensive financial planning and analysis',
    'Strategic financial advice for business growth',
    'Accurate and timely financial reporting',
    'Effective performance measurement with KPIs',
    'Optimized cash flow management',
    'Proactive risk management strategies',
    'Seamless interim support during transitions',
    'Executive-level financial expertise'
  ]

  const cfoServices = [
    { name: 'Financial Planning', description: 'Comprehensive financial planning and analysis services' },
    { name: 'Strategic Advice', description: 'Trusted advisory on mergers, acquisitions, and investments' },
    { name: 'Performance Measurement', description: 'KPI development and progress tracking systems' },
    { name: 'Risk Management', description: 'Thorough risk assessment and mitigation strategies' },
    { name: 'Cash Flow Management', description: 'Optimization strategies for healthy cash flow' },
    { name: 'Interim Support', description: 'Continuity during transitions and executive absence' }
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
            <span className="text-gray-900">CFO Service and Management Accounting</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Executive CFO Services & Management Accounting
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Professional CFO services providing strategic financial leadership and 
                management accounting without the cost of a full-time executive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  Free CFO Consultation
                </Link>
                <Link to="/services" className="btn-secondary">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Leadership</h3>
                <p className="text-gray-600 mb-6">Strategic financial guidance for business growth.</p>
                <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
                <p className="text-gray-600">Average growth improvement for clients</p>
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
              Why Professional CFO Services Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Executive-level financial expertise provides strategic guidance and 
              professional leadership for sustainable business growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-purple-100 rounded-lg p-2 mr-3 mt-1">
                  <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Our CFO & Management Accounting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive executive financial services for strategic business leadership.
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
                      <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* CFO Services Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Executive Services We Provide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic CFO services to drive business success and growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cfoServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-purple-100 rounded-lg p-3 inline-flex mb-4">
                  <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
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
              Our CFO Service Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach to deliver executive-level financial leadership.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Assessment', description: 'Evaluate current financial position and needs' },
              { step: '2', title: 'Strategy', description: 'Develop executive financial strategy' },
              { step: '3', title: 'Implementation', description: 'Execute financial plans and systems' },
              { step: '4', title: 'Leadership', description: 'Provide ongoing financial guidance' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
      <section className="bg-purple-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for Executive Financial Leadership?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our CFO services can provide the strategic financial 
            guidance your business needs to achieve exceptional growth.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-purple-600 hover:bg-gray-100">
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}

export default CFOManagementAccounting
