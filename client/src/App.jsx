import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Login from './pages/Login'
import Chat from './pages/Chat'
import './App.css'

function App() {
  const { user, loading } = useAuthStore()

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><h1 className="text-3xl font-bold">Loading...</h1></div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Chat /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={user ? <Chat /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App