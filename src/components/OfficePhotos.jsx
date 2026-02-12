import { useState } from 'react'

const OfficePhotos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'office', label: 'Office Space' },
    { id: 'team', label: 'Team & Culture' },
    { id: 'meeting', label: 'Meeting Rooms' },
    { id: 'reception', label: 'Reception' }
  ]

  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1497366214047-5125eab18dac?w=800&h=600&fit=crop',
      alt: 'Modern office reception area',
      category: 'reception',
      title: 'Reception Area',
      description: 'Welcome to our modern office space'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
      alt: 'Professional meeting room',
      category: 'meeting',
      title: 'Conference Room',
      description: 'State-of-the-art meeting facilities'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      alt: 'Open office workspace',
      category: 'office',
      title: 'Open Workspace',
      description: 'Collaborative work environment'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop',
      alt: 'Team collaboration',
      category: 'team',
      title: 'Team Collaboration',
      description: 'Our team working together'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1589994937826-3c9b9b5a5c0c?w=800&h=600&fit=crop',
      alt: 'Modern office interior',
      category: 'office',
      title: 'Office Interior',
      description: 'Modern and comfortable workspace'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      alt: 'Team meeting',
      category: 'meeting',
      title: 'Team Meeting',
      description: 'Collaborative team discussions'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      alt: 'Office lounge area',
      category: 'office',
      title: 'Lounge Area',
      description: 'Relaxation and break area'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1542744173-8207994643e5?w=800&h=600&fit=crop',
      alt: 'Team celebration',
      category: 'team',
      title: 'Team Celebration',
      description: 'Celebrating our achievements'
    }
  ]

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Office</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Take a virtual tour of our modern workspace and see where the magic happens
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="aspect-w-16 aspect-h-12 bg-gray-100">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-semibold text-lg">{photo.title}</p>
                <p className="text-sm text-gray-200">{photo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-primary-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Office Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">5,000+</div>
            <div className="text-gray-600">Square Feet</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
            <div className="text-gray-600">Workstations</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">6</div>
            <div className="text-gray-600">Meeting Rooms</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfficePhotos
