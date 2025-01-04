import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from './cartSlice';
import store from './store';

const Product = ({ name, image }) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleAddToCart = () => {
   
    console.log(`${name} has been added to the cart!`);
    dispatch(addItem(name))
    console.log(store.getState().cart.items)
  };
   const handleClick=()=>{
      
     navigate(`/product/${name}`,{state:{path:image}});


 }
  return (
    <div onClick={handleClick}className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg inline-block m-2">
     
      <div className="p-2">
        {image ? (
          <img src={image} alt={name} className="w-full h-48 object-cover" />
        ) : (
          <p className="text-center text-gray-500">No image available</p>
        )}
      </div>

    
      <div className="px-2 pb-2 text-center">
        <h3 className="text-sm font-semibold text-gray-800 uppercase">{name}</h3>
        <div className="flex justify-between items-center mt-2">
        </div>

        <button onClick={(e)=>{e.stopPropagation(); handleAddToCart();}} className="mt-2 w-full flex items-center justify-center py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">

          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;

