import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import '../i18n'
import './index.css'
import App from './App.jsx'
import BaseLayout from './components/BaseLayout.jsx'
import Home from './pages/Home.jsx'
import Contacts from './pages/Contacts.jsx'
import Loan from './pages/Loan.jsx'
import Settings from './pages/Settings.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<BaseLayout />}>
          <Route path="/loans/:id" element={<Loan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)