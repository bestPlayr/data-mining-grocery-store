import { useEffect, useState } from "react";
import Product from "./Product"; 
import { products } from '../data'; 
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import store from "./store";
import AproriSuggestions from "./AproriSuggestions";
import Navbar from "./Navbar";

function Home() {
  const [images, setImages] = useState([]);
  const cartItems=useSelector((state)=>state.cart.items)
  useEffect(() => {
   
    const loadedImages = products.map((product) => {
   
      const encodedProduct = encodeURIComponent(product); 
     
      const imagePath = `/Images/${encodedProduct}.jpg`; 
      return {
        name: product,
        src: imagePath,
      };
    });
    
    
    setImages(loadedImages);
  }, []);

  return (
    <>
    <Navbar> </Navbar>
    <div className="container mx-auto p-4">
   
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {images.map((img, index) => (
        <Product key={index} name={img.name} image={img.src} />
      ))}
    </div>
    {cartItems.length>0 ?
    <Cart></Cart>
     :
     <div></div>
}
  <AproriSuggestions></AproriSuggestions>
  </div>
  </>
  );
}

export default Home;
