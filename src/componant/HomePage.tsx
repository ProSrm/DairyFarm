import React from 'react';
import { NavBar } from './NavBar';
import "../css/HomePage.css";
import Slideshow from './Slideshow';
import shelter from '../assets/Img/shelter.jpg';
import villageHome from '../assets/Img/villageHome.jpg';

const HomePage: React.FC = () => {
  const images = [shelter, villageHome];

  return (
    <div className="HomePageContainer">
      <NavBar />
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Welcome to Our Home Page</h1>
      <Slideshow images={images} />
    </div>
  );
};

export default HomePage;
