import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

interface ProductFormData {
  name: string;
  price: string;
  description: string;
  image: File | null;
  
}

const ProductList: React.FC = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    image: null,
    
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    try {
      let imageUrl: string = '';
      if (formData?.image?.name) {
        const imageName = formData.image.name;
        const publicImagePath = `src/assets/ProductImg/${imageName}`;
        imageUrl = publicImagePath;
      }

      console.log(imageUrl)
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        ImgUrl: imageUrl,
      };
      console.log(productData)

      await axios.post('https://localhost:7173/api/product', productData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Product added successfully');
      navigate('/allProduct');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="mainAllProduct">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Product List</h1>

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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter Product Description"
                className="w-full p-2 border border-gray-300 rounded-md"
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
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              onClick={handleAddProduct}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;