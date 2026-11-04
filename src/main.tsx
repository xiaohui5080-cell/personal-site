import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'
import './styles/layout.css'
import './styles/home.css'
import './styles/article.css'
import './styles/prose.css'
import './styles/pages.css'

const Router = import.meta.env.PROD ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
