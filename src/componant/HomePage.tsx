import React from 'react'
import { UserData } from './App';

interface HomePageProps {
    userData: UserData | null;
  }
const HomePage: React.FC<HomePageProps> = ({ userData }) => {
    if (!userData) {
      return <div>Please log in first</div>;
    }
  return (
    <div>Welcome  <pre/>   
        {userData.email}
    </div>
  )
}

export default HomePage