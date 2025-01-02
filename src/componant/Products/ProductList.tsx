import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductFormData {
  name: string;
  price: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: ''
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('https://localhost:7173/api/product', {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const newProduct = {
        name: formData.name,
        price: parseFloat(formData.price)
      };

      await axios.post('https://localhost:7173/api/product', newProduct, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setFormData({
        name: '',
        price: ''
      });

      await fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Product List</h1>
      
      {/* Product List */}
      <div className="mb-8">
        <ul className="space-y-3">
          {products.map((product) => (
            <li 
              key={product.id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <span className="text-lg text-gray-700">{product.name}</span>
              <span className="font-semibold text-green-600">${product.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Product Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Product</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Product Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter Product Price"
              step="0.01"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleAddProduct}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;