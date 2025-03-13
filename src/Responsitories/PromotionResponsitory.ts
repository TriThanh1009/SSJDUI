/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;


export const getPromotion = async()=>{
    const response = await axios.get(`${apiUrl}/Promotion`)
    return response.data
}

export const getPromotionByID = async(id : string)=>{
    const response = await axios.get(`${apiUrl}/Promotion/${id}`)
    return response.data
}

export const createPromotion = async(data:any)=>{
    const response = await axios.post(`${apiUrl}/Promotion/CreatePromotion`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const editPromotion = async(data:any)=>{
    const response = await axios.put(`${apiUrl}/Promotion/EditPromotion`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const deletePromotion = async(id : string)=>{
    const response = await axios.delete(`${apiUrl}/Promotion?${id}`)
    return response.data
}