import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSuggestions } from './cartSlice';

const AproriSuggestions = () => {
    //const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cartItems = useSelector((state) => state.cart.items);  
    const suggestions=useSelector((state)=>state.cart.suggestions)
    const navigate=useNavigate();
    const dispatch=useDispatch();
     const handleClick=(product)=>{
    //    const encodedProduct = encodeURIComponent(product); 
        const image=`/Images/${product}.jpg`
        navigate(`/product/${product}`,{state:{path:image}});
     }
    useEffect(() => {
        const callPro = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("Sending cart items:", cartItems); 
                const response = await axios.post('http://127.0.0.1:8000/rules', {
                    products: cartItems
                });
                
                console.log("Response from API:", response.data); 
                dispatch(setSuggestions(response.data.results))
            } catch (error) {
                console.error("Error fetching suggestions:", error.message);
                setError("Failed to fetch suggestions. Please try again.");
            } finally {
                setLoading(false);
            }
        };

       
        if (cartItems.length > 0) {
            callPro();
        }
    }, [cartItems]);  

    return (
        suggestions.length >0 ?(
        <div className="w-80 fixed left-0 top-0 h-full bg-white shadow-lg border-l border-gray-200 p-6 overflow-y-auto">
       
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">PEOPLE ALSO BUY</h2>
            </div>
            
            <ul className="space-y-4">
            {suggestions.map((product, index) => {
    const imagePath = `/Images/${product}.jpg`;
    return (
      <li key={index} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center" onClick={()=>handleClick(product)}>
        <img src={imagePath} alt={product} className="w-12 h-12 rounded object-cover" />
        <div className="flex-1" >
        <p className="text-gray-700 font-medium cursor-pointer">{product}</p>
        </div>
        </div>
      </li>
    );
  })}



            </ul>

           
            <div className="border-t border-gray-300 mt-6 pt-4">
                <div className="flex justify-between items-center">
                  
                </div>
               
            </div>
        </div>
        ): <></>
    );
}

export default AproriSuggestions;

