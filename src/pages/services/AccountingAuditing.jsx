import { Link } from 'react-router-dom'

const AccountingAuditing = () => {
  const services = [
    {
      title: 'Accounting Consulting',
      description: 'We provide expert accounting consulting to help structure, streamline, and improve your financial processes.',
      features: [
        'Financial process optimization',
        'Accounting system implementation',
        'Process streamlining',
        'Compliance assurance'
      ]
    },
    {
      title: 'Bookkeeping',
      description: 'We maintain accurate and up-to-date records of all financial transactions, including sales, purchases, and expenses.',
      features: [
        'Daily transaction recording',
        'Sales and purchase tracking',
        'Expense management',
        'Financial data organization'
      ]
    },
    {
      title: 'Accounting Analysis / Review',
      description: 'We perform detailed analysis and review of your existing financial records.',
      features: [
        'Financial record analysis',
        'Error identification and correction',
        'Improvement area identification',
        'Management reporting'
      ]
    },
    {
      title: 'Audit Services',
      description: 'We offer independent audit services to ensure accuracy and regulatory compliance.',
      features: [
        'Independent financial audits',
        'Regulatory compliance verification',
        'Stakeholder confidence building',
        'Audit report preparation'
      ]
    },
    {
      title: 'External Audit Support',
      description: 'We Support statutory external audits as per regulatory requirements.',
      features: [
        'Statutory audit coordination',
        'Financial statement verification',
        'Regulatory compliance support',
        'Stakeholder communication'
      ]
    },
    {
      title: 'Internal Audit',
      description: 'We evaluate internal controls, processes, and risk management systems.',
      features: [
        'Internal control evaluation',
        'Risk assessment',
        'Process improvement recommendations',
        'Operational efficiency enhancement'
      ]
    },
    {
      title: 'Tax Audit',
      description: 'We provide tax audit services in accordance with income tax and corporate tax laws.',
      features: [
        'Tax compliance verification',
        'Statutory reporting compliance',
        'Penalty minimization',
        'Future tax risk reduction'
      ]
    },
    {
      title: 'Liquidation Audit',
      description: 'We provide audit services during liquidation or winding-up of a company.',
      features: [
        'Asset verification',
        'Liability assessment',
        'Settlement verification',
        'Regulatory compliance'
      ]
    },
    {
      title: 'ICV Audit',
      description: 'We offer independent audit services to ensure accuracy and regulatory compliance.',
      features: [
        'Independent verification',
        'Regulatory compliance',
        'Financial statement accuracy',
        'Stakeholder confidence'
      ]
    },
    {
      title: 'Due Diligence Audit',
      description: 'Our Due Diligence Audit services provide a comprehensive review of a company\'s financial, operational, and compliance position prior to any major transaction.',
      features: [
        'Financial statement analysis',
        'Cash flow evaluation',
        'Liability assessment',
        'Contract review',
        'Tax compliance evaluation',
        'Business sustainability analysis',
        'Risk identification',
        'Valuation support'
      ]
    },
    {
      title: 'E-Invoicing',
      description: 'We provide end-to-end E-Invoicing implementation and compliance support in line with UAE tax regulations.',
      features: [
        'System setup and implementation',
        'Invoice format validation',
        'Accounting software integration',
        'Regulatory compliance',
        'Staff training',
        'Process automation',
        'Ongoing monitoring'
      ]
    }
  ]

  const benefits = [
    'Expert accounting consulting for process improvement',
    'Compliance with applicable regulations and accounting standards',
    'Support for informed decision-making and long-term business growth',
    'Accurate and organized financial data management',
    'Audit-ready and compliant financial records',
    'Enhanced transparency and stakeholder confidence',
    'Comprehensive error identification and correction',
    'Operational efficiency improvements',
    'Risk mitigation and control enhancement'
  ]

  const auditTypes = [
    { name: 'Audit Services', description: 'Independent audit services to ensure accuracy and regulatory compliance' },
    { name: 'External Audit Support', description: 'Support statutory external audits as per regulatory requirements' },
    { name: 'Internal Audit', description: 'Evaluate internal controls, processes, and risk management systems' },
    { name: 'Tax Audit', description: 'Tax audit services in accordance with income tax and corporate tax laws' },
    { name: 'Liquidation Audit', description: 'Audit services during liquidation or winding-up of a company' },
    { name: 'ICV Audit', description: 'Independent audit services to ensure accuracy and regulatory compliance' },
    { name: 'Due Diligence Audit', description: 'Comprehensive review prior to major transactions' },
    { name: 'E-Invoicing', description: 'End-to-end E-Invoicing implementation and compliance support' }
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
            <span className="text-gray-900">Accounting & Auditing</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Accounting & Auditing Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive accounting and auditing solutions to ensure financial accuracy, 
                regulatory compliance, and stakeholder confidence in your business operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  Free Accounting Assessment
                </Link>
                <Link to="/services" className="btn-secondary">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Excellence</h3>
                <p className="text-gray-600 mb-6">Ensure accuracy and compliance with expert accounting services.</p>
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-gray-600">Audit compliance rate</p>
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
              Why Professional Accounting & Auditing Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accurate accounting and thorough auditing are essential for business success, 
              regulatory compliance, and stakeholder trust.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-100 rounded-lg p-2 mr-3 mt-1">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Our Accounting & Auditing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive accounting and auditing solutions to meet all your financial needs.
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
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Audit Types Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Audits We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized audit services tailored to your specific business needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {auditTypes.map((audit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-blue-100 rounded-lg p-3 inline-flex mb-4">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{audit.name}</h3>
                <p className="text-gray-600 text-sm">{audit.description}</p>
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
              Our Accounting & Auditing Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to ensure accuracy, compliance, and continuous improvement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Assessment', description: 'Evaluate current accounting systems and processes' },
              { step: '2', title: 'Planning', description: 'Develop customized accounting and audit strategy' },
              { step: '3', title: 'Execution', description: 'Implement accounting services and conduct audits' },
              { step: '4', title: 'Reporting', description: 'Deliver comprehensive reports and recommendations' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
      <section className="bg-blue-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ensure Financial Accuracy?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our accounting and auditing services can help your business 
            achieve financial excellence and regulatory compliance.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
            Schedule Your Free Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AccountingAuditing
