import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;


export const getRoleByAccount = async(AccountID : string)=>{
    const response = await axios.get(`${apiUrl}/Role/GetRoleByAccount?AccountID=${AccountID}`)
    const role = response.data[0]
    return role
}
