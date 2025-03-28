/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { PagingModel } from '../Model/Paging/PagingModel';

const apiUrl = import.meta.env.VITE_API_URL;


export const getUnitShip = async()=>{
    return (await axios.get(`${apiUrl}/UnitShip`)).data
    
}
export const getUnitShipPaging = async(paging : PagingModel)=>{
    if(paging.keyword)
        return (await axios.get(`${apiUrl}/UnitShip/GetUnitShipPaging?Keyword=${paging.keyword}&PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    return (await axios.get(`${apiUrl}/UnitShip/GetUnitShipPaging?PageIndex=${paging.pageindex}&PageSize=${paging.pagesize}`)).data
    
}
export const getUnitShipByID = async(id : string)=>{
    return (await axios.get(`${apiUrl}/UnitShip/${id}`)).data
    
}

export const createUnitShip = async(data:any)=>{
    return await axios.post(`${apiUrl}/UnitShip/CreateUnitShip`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const editUnitShip = async(data:any)=>{
    return await axios.put(`${apiUrl}/UnitShip/EditUnitShip`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    
}

export const deleteUnitShip = async(id : string)=>{
    return (await axios.delete(`${apiUrl}/UnitShip?${id}`)).data
    
}