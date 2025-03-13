/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;


export const getUnitShip = async()=>{
    const response = await axios.get(`${apiUrl}/UnitShip`)
    return response.data
}

export const getUnitShipByID = async(id : string)=>{
    const response = await axios.get(`${apiUrl}/UnitShip/${id}`)
    return response.data
}

export const createUnitShip = async(data:any)=>{
    const response = await axios.post(`${apiUrl}/UnitShip/CreateUnitShip`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const editUnitShip = async(data:any)=>{
    const response = await axios.put(`${apiUrl}/UnitShip/EditUnitShip`,JSON.stringify(data),{
        headers:{
            "Content-Type" : "application/json"
        }
    })
    return response.data
}

export const deleteUnitShip = async(id : string)=>{
    const response = await axios.delete(`${apiUrl}/UnitShip?${id}`)
    return response.data
}