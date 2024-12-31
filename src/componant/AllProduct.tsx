import milk from '../assets/ProductImg/milk.jpg';
import curd from '../assets/ProductImg/curd.jpg';
import butter from '../assets/ProductImg/butter.webp';
import paneer from '../assets/ProductImg/paneer.webp';
import cheese from '../assets/ProductImg/cheese.jpg'
import { useNavigate } from 'react-router-dom';
import "../css/Product.css"
const AllProducts: React.FC = () => {

    const products = [
        { id: 1, name: "Milk", image: milk },
        { id: 2, name: "Curd", image: curd },
        { id: 3, name: "Butter", image: butter },
        { id: 4, name: "Paneer", image: paneer },
        { id: 5, name: "cheese", image: cheese }
        
    ];
    const navigate = useNavigate();
    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    }
    return (
        <div>
            <h2 className="text-center my-6">All Products</h2>
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
export default AllProducts;