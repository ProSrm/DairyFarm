import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import '../css/App.css'
import LoginPage from './LoginPage';
import HomePage from './HomePage';

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
        <Route path="/" element={<LoginPage  onLoginSuccess={handleLoginSuccess}/>} />
        <Route path="/home" element={<HomePage userData={userData}/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
