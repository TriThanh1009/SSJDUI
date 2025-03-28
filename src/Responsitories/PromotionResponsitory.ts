/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';

const apiUrl = import.meta.env.VITE_API_URL;


export const getPromotion = async()=>{
    return (await axios.get(`${apiUrl}/Promotion`)).data
    
}
export const getPromotionPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/Promotion/GetPromotionPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/Promotion/GetPromotionPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}

export const getPromotionByID = async(id : string)=>{
    return (await axios.get(`${apiUrl}/Promotion/${id}`)).data
    
}

export const createPromotion = async(data:any)=>{
    return await axios.post(`${apiUrl}/Promotion/CreatePromotion`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const editPromotion = async(data:any)=>{
    return await axios.put(`${apiUrl}/Promotion/EditPromotion`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const deletePromotion = async(id : string)=>{
    return (await axios.delete(`${apiUrl}/Promotion?${id}`)).data
    
}