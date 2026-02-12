import { Link } from 'react-router-dom'

const Services = () => {
  const services = [
    {
      title: 'Accounting & Auditing',
      description: 'Comprehensive accounting services and professional auditing to ensure financial accuracy and compliance.',
      detailedDescription: 'Professional accounting and auditing services that provide accurate financial records, ensure regulatory compliance, and give you confidence in your financial reporting.',
      benefits: [
        'Accurate financial reporting',
        'Regulatory compliance assurance',
        'Risk identification and mitigation',
        'Improved internal controls',
        'Professional audit documentation'
      ],
      features: [
        'Financial statement preparation',
        'Internal and external audits',
        'Compliance reporting',
        'Risk assessment',
        'Audit trail documentation'
      ],
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/services/accounting-auditing',
      color: 'blue'
    },
    {
      title: 'Taxation & Compliance',
      description: 'Strategic tax planning and comprehensive compliance services to minimize liability and ensure adherence.',
      detailedDescription: 'Expert tax services including strategic planning, preparation, and compliance management to optimize your tax position while maintaining full regulatory adherence.',
      benefits: [
        'Minimize tax liability legally',
        'Ensure regulatory compliance',
        'Avoid penalties and interest',
        'Strategic tax planning',
        'Comprehensive tax documentation'
      ],
      features: [
        'Tax planning and strategy',
        'Tax preparation and filing',
        'Compliance monitoring',
        'Tax audit support',
        'Multi-jurisdiction expertise'
      ],
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/services/taxation-compliance',
      color: 'green'
    },
    {
      title: 'CFO Service and Management Accounting',
      description: 'Executive-level financial leadership and strategic management accounting for business growth.',
      detailedDescription: 'Professional CFO services providing strategic financial guidance, management accounting, and executive-level financial leadership without the cost of a full-time executive.',
      benefits: [
        'Strategic financial leadership',
        'Improved decision-making',
        'Cost optimization',
        'Performance measurement',
        'Executive financial guidance'
      ],
      features: [
        'Strategic financial planning',
        'Management accounting',
        'Budget development',
        'Performance analysis',
        'Executive financial reporting'
      ],
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      href: '/services/cfo-management-accounting',
      color: 'purple'
    },
    {
      title: 'Financial Services',
      description: 'Comprehensive financial advisory and planning services for optimal financial performance.',
      detailedDescription: 'Complete financial services including advisory, planning, analysis, and strategic guidance to help you achieve your financial goals and maximize business value.',
      benefits: [
        'Strategic financial planning',
        'Investment guidance',
        'Risk management',
        'Performance optimization',
        'Financial decision support'
      ],
      features: [
        'Financial analysis and reporting',
        'Investment advisory',
        'Risk assessment',
        'Cash flow management',
        'Strategic planning'
      ],
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/services/financial-services',
      color: 'orange'
    },
    {
      title: 'Corporate Services',
      description: 'Comprehensive corporate solutions including structuring, governance, and business optimization.',
      detailedDescription: 'Professional corporate services covering business structuring, corporate governance, compliance management, and strategic business optimization for corporate entities.',
      benefits: [
        'Optimal corporate structure',
        'Governance improvement',
        'Compliance management',
        'Business optimization',
        'Risk mitigation'
      ],
      features: [
        'Corporate structuring',
        'Governance advisory',
        'Compliance management',
        'Business optimization',
        'Corporate documentation'
      ],
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      href: '/services/corporate-services',
      color: 'indigo'
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        hover: 'hover:bg-blue-100'
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200',
        hover: 'hover:bg-green-100'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        hover: 'hover:bg-purple-100'
      },
      orange: {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200',
        hover: 'hover:bg-orange-100'
      }
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
              Comprehensive Financial Services
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Expert solutions designed to meet all your business financial needs. 
              From tax planning to strategic consulting, we've got you covered.
            </p>
            <Link to="/contact" className="btn-primary">
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color)
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="p-8">
                    <div className={`${colors.bg} rounded-lg p-4 inline-flex mb-6`}>
                      <div className={colors.text}>
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <p className="text-gray-700 mb-6">{service.detailedDescription}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link 
                      to={service.href}
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

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A straightforward approach designed to deliver results and build long-term partnerships.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Discovery', description: 'We understand your business needs and financial goals' },
              { step: '2', title: 'Strategy', description: 'We develop customized solutions tailored to your requirements' },
              { step: '3', title: 'Implementation', description: 'We execute the plan with attention to detail and expertise' },
              { step: '4', title: 'Support', description: 'We provide ongoing support and adjustments as needed' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
      <section className="bg-primary-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business Finances?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our comprehensive services can help you achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 border border-primary-200">
              Schedule Free Consultation
            </Link>
            <Link to="/industries" className="btn-secondary border-white text-white hover:bg-white/20 hover:border-white hover:text-white transition-all duration-300">
              View Industries We Serve
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
