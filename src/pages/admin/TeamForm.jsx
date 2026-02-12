import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getWebsiteData, updateWebsiteData } from '../../data/websiteData'
import { assetManager } from '../../utils/assetManager'

const TeamForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    expertise: [''],
    photo: ''
  })

  useEffect(() => {
    if (isEditing) {
      // Load team member data from centralized store
      const teamData = getWebsiteData('team')
      if (teamData) {
        const member = teamData.find(m => m.id === parseInt(id))
        if (member) {
          setFormData({
            name: member.name,
            role: member.role,
            bio: member.bio,
            expertise: member.expertise.length > 0 ? member.expertise : [''],
            photo: member.photo || ''
          })
        }
      }
    }
  }, [isEditing, id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const result = await assetManager.saveAsset(file, 'team')
        setFormData(prev => ({
          ...prev,
          photo: result.data
        }))
      } catch (error) {
        alert(`Photo upload failed: ${error.message}`)
      }
    }
  }

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo: ''
    }))
  }

  const handleExpertiseChange = (index, value) => {
    const newExpertise = [...formData.expertise]
    newExpertise[index] = value
    setFormData(prev => ({
      ...prev,
      expertise: newExpertise
    }))
  }

  const addExpertise = () => {
    setFormData(prev => ({
      ...prev,
      expertise: [...prev.expertise, '']
    }))
  }

  const removeExpertise = (index) => {
    const newExpertise = formData.expertise.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      expertise: newExpertise.length > 0 ? newExpertise : ['']
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Filter out empty strings
    const cleanedData = {
      ...formData,
      expertise: formData.expertise.filter(skill => skill.trim() !== '')
    }

    // Get current team data
    const currentTeam = getWebsiteData('team') || []
    
    let updatedTeam
    if (isEditing) {
      // Update existing member
      updatedTeam = currentTeam.map(member => 
        member.id === parseInt(id) 
          ? { ...cleanedData, id: parseInt(id) }
          : member
      )
    } else {
      // Add new member
      const newId = Math.max(...currentTeam.map(m => m.id), 0) + 1
      updatedTeam = [...currentTeam, { ...cleanedData, id: newId }]
    }

    // Update centralized data store
    updateWebsiteData('team', updatedTeam)
    
    // Navigate back to team list
    navigate('/admin/team')
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Team Member' : 'Add New Team Member'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isEditing ? 'Update team member information' : 'Add a new team member to your organization'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                placeholder="e.g., John Anderson"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                placeholder="e.g., Founder & CEO"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Biography *
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                placeholder="Brief professional biography..."
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo
              </label>
              <div className="space-y-4">
                {formData.photo ? (
                  <div className="relative">
                    <img 
                      src={formData.photo} 
                      alt="Profile preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary-100"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Photo
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or GIF (Max 5MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas of Expertise
              </label>
              <div className="space-y-2">
                {formData.expertise.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleExpertiseChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                      placeholder="e.g., Tax Planning"
                    />
                    {formData.expertise.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExpertise(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addExpertise}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  + Add Expertise
                </button>
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  {formData.photo ? (
                    <img 
                      src={formData.photo} 
                      alt="Profile preview"
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {formData.name || 'Name'}
                    </h4>
                    <p className="text-primary-600 text-sm">
                      {formData.role || 'Role'}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {formData.bio || 'Biography will appear here...'}
                </p>
                {formData.expertise.filter(skill => skill.trim() !== '').length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {formData.expertise
                      .filter(skill => skill.trim() !== '')
                      .map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate('/admin/team')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            {isEditing ? 'Update Team Member' : 'Add Team Member'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TeamForm
