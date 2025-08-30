import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import LandingPage from './pages/landing';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Router>
        <Routes>
          {/* Make sure the name matches */}
          <Route path="/land" element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
