/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'


const apiUrl = import.meta.env.VITE_API_URL;


export const getProductDetail = async()=>{
    const response = await axios.get(`${apiUrl}/ProductDetail`)
    console.log(response.data)
    return response.data
}

export const getProductDetailByID = async(id? : string)=>{
    const response = await axios.get(`${apiUrl}/ProductDetail/${id}`)
    return response.data
}

export const getdescriptionByproductID = async(id? : string)=>{
    const response = await axios.get(`${apiUrl}/ProductDetail/GetDescriptionByProductID?id=${id}`)
    return response.data
}


export const createProductDetail = async(data:any)=>{
    console.log(data)
    const response = await axios.post(`${apiUrl}/ProductDetail/CreateProductDetail`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const editProductDetail = async(data:any)=>{
    const response = await axios.put(`${apiUrl}/ProductDetail/EditProductDetail`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const deleteProductDetail = async(id : string)=>{
    const response = await axios.delete(`${apiUrl}/ProductDetail?${id}`)
    return response.data
}