/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';


const apiUrl = import.meta.env.VITE_API_URL;


export const getAccount = async()=>{
    const response = await axios.get(`${apiUrl}/Account`)
    return response.data
}

export const getAccountPaging = async(paging : PagingModel)=>{
    console.log(paging)
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/Account/GetAccountPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/Account/GetAccountPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}


export const getAccountByID = async(id : string)=>{
    return (await axios.get(`${apiUrl}/Account/${id}`)).data
}

export const createAccount = async(data:any)=>{
    const response = await axios.post(`${apiUrl}/Account/CreateAccount`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const editAccount = async(data:any)=>{
    return await axios.put(`${apiUrl}/Account/EditAccount`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
}

export const deleteAccount = async(id : string)=>{
    console.log(id)
    return (await axios.delete(`${apiUrl}/Account?id=${id}`)).data
}