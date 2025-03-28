/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';


const apiUrl = import.meta.env.VITE_API_URL;


export const getCategory = async()=>{
    return (await axios.get(`${apiUrl}/Category`)).data
}
export const getCategoryPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/Category/GetCategoryPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/Category/GetCategoryPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}

export const getCategoryByID = async(id : string)=>{
    return await axios.get(`${apiUrl}/Category/${id}`)
    
}

export const createCategory = async(data:any)=>{
    return await axios.post(`${apiUrl}/Category/CreateCategory`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const editCategory = async(data:any)=>{
    return await axios.put(`${apiUrl}/Category/EditCategory`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
}

export const deleteCategory = async(id : string)=>{
    return (await axios.delete(`${apiUrl}/Category?${id}`)).data
    
}