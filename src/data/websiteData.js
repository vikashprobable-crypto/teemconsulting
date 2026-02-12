// Centralized website data store
// This file acts as a single source of truth for all website content

export const websiteData = {
  // Home Page Data
  homePage: {
    hero: {
      title: 'Expert Financial Solutions for Your Business Growth',
      subtitle: 'Trusted accounting and consulting services designed to help small businesses and startups thrive. Get the financial expertise you need to succeed.',
      primaryButtonText: 'Free Consultation',
      secondaryButtonText: 'Our Services'
    },
    stats: [
      { id: 1, value: '500+', label: 'Clients Served' },
      { id: 2, value: '15+', label: 'Years Experience' },
      { id: 3, value: '98%', label: 'Client Satisfaction' },
      { id: 4, value: '24/7', label: 'Support Available' }
    ],
    servicesSection: {
      title: 'Comprehensive Financial Services',
      subtitle: 'From tax planning to business consulting, we offer the full spectrum of financial services to support your business at every stage.',
      buttonText: 'View All Services'
    },
    whyChooseSection: {
      title: 'Why Businesses Choose Teem Consulting',
      subtitle: 'Discover what sets us apart in the financial consulting industry.',
      points: [
        {
          id: 1,
          title: 'Expert Team',
          description: 'Certified professionals with years of experience in accounting and business consulting.'
        },
        {
          id: 2,
          title: 'Personalized Solutions',
          description: 'Tailored strategies designed specifically for your business needs and goals.'
        },
        {
          id: 3,
          title: 'Proven Results',
          description: 'Track record of helping businesses reduce costs, increase efficiency, and achieve growth.'
        }
      ]
    },
    testimonialsSection: {
      title: 'What Our Clients Say',
      subtitle: 'Don\'t just take our word for it. Hear from businesses we\'ve helped succeed.',
      buttonText: 'Read More Reviews'
    },
    ctaSection: {
      title: 'Ready to Transform Your Business Finances?',
      subtitle: 'Take the first step toward financial clarity and business growth. Schedule your free consultation today.',
      buttonText: 'Get Your Free Consultation'
    }
  },

  // Services Data
  services: [
    {
      id: 1,
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
      href: '/services/accounting-auditing',
      color: 'blue'
    },
    {
      id: 2,
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
      href: '/services/taxation-compliance',
      color: 'green'
    },
    {
      id: 3,
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
      href: '/services/cfo-management-accounting',
      color: 'purple'
    },
    {
      id: 4,
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
      href: '/services/financial-services',
      color: 'orange'
    },
    {
      id: 5,
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
      href: '/services/corporate-services',
      color: 'indigo'
    }
  ],

  // Team Data
  team: [
    {
      id: 1,
      name: 'D-Krushna Murthy',
      role: 'Founder & CEO',
      bio: 'CPA with 20+ years of experience helping businesses achieve financial success.',
      expertise: ['Tax Planning', 'Business Strategy', 'Financial Advisory']
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      role: 'Senior Consultant',
      bio: 'Expert in business consulting and financial management for growing companies.',
      expertise: ['Business Consulting', 'Process Optimization', 'Risk Management']
    },
    {
      id: 3,
      name: 'David Kim',
      role: 'Tax Specialist',
      bio: 'Specialized in tax planning and compliance for small and medium businesses.',
      expertise: ['Tax Compliance', 'Tax Planning', 'IRS Representation']
    },
    {
      id: 4,
      name: 'Sarah Mitchell',
      role: 'Bookkeeping Manager',
      bio: 'Detail-oriented professional ensuring accurate financial records and reporting.',
      expertise: ['Bookkeeping', 'Financial Reporting', 'QuickBooks Expert']
    }
  ],

  // Team Data
  team: [
    {
      id: 1,
      name: 'D-Krushna Murthy',
      role: 'Founder & CEO',
      bio: 'CPA with 20+ years of experience helping businesses achieve financial success.',
      expertise: ['Tax Planning', 'Business Strategy', 'Financial Advisory']
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      role: 'Senior Consultant',
      bio: 'Expert in business consulting and financial management for growing companies.',
      expertise: ['Business Consulting', 'Process Optimization', 'Risk Management']
    },
    {
      id: 3,
      name: 'David Kim',
      role: 'Tax Specialist',
      bio: 'Specialized in tax planning and compliance for small and medium businesses.',
      expertise: ['Tax Compliance', 'Tax Planning', 'IRS Representation']
    },
    {
      id: 4,
      name: 'Sarah Mitchell',
      role: 'Bookkeeping Manager',
      bio: 'Detail-oriented professional ensuring accurate financial records and reporting.',
      expertise: ['Bookkeeping', 'Financial Reporting', 'QuickBooks Expert']
    }
  ],

  // Clients Data
  clients: [
    {
      id: 1,
      name: 'Tech Startup Inc.',
      logo: 'https://via.placeholder.com/150x80/3b82f6/ffffff?text=Tech+Startup'
    },
    {
      id: 2,
      name: 'Retail Solutions LLC',
      logo: 'https://via.placeholder.com/150x80/10b981/ffffff?text=Retail+Solutions'
    },
    {
      id: 3,
      name: 'Manufacturing Corp',
      logo: 'https://via.placeholder.com/150x80/f59e0b/ffffff?text=Manufacturing'
    },
    {
      id: 4,
      name: 'Healthcare Plus',
      logo: 'https://via.placeholder.com/150x80/6366f1/ffffff?text=Healthcare+Plus'
    },
    {
      id: 5,
      name: 'Finance Group',
      logo: 'https://via.placeholder.com/150x80/8b5cf6/ffffff?text=Finance+Group'
    },
    {
      id: 6,
      name: 'Education First',
      logo: 'https://via.placeholder.com/150x80/a855f7/ffffff?text=Education+First'
    }
  ],

  // Gallery Data
  gallery: [
    {
      id: 1,
      title: 'Office Team Meeting',
      description: 'Our team discussing quarterly results and planning for the next quarter.',
      category: 'team',
      image: 'https://via.placeholder.com/800x500/0ea5e9/ffffff?text=Team+Meeting'
    },
    {
      id: 2,
      title: 'Modern Office Space',
      description: 'Our comfortable and modern workspace designed for productivity.',
      category: 'office',
      image: 'https://via.placeholder.com/800x500/6366f1/ffffff?text=Office+Space'
    },
    {
      id: 3,
      title: 'Company Anniversary Celebration',
      description: 'Celebrating 15 years of excellence in financial services.',
      category: 'events',
      image: 'https://via.placeholder.com/800x500/f97316/ffffff?text=Anniversary'
    },
    {
      id: 4,
      title: 'Client Consultation',
      description: 'Providing expert financial advice to our valued clients.',
      category: 'general',
      image: 'https://via.placeholder.com/800x500/10b981/ffffff?text=Consultation'
    }
  ],

  // Testimonials Data
  testimonials: [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Tech Startup Inc.',
      role: 'CEO',
      text: 'AC Firm transformed our financial management. Their expertise helped us reduce tax liability by 30% while ensuring full compliance.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Retail Solutions LLC',
      role: 'Founder',
      text: 'Professional, reliable, and always available. They\'ve been instrumental in our business growth and financial planning.',
      rating: 5
    }
  ],

  // Contact Data
  contact: [
    {
      id: 1,
      title: 'Phone',
      info: '+97143557266',
      icon: 'phone'
    },
    {
      id: 2,
      title: 'Email',
      info: 'murthy@teemconsulting.com',
      icon: 'email'
    },
    {
      id: 3,
      title: 'Office',
      info: 'Office No.214, Bank Street Building, Bank Street, Bur Dubai, Dubai, UAE',
      icon: 'location'
    },
    {
      id: 4,
      title: 'Hours',
      info: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 2:00 PM',
      icon: 'clock'
    }
  ],

  // FAQ Data
  faq: [
    {
      id: 1,
      question: 'How quickly will I hear back after submitting the form?',
      answer: 'We typically respond within 24 hours during business days. For urgent matters, please call us directly.'
    },
    {
      id: 2,
      question: 'Is the initial consultation really free?',
      answer: 'Yes, your initial consultation is completely free with no obligation. We\'ll discuss your needs and how we can help.'
    },
    {
      id: 3,
      question: 'What should I prepare for the consultation?',
      answer: 'Bring your current financial challenges, business goals, and any relevant financial documents. The more information you provide, the better we can assist you.'
    },
    {
      id: 4,
      question: 'Do you work with businesses of all sizes?',
      answer: 'Yes, we specialize in helping small to medium-sized businesses and startups, but we work with businesses of all sizes.'
    }
  ],

  // Color Theme Data
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      900: '#0c4a6e'
    },
    secondary: {
      50: '#fafafa',
      100: '#f4f4f5',
      500: '#71717a',
      600: '#52525b',
      700: '#404040',
      900: '#171717'
    },
    accent: {
      50: '#fef7ed',
      100: '#fed7aa',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      900: '#7c2d12'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      900: '#064e3b'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      900: '#7f1d1d'
    }
  }
}

// Data management functions
export const updateWebsiteData = (section, data) => {
  // Update the centralized data store
  if (websiteData[section]) {
    if (typeof data === 'object' && !Array.isArray(data)) {
      websiteData[section] = { ...websiteData[section], ...data }
    } else {
      websiteData[section] = data
    }
  }
  
  // Save to localStorage for persistence
  localStorage.setItem('websiteData', JSON.stringify(websiteData))
  
  // Dispatch custom event to notify components of changes
  window.dispatchEvent(new CustomEvent('websiteDataUpdated', { 
    detail: { section, data } 
  }))
}

export const getWebsiteData = (section) => {
  // Try to load from localStorage first
  const savedData = localStorage.getItem('websiteData')
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)
      return parsedData[section] || websiteData[section]
    } catch (error) {
      console.error('Error parsing saved data:', error)
    }
  }
  
  return websiteData[section]
}

// Initialize data from localStorage on load
const initializeData = () => {
  const savedData = localStorage.getItem('websiteData')
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)
      Object.assign(websiteData, parsedData)
    } catch (error) {
      console.error('Error initializing data:', error)
    }
  }
}

// Initialize on module load
initializeData()
