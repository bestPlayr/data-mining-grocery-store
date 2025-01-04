import React from 'react';
import store from './store';
import { useDispatch, useSelector } from 'react-redux';
import { checkOut } from './cartSlice';
const Cart = () => {
   const cartItems=useSelector((state)=>state.cart.items)
   const dispatch=useDispatch();
   const handleCheckOut=()=>{
        dispatch(checkOut());
        console.log(store.getState().cart.items)
   }
  return (
    <div className="w-80 fixed right-0 top-0 h-full bg-white shadow-lg border-l border-gray-200 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
      </div>
      <ul className="space-y-4">
  {cartItems.map((product, index) => {
    const imagePath = `/Images/${product}.jpg`;
    return (
      <li key={index} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
        <img src={imagePath} alt={product} className="w-12 h-12 rounded object-cover" />
        <div className="flex-1">
          <p className="text-gray-700 font-medium">{product}</p>
        </div>
      </li>
    );
  })}
</ul>

      <div className="border-t border-gray-300 mt-6 pt-4">
        <div className="flex justify-between items-center">
    
        </div>
        <button onClick={handleCheckOut}className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
