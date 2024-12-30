import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Dashboard from './componant/Dashboard/Dashboard.tsx'
import App from './componant/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <Dashboard /> */}
  </StrictMode>,
)
