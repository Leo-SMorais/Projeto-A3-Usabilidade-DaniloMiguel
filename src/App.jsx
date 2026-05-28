import { Routes, Route } from 'react-router-dom'
import Hub from './pages/Hub.jsx'
import P5R from './pages/P5R.jsx'
import P3R from './pages/P3R.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route path="/p5r" element={<P5R />} />
      <Route path="/p3r" element={<P3R />} />
    </Routes>
  )
}
