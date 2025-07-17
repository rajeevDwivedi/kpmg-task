import './App.css'
import Landing from './components/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Layout />} />
      </Routes>
    </Router>
  )
}

export default App
