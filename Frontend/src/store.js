import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '/src/cartSlice.js'
const store=configureStore({
  
     reducer:{
        cart:cartReducer
     }
     
}

);
export default store;