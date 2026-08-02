import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import axios from 'axios'

function Login() {
  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser, setToken } = useAuthStore()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const response = await axios.post(endpoint, formData)
      setToken(response.data.token)
      setUser(response.data.user)
      navigate('/chat')
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ في المحاولة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 p-4">
      <div className="glass-effect rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">✨</h1>
          <h1 className="text-4xl font-bold gradient-text mb-1">عهود</h1>
          <p className="text-gray-600 font-semibold">Ohod - مساعدك الذكي</p>
          <p className="text-sm text-gray-500 mt-2">منصة ذكاء اصطناعي متطورة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input
              type="text"
              name="name"
              placeholder="اسمك الكامل"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />

          {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 hover:scale-105 transform"
          >
            {loading ? '⏳ جاري المعالجة...' : mode === 'login' ? '🔓 دخول' : '✍️ تسجيل'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">أو</span></div>
        </div>

        <button
          type="button"
          onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
          className="w-full text-purple-600 font-semibold hover:bg-purple-50 p-3 rounded-lg transition-all"
        >
          {mode === 'login' ? '📝 ليس لديك حساب؟ انضم الآن' : '🔑 لديك حساب؟ دخول'}
        </button>

        <div className="mt-6 text-center text-xs text-gray-500 space-y-2">
          <p>🔒 بيانات آمنة وموثوقة</p>
          <p>⚡ معالجة فورية</p>
          <p>🤖 دعم ذكاء اصطناعي متقدم</p>
        </div>
      </div>
    </div>
  )
}

export default Login