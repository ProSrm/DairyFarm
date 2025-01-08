import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/AllProduct.css";
import { Button } from 'react-bootstrap';

interface Product {
    id: number;
    name: string;
    imgUrl: string;
}

const AllProducts: React.FC = () => {
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

    const gotoProductList = () => {
        navigate('/productList');
    };

    return (
        <div className="mainAllProduct">
            <h2 className="text-center my-6">All Products</h2>
            <section className="Products" id="products">
                <div className="AllProduct">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="cursor-pointer product-card"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img
                                src={product.imgUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h2 className="ProductName">{product.name}</h2>
                        </div>
                    ))}
                </div>
            </section>
            <Button variant="primary" onClick={gotoProductList} className="add-button">
                Add+
            </Button>
        </div>
    );
};

export default AllProducts;