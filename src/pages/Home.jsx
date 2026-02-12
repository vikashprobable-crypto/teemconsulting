import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getWebsiteData } from '../data/websiteData'
import { getImageSrc } from '../utils/fileUpload'

const Home = () => {
  const [homeData, setHomeData] = useState({})
  const [testimonials, setTestimonials] = useState([])
  const [clients, setClients] = useState([])
  const [services, setServices] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // Load data from centralized store
    const homePageData = getWebsiteData('homePage')
    const testimonialsData = getWebsiteData('testimonials')
    const clientsData = getWebsiteData('clients')
    const servicesData = getWebsiteData('services')
    
    if (homePageData) setHomeData(homePageData)
    if (testimonialsData) setTestimonials(testimonialsData)
    if (clientsData) setClients(clientsData)
    if (servicesData) setServices(servicesData)
  }, [])

  useEffect(() => {
    // Listen for data updates
    const handleDataUpdate = () => {
      const homePageData = getWebsiteData('homePage')
      const testimonialsData = getWebsiteData('testimonials')
      const clientsData = getWebsiteData('clients')
      const servicesData = getWebsiteData('services')
      
      if (homePageData) setHomeData(homePageData)
      if (testimonialsData) setTestimonials(testimonialsData)
      if (clientsData) setClients(clientsData)
      if (servicesData) setServices(servicesData)
    }

    window.addEventListener('websiteDataUpdated', handleDataUpdate)
    return () => window.removeEventListener('websiteDataUpdated', handleDataUpdate)
  }, [])

  // Carousel control functions
  const scrollCarousel = (direction) => {
    const carousel = document.getElementById('clientsCarousel')
    if (!carousel) return
    
    const slideWidth = carousel.children[0]?.offsetWidth || 0
    const maxSlide = Math.max(0, clients.length - getVisibleSlides())
    
    if (direction === 'next') {
      setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1)
    } else {
      setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1)
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex)
  }

  const getVisibleSlides = () => {
    const width = window.innerWidth
    if (width >= 1280) return 5 // xl screens
    if (width >= 1024) return 4 // lg screens  
    if (width >= 768) return 3 // md screens
    return 2 // sm screens
  }

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      const maxSlide = Math.max(0, clients.length - getVisibleSlides())
      setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [clients.length, getVisibleSlides()])

  // Update carousel position when currentSlide changes
  useEffect(() => {
    const carousel = document.getElementById('clientsCarousel')
    if (!carousel) return
    
    const slideWidth = carousel.children[0]?.offsetWidth || 0
    const offset = -currentSlide * slideWidth
    carousel.style.transform = `translateX(${offset}px)`
  }, [currentSlide])

  if (!homeData || Object.keys(homeData).length === 0) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  }

  const serviceIcons = {
    'Accounting & Auditing': (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    'Taxation & Compliance': (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    'CFO Services': (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'Financial Services': (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Corporate Services': (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {homeData.hero.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {homeData.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary text-center hover-lift">
                  {homeData.hero.primaryButtonText}
                </Link>
                <Link to="/services" className="btn-secondary text-center hover-lift">
                  {homeData.hero.secondaryButtonText}
                </Link>
              </div>
            </div>
            <div className="relative animate-slide-in">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8 hover-lift">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Grow Your Business?</h3>
                  <p className="text-gray-600 mb-6">Schedule a free consultation and discover how we can help you achieve your financial goals.</p>
                  <Link to="/contact" className="btn-primary w-full text-center">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section text-white section-padding">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {homeData.stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
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
              {homeData.servicesSection.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {homeData.servicesSection.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index} 
                to={service.href}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="text-primary-600 mb-4 group-hover:text-primary-700 transition-colors">
                  {serviceIcons[service.title] || serviceIcons['Accounting & Auditing']}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              {homeData.servicesSection.buttonText}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {homeData.whyChooseSection.title}
              </h2>
              <div className="space-y-6">
                {homeData.whyChooseSection.points.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-primary-100 rounded-lg p-2 mr-4 mt-1">
                      <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{point.title}</h3>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Journey to Financial Success</h3>
                <p className="text-gray-600 mb-6">Join hundreds of satisfied clients who have transformed their businesses with our expert guidance.</p>
                <Link to="/contact" className="btn-primary w-full text-center">
                  Schedule Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {homeData.testimonialsSection.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {homeData.testimonialsSection.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <svg className="h-6 w-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Our Trusted Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in">
              We're proud to partner with leading businesses across various industries
            </p>
          </div>
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" id="clientsCarousel">
              {clients.map((client, index) => (
                <div 
                  key={client.id || index} 
                  className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 xl:w-1/5 px-4"
                >
                  <div className="flex items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={getImageSrc(client.logo)}
                        alt={client.name}
                        className="h-24 w-auto object-contain transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={() => scrollCarousel('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 z-10"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 z-10"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-primary-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-black section-padding">
 
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in text-white">
            {homeData.ctaSection.title}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-slide-in text-white/90">
            {homeData.ctaSection.subtitle}
          </p>
          <Link to="/contact" className="btn-primary bg-white text-primary-600 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 border border-primary-200 hover-lift">
            {homeData.ctaSection.buttonText}
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
