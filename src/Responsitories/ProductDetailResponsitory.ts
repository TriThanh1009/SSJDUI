/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';


const apiUrl = import.meta.env.VITE_API_URL;


export const getProductDetail = async()=>{
    return (await axios.get(`${apiUrl}/ProductDetail`)).data
    
}
export const getProductDetailPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/ProductDetail/GetProductDetailPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/ProductDetail/GetProductDetailPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}

export const getProductDetailByID = async(id? : string)=>{
    return (await axios.get(`${apiUrl}/ProductDetail/${id}`)).data
    
}

export const getdescriptionByproductID = async(id? : string)=>{
    const response = await axios.get(`${apiUrl}/ProductDetail/GetDescriptionByProductID?id=${id}`)
    return response.data
    
}


export const createProductDetail = async(data:any)=>{
    console.log(data)
    return await axios.post(`${apiUrl}/ProductDetail/CreateProductDetail`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const editProductDetail = async(data:any)=>{
    return await axios.put(`${apiUrl}/ProductDetail/EditProductDetail`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const deleteProductDetail = async(id : string)=>{
    return (await axios.delete(`${apiUrl}/ProductDetail?${id}`)).data
    
}