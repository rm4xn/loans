import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Contacts from './pages/Contacts.jsx'
import Loan from './pages/Loan.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
        <Route path="/loans/:id" element={<Loan />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
