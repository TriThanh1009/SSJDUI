/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;


export const getUser = async()=>{
    const response = await axios.get(`${apiUrl}/User`)
    return response.data
}

export const getUserByID = async(id : string)=>{
    const response = await axios.get(`${apiUrl}/User/GetByID/${id}`)
    return response.data
}

export const GetUserProfileById = async(id : string)=>{
    const response = await axios.get(`${apiUrl}/User/GetUserProfileById/${id}`)
    return response.data
}

export const createUser = async(data:any)=>{
    console.log(data)
    const response = await axios.post(`${apiUrl}/User/CreateUser`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    console.log(response.data)
    return response.data
}

export const editUser = async(data:any)=>{
    console.log(data)
    const response = await axios.put(`${apiUrl}/User/EditUser`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    console.log(response.data)
    return response.data
}

export const deleteUser = async(id : string)=>{
    const response = await axios.delete(`${apiUrl}/User?${id}`)
    return response.data
}