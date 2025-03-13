/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'


const apiUrl = import.meta.env.VITE_API_URL;


export const getBrand = async()=>{
    const response = await axios.get(`${apiUrl}/Brand`)
    return response.data
}

export const getBrandByID = async(id : string)=>{
    const response = await axios.get(`${apiUrl}/Brand/${id}`)
    return response.data
}

export const createBrandy = async(data:any)=>{
    const response = await axios.post(`${apiUrl}/Brand/CreateBrand`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const editBrand = async(data:any)=>{
    const response = await axios.put(`${apiUrl}/Brand/EditBrand`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const deleteBrand = async(id : string)=>{
    const response = await axios.delete(`${apiUrl}/Brand?${id}`)
    return response.data
}