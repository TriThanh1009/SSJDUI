/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';


const apiUrl = import.meta.env.VITE_API_URL;


export const getOrderDetail = async()=>{
    return await axios.get(`${apiUrl}/OrderDetail`)
    
}
export const getOrderDetailPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/OrderDetai/GetOrderDetailPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/OrderDetai/GetOrderDetailPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}

export const getOrderDetailByID = async(id : string)=>{
    return await axios.get(`${apiUrl}/OrderDetail/${id}`)
    
}

export const listByOrderID = async(id:string)=>{
    const response = await axios.get(`${apiUrl}/OrderDetail/ListByOrder/${id}`)
    return response.data
}

export const createOrderDetail = async(data:any)=>{
    return await axios.post(`${apiUrl}/OrderDetail/CreateOrderDetail`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const CreateListOrderDetail = async(data:any)=>{
    return await axios.post(`${apiUrl}/OrderDetail/CreateListOrderDetail`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const editOrderDetail = async(data:any)=>{
    const response = await axios.put(`${apiUrl}/OrderDetail/EditOrderDetail`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
    
}

export const deleteOrderDetail = async(id : string)=>{
    const response = await axios.delete(`${apiUrl}/OrderDetail?id=${id}`)
    return response.data
}