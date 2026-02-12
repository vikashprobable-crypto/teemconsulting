import { Link } from 'react-router-dom'

const Bookkeeping = () => {
  const services = [
    {
      title: 'Daily Transaction Management',
      description: 'Recording and categorizing all business transactions accurately and timely',
      features: ['Sales and revenue tracking', 'Expense categorization', 'Bank deposits recording', 'Credit card transactions']
    },
    {
      title: 'Bank Reconciliation',
      description: 'Monthly reconciliation of all bank and credit card accounts',
      features: ['Bank statement matching', 'Discrepancy resolution', 'Cash flow tracking', 'Balance verification']
    },
    {
      title: 'Accounts Payable & Receivable',
      description: 'Managing money owed to and by your business',
      features: ['Invoice processing', 'Payment scheduling', 'Collections management', 'Vendor relationship management']
    },
    {
      title: 'Financial Reporting',
      description: 'Preparing accurate financial statements for business decisions',
      features: ['Profit & Loss statements', 'Balance sheets', 'Cash flow statements', 'Custom reports']
    }
  ]

  const benefits = [
    'Accurate financial records for better decision-making',
    'Improved cash flow management',
    'Timely identification of financial issues',
    'Simplified tax preparation process',
    'Better budgeting and forecasting',
    'Professional financial documentation'
  ]

  const software = ['QuickBooks', 'Xero', 'FreshBooks', 'Wave', 'Sage', 'Custom solutions']

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
            <span className="text-gray-900">Bookkeeping</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Bookkeeping Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Accurate, timely, and comprehensive bookkeeping services to keep your 
                business finances organized and compliant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">
                  Free Bookkeeping Consultation
                </Link>
                <Link to="/services" className="btn-secondary">
                  View All Services
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Focus on Your Business</h3>
                <p className="text-gray-600 mb-6">Let us handle your books while you grow your business.</p>
                <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                <p className="text-gray-600">Accuracy rate guaranteed</p>
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
              Why Professional Bookkeeping Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accurate bookkeeping is the foundation of good business management and financial success.
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
              Our Bookkeeping Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive bookkeeping solutions tailored to your business needs.
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

      {/* Software Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Accounting Software Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with all major accounting software platforms to serve your needs.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {software.map((platform, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-100 rounded-lg p-3 inline-flex mb-3">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Organize Your Finances?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our professional bookkeepers handle your financial records while you focus on growing your business.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-green-600 hover:bg-gray-100">
            Start Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Bookkeeping
