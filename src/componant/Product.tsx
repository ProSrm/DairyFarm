import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import milk from '../assets/ProductImg/milk.jpg';
import curd from '../assets/ProductImg/curd.jpg';
import butter from '../assets/ProductImg/butter.webp';
import paneer from '../assets/ProductImg/paneer.webp';
import cheese from '../assets/ProductImg/cheese.jpg';
import "../css/Product.css"

interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
}

const productsData: Product[] = [
    {
        id: 1,
        name: "Milk",
        description: "Milk is a nutrient-rich liquid produced by mammals, primarily as a source of nourishment for their young. It is widely consumed by humans as a dietary staple in various forms, including raw, pasteurized, and processed into products.",
        image: milk
    },
    {
        id: 2,
        name: "Curd",
        description: "Curd is a dairy product obtained by coagulating milk in a process called curdling. It's rich in probiotics and is a crucial part of many cuisines worldwide.",
        image: curd
    },
    {
        id: 3,
        name: "Butter",
        description: "Butter is a dairy product made from the fat and protein components of churned cream. It's commonly used as a spread and in cooking applications.",
        image: butter
    },
    {
        id: 4,
        name: "Paneer",
        description: "Paneer is a fresh, soft cheese widely used in South Asian cuisine, particularly in India. Known for its versatility, paneer is a staple ingredient in vegetarian dishes and is valued for its mild flavor, creamy texture, and high nutritional content.",
        image: paneer
    },
    {
        id: 5,
        name: "Cheese",
        description: "Cheese is a dairy product derived from milk, made by coagulating milk proteins (casein) and separating the solid curds from the liquid whey. It is a versatile ingredient enjoyed worldwide for its unique flavors, textures, and culinary applications.",
        image: cheese
    }
];

const ProductDetails: React.FC = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const foundProduct = productsData.find(p => p.id === Number(productId));
                
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError('Error loading product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

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
                    src={product.image}
                    alt={product.name}
                />
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <Button variant="primary" className="edit-button">Edit</Button>
                <Button variant="danger" className="delete-button">Delete</Button>
            </div>
        </div>
    );
};

export default ProductDetails;