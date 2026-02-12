import { Link } from 'react-router-dom'

const Insights = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Tax Planning Strategies Every Small Business Should Know',
      excerpt: 'Discover essential tax planning strategies that can help your small business save thousands and stay compliant.',
      category: 'Tax Planning',
      date: 'December 15, 2024',
      readTime: '5 min read',
      image: 'tax-planning',
      author: 'John Anderson',
      featured: true
    },
    {
      id: 2,
      title: 'How to Choose the Right Accounting Software for Your Business',
      excerpt: 'A comprehensive guide to selecting the best accounting software that fits your business needs and budget.',
      category: 'Bookkeeping',
      date: 'December 10, 2024',
      readTime: '7 min read',
      image: 'accounting-software',
      author: 'Sarah Mitchell'
    },
    {
      id: 3,
      title: 'Cash Flow Management Tips for Growing Businesses',
      excerpt: 'Learn proven strategies to optimize your cash flow and ensure financial stability during business growth.',
      category: 'Financial Advisory',
      date: 'December 5, 2024',
      readTime: '6 min read',
      image: 'cash-flow',
      author: 'Emily Rodriguez'
    },
    {
      id: 4,
      title: 'Common Bookkeeping Mistakes and How to Avoid Them',
      excerpt: 'Identify and avoid the most common bookkeeping errors that can cost your business time and money.',
      category: 'Bookkeeping',
      date: 'November 28, 2024',
      readTime: '4 min read',
      image: 'bookkeeping-mistakes',
      author: 'Sarah Mitchell'
    },
    {
      id: 5,
      title: 'Business Growth Strategies for 2025',
      excerpt: 'Strategic insights and actionable tips to position your business for successful growth in the coming year.',
      category: 'Business Consulting',
      date: 'November 20, 2024',
      readTime: '8 min read',
      image: 'business-growth',
      author: 'John Anderson'
    },
    {
      id: 6,
      title: 'Understanding Financial Statements: A Business Owner\'s Guide',
      excerpt: 'Demystify financial statements and learn how to use them to make better business decisions.',
      category: 'Financial Advisory',
      date: 'November 15, 2024',
      readTime: '10 min read',
      image: 'financial-statements',
      author: 'David Kim'
    }
  ]

  const categories = [
    { name: 'All Topics', count: 24, active: true },
    { name: 'Tax Planning', count: 8 },
    { name: 'Bookkeeping', count: 6 },
    { name: 'Business Consulting', count: 5 },
    { name: 'Financial Advisory', count: 5 }
  ]

  const featuredPost = blogPosts.find(post => post.featured)

  const getCategoryColor = (category) => {
    const colors = {
      'Tax Planning': 'bg-blue-100 text-blue-800',
      'Bookkeeping': 'bg-green-100 text-green-800',
      'Business Consulting': 'bg-purple-100 text-purple-800',
      'Financial Advisory': 'bg-orange-100 text-orange-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Financial Insights & Expert Advice
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay informed with the latest financial tips, tax strategies, and business insights 
              from our team of experienced professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Subscribe to Newsletter
              </Link>
              <Link to="/services" className="btn-secondary">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding">
          <div className="container">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white rounded-lg p-6 inline-block">
                      <svg className="h-16 w-16 text-primary-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-primary-600 font-semibold">Featured Article</span>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredPost.category)}`}>
                      {featuredPost.category}
                    </span>
                    <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full w-10 h-10 mr-3"></div>
                      <div>
                        <div className="font-medium text-gray-900">{featuredPost.author}</div>
                        <div className="text-sm text-gray-500">{featuredPost.date}</div>
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary">
                    Read Full Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  category.active
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 rounded-t-xl flex items-center justify-center">
                  <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full w-8 h-8 mr-2"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.author}</div>
                        <div className="text-xs text-gray-500">{post.date}</div>
                      </div>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-600 text-white section-padding">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Financial Insights
            </h2>
            <p className="text-xl mb-8">
              Get our latest articles, tax tips, and business strategies delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 text-primary-100">
              Join 5,000+ business owners getting financial insights weekly
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Insights
