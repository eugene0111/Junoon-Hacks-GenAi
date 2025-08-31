import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import LandingPage from './pages/landing';
import ArtisanPage from './pages/artisan';
import AmbassadorPage from './pages/ambassador';


import ScrollToTop from './components/scrolltotop';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Make sure the name matches */}
          <Route path="/land" element={<LandingPage />} />
          <Route path="/artisan" element={<ArtisanPage />} />
          <Route path="/ambassador" element={<AmbassadorPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
