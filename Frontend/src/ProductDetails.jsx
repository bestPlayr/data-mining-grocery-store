import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SimilarProducts from './SimilarProducts';
import Cart from './Cart';
import store from './store';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './cartSlice';
import AproriSuggestions from './AproriSuggestions';
import Navbar from './Navbar';
const ProductDetails = () => {
    const { name } = useParams();
    const location = useLocation();
    const { path} = location.state || {}; 
    const decodedName = decodeURIComponent(name);
    const cartItems=useSelector((state)=>state.cart.items)
    const dispatch=useDispatch();
    const handleAddToCart = () => {
        console.log(`${name} has been added to the cart!`);
        dispatch(addItem(name))
     
      };
    return (
        <>
        <Navbar></Navbar>
        <div className="flex gap-8 p-8 max-w-4xl mx-auto">
        
            <div className="flex-1">
                <img src={path} alt={decodedName} className="w-full" /> 
            </div>

      
            <div className="flex-2">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{decodedName}</h1>

              
                <p className="text-green-700 font-medium mb-6">In Stock</p>
                
              
                <button onClick={handleAddToCart} className="bg-red-500 text-white font-bold py-2 px-6 rounded hover:bg-red-600 transition duration-300 mb-8">
                    Add to Cart
                </button>

           
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                    
                        <div className="w-6 h-6 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7zm2 0v3h16V7H4zm0 7v3h16v-3H4z" />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium">Cash and Online Payments<br /><span className="text-gray-500 text-sm">Pay COD or online, hassle-free!</span></p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M4 4h13v10h5l-1 5H5v-3H3v-9a1 1 0 011-1zm15 3l1.5 3H17V7h2zM4 6v8h13V6H4zm1 10h3v1h10l.6-3H5v2zm10-8h1v2h-1V8zm-6 8h2v1H9v-1zm-3 0h1v1H6v-1z" />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium">Delivery ETA<br /><span className="text-gray-500 text-sm">Our ETA is 1 day(s)</span></p>
                    </div>

                    <div className="flex items-center gap-3">
                       
                        <div className="w-6 h-6 text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2a10 10 0 00-10 10c0 4.99 3.663 9 9 9h2v-2h-2c-3.858 0-6-2.688-6-7a8 8 0 0116 0c0 4.312-2.074 7-6 7h-1v2h1c5.463 0 8-4.027 8-9A10 10 0 0012 2zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm1 5h-2v6h2v-6z" />
                            </svg>
                        </div>
                        <p className="text-gray-700 font-medium">Customer Support<br /><span className="text-gray-500 text-sm">Contact us by email or phone</span></p>
                    </div>
                </div>
            </div>
        </div>
        <AproriSuggestions></AproriSuggestions>
        { cartItems.length > 0 ?
           <Cart></Cart>
           :
           <div>
            
           </div>
        
}
            <SimilarProducts name={decodedName} />
        </>
    );
};

export default ProductDetails;
