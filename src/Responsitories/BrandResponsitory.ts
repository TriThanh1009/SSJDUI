/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';


const apiUrl = import.meta.env.VITE_API_URL;


export const getBrand = async()=>{
    return (await axios.get(`${apiUrl}/Brand`)).data
}
export const getBrandPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/Brand/GetBrandPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/Brand/GetBrandPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}
export const getBrandByID = async(id : string)=>{
    return (await axios.get(`${apiUrl}/Brand/${id}`)).data
}

export const createBrand = async(data:any)=>{
    return await axios.post(`${apiUrl}/Brand/CreateBrand`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
}

export const editBrand = async(data:any)=>{
    return await axios.put(`${apiUrl}/Brand/EditBrand`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
}

export const deleteBrand = async(id : string)=>{
    return (await axios.delete(`${apiUrl}/Brand?${id}`)).data
}