/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'


const apiUrl = import.meta.env.VITE_API_URL;


export const getOrderDetail = async()=>{
    const response = await axios.get(`${apiUrl}/OrderDetail`)
    console.log(response.data)
    return response.data
}

export const getOrderDetailByID = async(id : string)=>{
    const response = await axios.get(`${apiUrl}/OrderDetail/${id}`)
    return response.data
}

export const listByOrderID = async(id:string)=>{
    const response = await axios.get(`${apiUrl}/OrderDetail/ListByOrder/${id}`)
    return response.data
}

export const createOrderDetail = async(data:any)=>{
    console.log(data)
    const response = await axios.post(`${apiUrl}/OrderDetail/CreateOrderDetail`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const CreateListOrderDetail = async(data:any)=>{
    console.log(data)
    const response = await axios.post(`${apiUrl}/OrderDetail/CreateListOrderDetail`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
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