import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name: 'cart',
   initialState: {
       items: [],        // Cart items
       suggestions: [],  // Suggestions for Apriori
   },
   reducers: {
       addItem: (state, action) => {
           state.items.push(action.payload); // Add an item to the cart
       },
       checkOut: (state) => {
           state.items = []; // Clear cart items
           state.suggestions=[]
       },
       setSuggestions: (state, action) => {
           state.suggestions = action.payload; // Set suggestions array
       },
   },
});

export const { addItem, checkOut, setSuggestions } = cartSlice.actions;
export default cartSlice.reducer;
