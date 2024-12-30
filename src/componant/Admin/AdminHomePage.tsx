import React from 'react';
import '../../css/HomePage.css'
import Slideshow from '../Slideshow';
import shelter from '../../assets/Img/shelter.jpg';
import villageHome from '../../assets/Img/villageHome.jpg';
import milk from '../../assets/ProductImg/milk.jpg';
import curd from '../../assets/ProductImg/curd.jpg';
import butter from '../../assets/ProductImg/butter.webp';
import { NavBar } from '../NavBar';

import { useNavigate } from 'react-router-dom';
const AdminHomePage: React.FC = () => {
    const images = [shelter, villageHome];
    const products = [
        { id: 1, name: "Milk", image: milk },
        { id: 2, name: "Curd", image: curd },
        { id: 3, name: "Butter", image: butter },
    ];
    const navigate = useNavigate();
    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };
    return (
        <div className="HomePageContainer">
            <NavBar></NavBar>
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Welcome to Our Admin Page</h1>
            <Slideshow images={images} />
            <h2 className="text-center my-6">Our Products</h2>
            <section className='Products' id="products">
                <div className='AllProduct'>
                    {/* Replace the below list with actual product content */}
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h2 className='ProductName' >{product.name}</h2>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminHomePage;
