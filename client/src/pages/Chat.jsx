import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState('light')
  const messagesEndRef = useRef(null)
  const { user, token, logout } = useAuthStore()
  const navigate = useNavigate()

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }
  useEffect(() => { scrollToBottom() }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/chat/message', { message: input }, { headers: { 'Authorization': `Bearer ${token}` } })
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.message }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'error', content: error.response?.data?.message || 'Error' }])
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
      <div className={`border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-purple-200 bg-white'} shadow-sm`}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div><h1 className="text-2xl font-bold gradient-text">Ohod</h1><p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Hi, {user?.name || 'User'}</p></div>
          <div className="flex gap-4"><button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>{theme === 'light' ? '🌙' : '☀️'}</button><button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg">Logout</button></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full"><div className="text-center"><h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Hello! 👋</h2><p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Start a conversation</p></div></div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`chat-message flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg ${msg.role === 'user' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : msg.role === 'error' ? 'bg-red-100 text-red-800' : theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white shadow-md'}`}>
                <p>{msg.content}</p>
              </div>
            </div>
          ))
        )}
        {loading && <div className="flex justify-start"><div className={`px-4 py-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}><div className="loading-dots"><span></span><span></span><span></span></div></div></div>}
        <div ref={messagesEndRef} />
      </div>

      <div className={`border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-purple-200 bg-white'} shadow-lg`}>
        <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto px-4 py-4 flex gap-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type message..." disabled={loading} className={`flex-1 px-4 py-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} />
          <button type="submit" disabled={loading} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat