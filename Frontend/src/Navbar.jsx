import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate=useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleClick=()=>{
    
       navigate('/')
             
  }

  return (
    <nav className="bg-blue-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        
        <button className="text-white font-bold text-xl">
        GroceryStore<span>&#174;</span>
        </button>

        
        <div className="hidden md:flex space-x-6">
          <button onClick={handleClick}className="text-white hover:text-green-300">Home</button>
          <button className="text-white hover:text-green-300">Products</button>
          <button className="text-white hover:text-green-300">Deals</button>
          <button className="text-white hover:text-green-300">Contact</button>
        </div>

        <a href="#" className="text-white relative">
          
        </a>
     
        <button 
          className="md:hidden text-white ml-4" 
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <a href="#" className="block text-white hover:text-green-300">Home</a>
          <a href="#" className="block text-white hover:text-green-300">Products</a>
          <a href="#" className="block text-white hover:text-green-300">Deals</a>
          <a href="#" className="block text-white hover:text-green-300">Contact</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
