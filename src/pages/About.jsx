import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getWebsiteData } from '../data/websiteData'

const About = () => {
  const [team, setTeam] = useState([])

  useEffect(() => {
    // Load team data from centralized store
    const teamData = getWebsiteData('team')
    if (teamData) {
      setTeam(teamData)
    }
  }, [])

  useEffect(() => {
    // Listen for data updates
    const handleDataUpdate = () => {
      const teamData = getWebsiteData('team')
      if (teamData) {
        setTeam(teamData)
      }
    }

    window.addEventListener('websiteDataUpdated', handleDataUpdate)
    return () => window.removeEventListener('websiteDataUpdated', handleDataUpdate)
  }, [])

  const values = [
    {
      title: 'Integrity',
      description: 'We operate with complete transparency and honesty in all our client relationships.',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Excellence',
      description: 'We deliver the highest quality service and expertise to every client.',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Client Focus',
      description: 'Your success is our priority. We tailor solutions to meet your unique needs.',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Innovation',
      description: 'We leverage modern technology and forward-thinking strategies for better results.',
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ]

  const timeline = [
    {
      year: '2008',
      title: 'Founded',
      description: 'AC Firm established with a mission to provide expert financial services to small businesses.'
    },
    {
      year: '2012',
      title: 'Expansion',
      description: 'Grew our team and expanded services to include comprehensive business consulting.'
    },
    {
      year: '2018',
      title: 'Technology Integration',
      description: 'Implemented advanced financial software and cloud-based solutions for better client service.'
    },
    {
      year: '2024',
      title: 'Milestone',
      description: 'Celebrated serving 500+ clients and helping businesses save over $10M in taxes.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Teem Consulting
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              For over 15 years, we've been the trusted financial partner for businesses 
              seeking growth, compliance, and financial clarity.
            </p>
            <Link to="/contact" className="btn-primary">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2008, AC Firm began with a simple mission: to provide expert 
                  financial guidance to small and medium-sized businesses that couldn't afford 
                  in-house CFO services.
                </p>
                <p>
                  Over the years, we've grown from a small consulting practice to a comprehensive 
                  financial services firm, but our core values remain unchanged. We believe in 
                  building long-term relationships with our clients and helping them achieve their 
                  business goals through smart financial strategies.
                </p>
                <p>
                  Today, we're proud to serve over 500 clients across various industries, 
                  helping them navigate complex financial challenges and seize opportunities for growth.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  To empower businesses with expert financial guidance and innovative solutions 
                  that drive growth, ensure compliance, and create lasting value.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  To be the most trusted financial partner for businesses seeking to achieve 
                  sustainable growth and financial excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 rounded-lg p-4 inline-flex mb-4">
                  <div className="text-primary-600">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones that shaped our growth and commitment to excellence.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="text-primary-600 font-semibold mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your financial success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={member.id || index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="mb-4">
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary-100"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                      <svg className="h-12 w-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-primary-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 mb-4 text-sm">{member.bio}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With Our Expert Team?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover how our experienced professionals can help your business achieve 
            financial success and sustainable growth.
          </p>
          <Link to="/contact" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About
