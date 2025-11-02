import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../products/slice_product/ProdSlice"
import cartReducer from "../../cart/slice_cart/CartSlice";

const store=configureStore({
    reducer:{
        products:productReducer,
    cart: cartReducer
 }

})

export default store;