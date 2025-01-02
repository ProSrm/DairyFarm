import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Dashboard from './componant/Dashboard/Dashboard.tsx'
import ShipmentStatistics from './componant/Dashboard/Chart.tsx'
import App from './componant/App.tsx'
import ProductList from './componant/Products/ProductList.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <ProductList /> */}
    {/* <Dashboard /> */}
    {/* <ShipmentStatistics/> */}
  </StrictMode>,
)
