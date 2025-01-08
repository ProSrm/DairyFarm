import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import axios from 'axios';
import "../css/Product.css"


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
}

const ProductDetails: React.FC = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                
                const response = await axios.get<Product>(`https://localhost:7173/api/product/${productId}`);
                setProduct(response.data);
            } catch (err) {
                setError('Error loading product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);
    const navigate = useNavigate();
    const deleteProduct = async (id: number) => {
        try {
            await axios.delete(`https://localhost:7173/api/product/${id}`);
            alert('Product deleted successfully');
            navigate('/allProduct');
        } catch (err) {
            setError('Error deleting product');
            console.error('Error deleting product:', err);
        }
    };
    if (loading) {
        return <div className="text-center p-6">Loading...</div>;
    }

    if (error || !product) {
        return <div className="text-center p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="ProductDetails">
            <div className="image-container">
                <img
                    src={`/${product.imgUrl}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"                    
                />
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price">Price: ${product.price}</p>
                <Button variant="primary" className="edit-button">Edit</Button>
                <Button variant="danger" className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</Button>
            </div>
        </div>
    );
};

export default ProductDetails;

