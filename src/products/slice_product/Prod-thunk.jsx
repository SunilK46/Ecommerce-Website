import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api_config/AxiosInstance";



export const fetchProducts=createAsyncThunk("products/fetchProducts",
    async()=>{
        const response=await api.get('/products')  
        return response.data 

    }
)

export const addProducts=createAsyncThunk("products/addProducts",
    async(input)=>{
        const response=await api.post('/products',input)  
        return response.data      

    })

export const viewProducts=createAsyncThunk("products/viewProducts",
    async(id)=>{
        const response=await api.get(`/products/${id}`)
        return response.data
    }
)

export const editProducts=createAsyncThunk("products/editProducts",
    async(product)=>{
        const response=await api.put(`products/${product.id}`,product)
        return response.data
    }
)


export const deleteProducts=createAsyncThunk("products/deleteProducts",
    async(id)=>{
        const response=await api.delete(`/products/${id}`)
        return response.data
    }
)