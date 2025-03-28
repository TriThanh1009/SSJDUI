/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';

const apiUrl = import.meta.env.VITE_API_URL;


export const getUser = async()=>{
    return (await axios.get(`${apiUrl}/User`)).data
    
}
export const getUserPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/User/GetUserPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/User/GetUserPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
}

export const getUserByID = async(id : string)=>{
    return (await axios.get(`${apiUrl}/User/GetByID/${id}`)).data
    
}

export const GetUserProfileById = async(id : string)=>{
    return (await axios.get(`${apiUrl}/User/GetUserProfileById/${id}`)).data
    
}

export const createUser = async(data:any)=>{
    return await axios.post(`${apiUrl}/User/CreateUser`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const editUser = async(data:any)=>{
    console.log(data)
    return await axios.put(`${apiUrl}/User/EditUser`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const deleteUser = async(id : string)=>{
    return (await axios.delete(`${apiUrl}/User?${id}`)).data
    
}