import '../../css/HomePage.css'
import Slideshow from '../Slideshow';
import shelter from '../../assets/Img/shelter.jpg';
import villageHome from '../../assets/Img/villageHome.jpg';
import { NavBar } from '../NavBar';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
interface Product {
    id: number;
    name: string;
    imgUrl: string;
}
const AdminHomePage: React.FC = () => {
    const images = [shelter, villageHome];
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get<Product[]>('https://localhost:7173/api/product');
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);
    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };
    const navigateAllproduct = () => {
        navigate('/allProduct')
    };
    return (
        <div className="HomePageContainer">
            <NavBar></NavBar>
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Welcome to Our Admin Page</h1>
            <Slideshow images={images} />
            <h2 className="text-center my-6">Our Products</h2>
            <section className='Products' id="products">
                <div className='AllProduct1'>
                    {/* Replace the below list with actual product content */}
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img
                                src={product.imgUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h2 className='ProductName' >{product.name}</h2>
                        </div>
                    ))}
                </div>
            </section>

            <Button variant="primary" className="seeAllProduct-button" onClick={() => navigateAllproduct()}>See All Product</Button>
           
            
        </div>

    );
};

export default AdminHomePage;
