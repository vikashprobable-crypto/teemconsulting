import { Link } from 'react-router-dom'

const FinancialAdvisory = () => {
  const services = [
    {
      title: 'Financial Analysis',
      description: 'In-depth analysis of your financial position and performance',
      features: ['Financial statement analysis', 'Trend analysis', 'Ratio analysis', 'Performance benchmarking']
    },
    {
      title: 'Budgeting & Forecasting',
      description: 'Develop comprehensive budgets and financial forecasts',
      features: ['Annual budgeting', 'Cash flow forecasting', 'Scenario planning', 'Variance analysis']
    },
    {
      title: 'Investment Advisory',
      description: 'Strategic guidance on business investments and capital allocation',
      features: ['Investment opportunity analysis', 'Risk assessment', 'ROI optimization', 'Portfolio management']
    },
    {
      title: 'Risk Management',
      description: 'Identify and mitigate financial risks to protect your business',
      features: ['Risk assessment', 'Internal controls', 'Compliance management', 'Insurance optimization']
    }
  ]

  const benefits = [
    'Better financial decision-making through data-driven insights',
    'Improved profitability and cash flow management',
    'Enhanced ability to secure financing and investments',
    'Reduced financial risks and improved stability',
    'Clear roadmap for achieving financial goals',
    'Professional financial documentation for stakeholders'
  ]

  const metrics = [
    { label: 'Profitability Improvement', value: '25%' },
    { label: 'Cash Flow Optimization', value: '30%' },
    { label: 'Cost Reduction', value: '20%' },
    { label: 'ROI Increase', value: '35%' }
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
            <span className="text-gray-900">Financial Advisory</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Expert Financial Advisory Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Strategic financial guidance to help you make informed decisions, 
                optimize performance, and achieve long-term business success.
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
                <p className="text-gray-600 mb-6">Transform your financial performance with expert advisory.</p>
                <div className="text-3xl font-bold text-orange-600 mb-2">$50M+</div>
                <p className="text-gray-600">Client assets managed</p>
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
              Why Financial Advisory Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert financial guidance is crucial for making strategic business decisions and ensuring long-term success.
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

      {/* Metrics Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Average improvements achieved by our clients through financial advisory services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">{metric.value}</div>
                <div className="text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Advisory Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial advisory solutions to support your business growth.
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

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Advisory Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to deliver actionable financial insights and recommendations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Assessment', description: 'Comprehensive evaluation of your current financial situation' },
              { step: '2', title: 'Analysis', description: 'Deep dive into financial data and market conditions' },
              { step: '3', title: 'Strategy', description: 'Develop customized financial strategies and recommendations' },
              { step: '4', title: 'Implementation', description: 'Support execution and monitor results with ongoing adjustments' }
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
            Ready to Optimize Your Financial Performance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our financial advisory services can help you achieve your business goals.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-orange-600 hover:bg-gray-100">
            Schedule Your Free Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}

export default FinancialAdvisory
