/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"

import './AdminAccountComponent.css'
import clsx from 'clsx'
import AdminAccountOptionsComponent from "../AdminAccountOptionsComponent/AdminAccountOptionsComponent"
import { AccountModel } from "../../../../../Model/Account/AccountModel"
import { getAccount, deleteAccount } from "../../../../../Responsitories/AccountResponsitory"

const AdminAccountComponent:React.FC = () =>{
    const [accounts,setAccounts] = useState<AccountModel[]>()
    const [showformoptions, setShowFormOptions] = useState(false);
    const [getid,setgetid] = useState('');
    let childpage

    useEffect(()=>{
        fetch()
    },[])
    const fetch = async () =>{
        const data = await getAccount()
        setAccounts(data)
    }

    const clicktoshowFormoption = ()=>{
        setgetid('')
        setShowFormOptions(true)
    }
    const onCancel = ()=>{
        setShowFormOptions(false)
    }
    if(showformoptions){
        childpage = <AdminAccountOptionsComponent selectedItemId={getid} onCancel={onCancel}/>
    } else childpage = <div></div>
    
    const handleEdit = (id:string)=>{
        setShowFormOptions(true)
        setgetid(id)
    }
    const onDelete = async (id: string) =>{
        await deleteAccount(id)
        window.location.reload()
    }

    
    
    return (
                <div className="d-flex flex-row">
                    <div className={clsx("card shadow","col-md-12",{"col-xl-9":showformoptions})}>
                        <div className="card-header py-3 d-flex flex-row justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Account Table</h6>
                            <button className="button-options" onClick={clicktoshowFormoption} >Create</button> 
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" >
                                    <thead>
                                        <tr className="">
                                            <th>Tài khoản</th>
                                            <th>Mật khẩu</th>
                                            <th>Email</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {Array.isArray(accounts) && accounts.map((account) => (
                                        <tr key={account.id}>
                                        <td>{account.userName}</td>
                                        <td>{account.password}</td>
                                        <td>{account.email}</td>
                                        <td className="td-options d-flex flex-row gap-2">
                                        <i onClick={()=>handleEdit(account.id)} className="options-icon bi bi-pen"></i>
                                        <i onClick={()=>onDelete(account.id)} className="options-icon bi bi-x-octagon"></i>
                                        </td>
                                        </tr>
                                    ))}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>                  
                        
                    </div>
                    
                    <div className={clsx("child-page",{"col-md-3":showformoptions})}>
                        {childpage}
                    </div>
                </div>
                    

    )
}


export default AdminAccountComponent