/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';


const apiUrl = import.meta.env.VITE_API_URL;


export const getOrder = async()=>{
    return (await axios.get(`${apiUrl}/Order`)).data
    
}
export const getOrderPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/Order/GetOrderPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/Order/GetOrderPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}

export const getOrderByID = async(id : string)=>{
    return (await axios.get(`${apiUrl}/Order/GetByID/${id}`)).data
    
}

export const createOrder = async(data:any)=>{
    console.log(data)
    return await axios.post(`${apiUrl}/Order/CreateOrder`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const ChangePaymentStatus = async(orderid : string)=>{
    console.log(orderid)
    return await axios.put(`${apiUrl}/Order/ChangePaymentStatus?OrderID=${orderid}`)
    
}

export const editOrder= async(data:any)=>{
    return await axios.put(`${apiUrl}/Order/EditOrder`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const deleteOrder = async(id : string)=>{
    return (await axios.delete(`${apiUrl}/Order?=${id}`)).data
    
}