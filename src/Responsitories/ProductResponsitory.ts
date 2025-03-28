/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';

const apiUrl = import.meta.env.VITE_API_URL;


export const getProduct = async()=>{
    return (await axios.get(`${apiUrl}/Product`)).data
    
}
export const getProductPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/Product/GetProductPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/Product/GetProductPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}

export const getProductByID = async(id? : string)=>{
    return (await axios.get(`${apiUrl}/Product/GetProductByID?id=${id}`)).data
    
}

export const createProduct = async(data:any)=>{
    console.log(data)
    return await axios.post(`${apiUrl}/Product/CreateProduct`,data,{
        headers:{
            "Content-Type" : "multipart/form-data",
            "Accept": "application/json"
        }})
    
}

export const editProduct = async(data:any)=>{
    return await axios.put(`${apiUrl}/Product/EditProduct`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const deleteProduct = async(id : string)=>{
    return (await axios.delete(`${apiUrl}/Product?id=${id}`)).data
    
}