/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';


const apiUrl = import.meta.env.VITE_API_URL;


export const getMemberCard = async()=>{
    return await axios.get(`${apiUrl}/MemberCard`)
    
}
export const getMemberCardPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/MemberCard/GetMemberCardPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/MemberCard/GetMemberCardPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}

export const getMemberCardByID = async(id : string)=>{
    return (await axios.get(`${apiUrl}/MemberCard/${id}`)).data
    
}

export const createMemberCard = async(data:any)=>{
    return await axios.post(`${apiUrl}/MemberCard/CreateMemberCard`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const editMemberCard = async(data:any)=>{
    return await axios.put(`${apiUrl}/MemberCard/EditMemberCard`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const deleteMemberCard = async(id : string)=>{
    return await axios.delete(`${apiUrl}/MemberCard?${id}`)
    
}