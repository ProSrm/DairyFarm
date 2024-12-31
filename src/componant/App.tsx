import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AdminHomePage from './Admin/AdminHomePage';
import ProductDetails from './Product';
import AllProducts from './AllProduct';

export interface UserData {
  email: string;
  loginTime: string;
}
function App() {
  const [count, setCount] = useState(0)

  const [userData, setUserData] = useState<UserData | null>(null);

  const handleLoginSuccess = (email: string) => {
    setUserData({
      email,
      loginTime: new Date().toLocaleString()
    });
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/adminHome" element={<AdminHomePage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/allProduct" element={<AllProducts />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
