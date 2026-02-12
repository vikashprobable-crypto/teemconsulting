import { Link } from 'react-router-dom'

const TaxationCompliance = () => {
  const services = [
    {
      title: 'Value Added Tax UAE',
      description: 'VAT registration with Federal Tax Authority (FTA)',
      features: [
        'Mandatory & voluntary registration support',
        'TRN generation and EmaraTax setup',
        'VAT compliance guidance',
        'FTA registration assistance'
      ]
    },
    {
      title: 'VAT Return Filling',
      description: 'Monthly / quarterly VAT return preparation',
      features: [
        'Accurate VAT calculation (output & input VAT)',
        'Timely submission to avoid penalties',
        'VAT compliance monitoring',
        'Return preparation and filing'
      ]
    },
    {
      title: 'VAT Accounting & Review',
      description: 'Review of VAT records & transactions',
      features: [
        'Input VAT eligibility check',
        'VAT reconciliation with books & bank',
        'VAT record analysis',
        'Compliance verification'
      ]
    },
    {
      title: 'VAT Advisory',
      description: 'Guidance on VAT applicability',
      features: [
        'Zero-rated & exempt supplies advisory',
        'VAT treatment on imports & exports',
        'VAT consultation services',
        'Regulatory guidance'
      ]
    },
    {
      title: 'VAT Deregistration',
      description: 'VAT deregistration support',
      features: [
        'Final return filing & clearance',
        'Deregistration process assistance',
        'FTA compliance closure',
        'Documentation support'
      ]
    },
    {
      title: 'Corporate Tax UAE',
      description: 'Corporate Tax registration on EmaraTax',
      features: [
        'Corporate Tax registration',
        'TRN generation & profile setup',
        'Business details update with FTA',
        'FTA registration support'
      ]
    },
    {
      title: 'Corporate Tax Return Filling',
      description: 'Profit calculation as per UAE CT law',
      features: [
        'Corporate Tax return preparation',
        'Timely filing with Federal Tax Authority',
        'Tax compliance monitoring',
        'Return submission support'
      ]
    },
    {
      title: 'Corporate Tax Advisory',
      description: 'Understanding 0% & 9% Tax Slabs',
      features: [
        'Guidance on exemptions & thresholds',
        'Free Zone & Mainland advisory',
        'Tax planning strategies',
        'Corporate consultation'
      ]
    },
    {
      title: 'Accounting Review For CT',
      description: 'Review of books of accounts',
      features: [
        'Adjustment of non-allowable expenses',
        'Accurate taxable income computation',
        'Financial statement review',
        'Tax compliance verification'
      ]
    },
    {
      title: 'Excise Tax UAE',
      description: 'Assist with Excise Tax registration with UAE (FTA)',
      features: [
        'Excise Tax registration',
        'TRN generation and EmaraTax setup',
        'Mandatory & voluntary registration support',
        'FTA registration assistance'
      ]
    },
    {
      title: 'Excise Tax Return Preparation Filling',
      description: 'Monthly / quarterly Excise tax return preparation & submission',
      features: [
        'Accurate calculation of Excise tax liabilities',
        'Timely submission to avoid penalties',
        'Return preparation and filing',
        'Compliance monitoring'
      ]
    },
    {
      title: 'Excise Tax Advisory & Consultation',
      description: 'Guidance on applicability of excise tax under UAE Law',
      features: [
        'Advisory on zero-rated, exempt, and standard excise goods',
        'Classification support for excise goods',
        'Tobacco, energy drinks, sweetened beverages',
        'Excise tax consultation'
      ]
    }
  ]

  const benefits = [
    'VAT registration and compliance with Federal Tax Authority (FTA)',
    'Accurate VAT calculation and timely return filing',
    'Corporate tax registration and return preparation',
    'Excise tax registration and compliance support',
    'Tax advisory and consultation services',
    'Record keeping guidance for minimum 5 years compliance',
    'Compliance & penalty support with FTA notices',
    'Documentation support for audit coordination'
  ]

  const complianceAreas = [
    { name: 'VAT Services', description: 'Comprehensive VAT registration, filing, and compliance support' },
    { name: 'Corporate Tax', description: 'Corporate tax registration and return filing services' },
    { name: 'Excise Tax', description: 'Excise tax registration and compliance management' },
    { name: 'Tax Advisory', description: 'Expert tax consultation and advisory services' },
    { name: 'Compliance Support', description: 'FTA compliance and penalty assistance' }
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
            <span className="text-gray-900">Taxation & Compliance</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Expert Taxation & Compliance Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive tax planning and compliance solutions to minimize your tax burden 
                while ensuring full adherence to all regulatory requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  Free Tax Assessment
                </Link>
                <Link to="/services" className="btn-secondary">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tax Optimization</h3>
                <p className="text-gray-600 mb-6">Strategic tax planning to maximize your savings.</p>
                <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
                <p className="text-gray-600">Average tax savings for clients</p>
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
              Why Professional Tax Services Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tax guidance is crucial for minimizing liability, ensuring compliance, 
              and avoiding costly penalties.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-green-100 rounded-lg p-2 mr-3 mt-1">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Our Tax & Compliance Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tax and compliance solutions to meet all your business needs.
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
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Compliance Areas Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compliance Areas We Cover
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized expertise across all major tax and compliance domains.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceAreas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="bg-green-100 rounded-lg p-3 inline-flex mb-4">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.name}</h3>
                <p className="text-gray-600 text-sm">{area.description}</p>
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
              Our Tax & Compliance Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to ensure optimal tax outcomes and complete compliance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Analysis', description: 'Comprehensive review of current tax situation' },
              { step: '2', title: 'Strategy', description: 'Develop customized tax planning strategy' },
              { step: '3', title: 'Implementation', description: 'Execute tax plan and ensure compliance' },
              { step: '4', title: 'Monitoring', description: 'Ongoing monitoring and adjustments' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
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
      <section className="bg-green-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Tax Position?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how our tax and compliance services can help your business 
            achieve optimal tax outcomes and full regulatory compliance.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-green-600 hover:bg-gray-100">
            Schedule Your Free Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}

export default TaxationCompliance
