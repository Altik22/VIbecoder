import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import CopilotPage from './pages/CopilotPage'
import LoginPage from './pages/LoginPage'
import ParticleField from './components/ParticleField'

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <ParticleField />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/copilot" element={<CopilotPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
