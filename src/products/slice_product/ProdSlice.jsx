import { createSlice } from "@reduxjs/toolkit";
import { addProducts, fetchProducts, viewProducts , editProducts, deleteProducts} from "./prod-thunk";


const productSlice=createSlice({
    name:"products",
    initialState:{products:[],product:{},loading:false,error:null},
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
            state.products=[];
        }),
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
            state.product ={};
            
        }),
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false;
            state.products=[];
            state.error=action.error.message;
        }),

        builder.addCase(addProducts.pending,(state)=>{
            state.loading=true
        }),
        builder.addCase(addProducts.fulfilled,(state,action)=>{
            state.loading=false,
            state.products.push(action.payload)
        }),
        builder.addCase(addProducts.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        }),

        builder.addCase(viewProducts.pending,(state)=>{
            state.loading=true
            state.product={}
        }),
        builder.addCase(viewProducts.fulfilled,(state,action)=>
        {   
            state.loading=false
            state.product=action.payload
        }),
        builder.addCase(viewProducts.rejected,(state,action)=>{
            state.loading=false
            state.product={}
            state.error=action.error.message
        }),
        builder.addCase(editProducts.pending,(state)=>{
            state.loading=true            
        }),
        builder.addCase(editProducts.fulfilled,(state,action)=>
        {   
            state.loading=false
            state.product=action.payload
        }),
        builder.addCase(editProducts.rejected,(state,action)=>{
            state.loading=false
            state.product={}
            state.error=action.error.message
        }),
        builder.addCase(deleteProducts.pending,(state)=>{
            state.loading=true
            state.product={}
        }),
        builder.addCase(deleteProducts.fulfilled,(state,action)=>
        {   
            state.loading=false
            state.product=action.payload
        }),
        builder.addCase(deleteProducts.rejected,(state,action)=>{
            state.loading=false
            state.product={}
            state.error=action.error.message

        
    })
}
})


  

export default productSlice.reducer