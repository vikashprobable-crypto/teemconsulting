import { useState } from 'react'

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([
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
  ])

  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' })
  const [editingId, setEditingId] = useState(null)

  const handleAdd = () => {
    if (newFAQ.question && newFAQ.answer) {
      setFaqs([...faqs, { id: Date.now(), ...newFAQ }])
      setNewFAQ({ question: '', answer: '' })
    }
  }

  const handleUpdate = (id, field, value) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, [field]: value } : faq
    ))
  }

  const handleDelete = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id))
  }

  const startEdit = (id) => {
    setEditingId(editingId === id ? null : id)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
        <p className="text-gray-600 mt-1">Manage frequently asked questions</p>
      </div>

      {/* Add New FAQ */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New FAQ</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Question"
            value={newFAQ.question}
            onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
          />
          <textarea
            placeholder="Answer"
            value={newFAQ.answer}
            onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="btn-primary"
          >
            Add FAQ
          </button>
        </div>
      </div>

      {/* Existing FAQs */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                {editingId === faq.id ? (
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleUpdate(faq.id, 'question', e.target.value)}
                    className="w-full text-lg font-semibold text-gray-900 bg-transparent border-b border-gray-300 focus:border-primary-500 focus:outline-none mb-3"
                  />
                ) : (
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                )}
                
                {editingId === faq.id ? (
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleUpdate(faq.id, 'answer', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-600">{faq.answer}</p>
                )}
              </div>
              
              <div className="flex space-x-2 ml-4">
                {editingId === faq.id ? (
                  <button
                    onClick={() => startEdit(null)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(faq.id)}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQManagement
