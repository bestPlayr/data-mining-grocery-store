import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';
const SimilarProducts = ({ name }) => {

    const [similarProducts, setSimilarProducts] = useState([]);
 
    useEffect(() => {
        const fetchSimilarProducts = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/search', {
                    name: name,
                });
            const similarImages=response.data.results.map((product)=>{
                const encodedProduct = encodeURIComponent(product); 
              
                const imagePath = `/Images/${encodedProduct}.jpg`; 
                return {
                  name: product,
                  src: imagePath,
                };
              });     
              setSimilarProducts(similarImages);
            } catch (error) {
                console.error(error.response ? error.response.data : error.message); 
            }
        };

        
        if (name) {
            fetchSimilarProducts();
        }
    })

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Similar Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {similarProducts.map((img, index) => (
            <Product key={index} name={img.name} image={img.src} />
          ))}
        </div>
      </div>
      );
};

export default SimilarProducts;
