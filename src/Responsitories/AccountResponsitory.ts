/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'


const apiUrl = import.meta.env.VITE_API_URL;


export const getAccount = async()=>{
    const response = await axios.get(`${apiUrl}/Account`)
    return response.data
}

export const getAccountByID = async(id : string)=>{
    const response = await axios.get(`${apiUrl}/Account/${id}`)
    return response.data
}

export const createAccount = async(data:any)=>{
    console.log(data)
    const response = await axios.post(`${apiUrl}/Account/CreateAccount`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
    return response.data
}

export const editAccount = async(data:any)=>{
    const response = await axios.put(`${apiUrl}/Account/EditAccount`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const deleteAccount = async(id : string)=>{
    const response = await axios.delete(`${apiUrl}/Account?id=${id}`)
    return response.data
}