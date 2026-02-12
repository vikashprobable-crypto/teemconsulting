import { Link } from 'react-router-dom'

const BusinessConsulting = () => {
  const services = [
    {
      title: 'Strategic Planning',
      description: 'Develop comprehensive business strategies for sustainable growth',
      features: ['Business model optimization', 'Growth strategy development', 'Market analysis', 'Competitive positioning']
    },
    {
      title: 'Process Optimization',
      description: 'Streamline operations to improve efficiency and reduce costs',
      features: ['Workflow analysis', 'Process redesign', 'Automation recommendations', 'Performance metrics']
    },
    {
      title: 'Financial Strategy',
      description: 'Create financial frameworks to support business objectives',
      features: ['Capital structure optimization', 'Financial modeling', 'Investment analysis', 'Risk management']
    },
    {
      title: 'Change Management',
      description: 'Guide your team through business transformations successfully',
      features: ['Change strategy development', 'Team training', 'Communication planning', 'Performance tracking']
    }
  ]

  const benefits = [
    'Accelerated business growth and profitability',
    'Improved operational efficiency',
    'Better decision-making through data-driven insights',
    'Enhanced competitive advantage',
    'Reduced business risks and uncertainties',
    'Clear roadmap for achieving business goals'
  ]

  const industries = ['Startups', 'Small Businesses', 'Family Businesses', 'Professional Services', 'Technology Companies', 'Manufacturing']

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
            <span className="text-gray-900">Business Consulting</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Expert Business Consulting
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Strategic guidance and practical solutions to help your business overcome 
                challenges and achieve sustainable growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  Free Business Assessment
                </Link>
                <Link to="/services" className="btn-secondary">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Transform Your Business</h3>
                <p className="text-gray-600 mb-6">Our consulting services have helped businesses grow by an average of 40%.</p>
                <div className="text-3xl font-bold text-purple-600 mb-2">200+</div>
                <p className="text-gray-600">Businesses transformed</p>
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
              Why Business Consulting Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert guidance can be the difference between business stagnation and breakthrough growth.
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
              Our Consulting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive consulting solutions to address your most pressing business challenges.
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

      {/* Industries Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized consulting expertise for various business sectors.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-100 rounded-lg p-3 inline-flex mb-3">
                  <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{industry}</span>
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
              Our Consulting Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach to deliver measurable results and lasting impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Discovery', description: 'Deep dive into your business challenges and opportunities' },
              { step: '2', title: 'Analysis', description: 'Comprehensive analysis of data and market conditions' },
              { step: '3', title: 'Strategy', description: 'Develop tailored solutions and action plans' },
              { step: '4', title: 'Implementation', description: 'Execute strategies with ongoing support and monitoring' }
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
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our consulting expertise can help you achieve your business goals.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-purple-600 hover:bg-gray-100">
            Schedule Your Free Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}

export default BusinessConsulting
