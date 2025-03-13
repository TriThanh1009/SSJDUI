/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'


const apiUrl = import.meta.env.VITE_API_URL;


export const getMemberCard = async()=>{
    const response = await axios.get(`${apiUrl}/MemberCard`)
    return response.data
}

export const getMemberCardByID = async(id : string)=>{
    const response = await axios.get(`${apiUrl}/MemberCard/${id}`)
    return response.data
}

export const createMemberCard = async(data:any)=>{
    const response = await axios.post(`${apiUrl}/MemberCard/CreateMemberCard`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const editMemberCard = async(data:any)=>{
    const response = await axios.put(`${apiUrl}/MemberCard/EditMemberCard`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const deleteMemberCard = async(id : string)=>{
    const response = await axios.delete(`${apiUrl}/MemberCard?${id}`)
    return response.data
}