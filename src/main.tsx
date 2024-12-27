import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Dashboard from './componant/Dashboard/Dashboard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Dashboard />
  </StrictMode>,
)
