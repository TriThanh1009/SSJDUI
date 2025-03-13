import React, { useEffect, useState } from "react"

import clsx from 'clsx'
import { deleteUser, getUser } from "../../../../../Responsitories/UserResponsitory"
import AdminUserOptionsComponent from "../AdminUserOptionsComponent/AdminUserOptionsComponent"
import { UserModel } from "../../../../../Model/User/UserModel"


const AdminUserComponent:React.FC = () =>{
    const [users,setusers] = useState<UserModel[]>()
    const [showformoptions, setShowFormOptions] = useState(false);
    const [getid,setgetid] = useState('');
    let childpage       
    useEffect(()=>{
        fetch()
    },[])
    const fetch = async () =>{
        const data = await getUser()
        setusers(data)
    }
    const clicktoshowFormoption = ()=>{
        setgetid('')
        setShowFormOptions(true)
    }
    const onCancel = ()=>{
        setShowFormOptions(false)
    }
    if(showformoptions){
        childpage = <AdminUserOptionsComponent selectedId={getid} onCancel={onCancel}/>
    } else childpage = <div></div>
    
    const handleEdit = (id:string)=>{
        setShowFormOptions(true)
        setgetid(id)
    }
    const onDelete = async (id: string) =>{
        await deleteUser(id)
        window.location.reload()
    }
    return (
        <div className="d-flex flex-row">
                    <div className={clsx("card shadow","col-md-12",{"col-xl-9":showformoptions})}>
                        <div className="card-header py-3 d-flex flex-row justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Unit Shipping Table</h6>
                            <button className="button-options" onClick={clicktoshowFormoption}>Create</button> 
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" >
                                    <thead>
                                        <tr className="">
                                            <th>Tên người dùng</th>
                                            <th>Địa chỉ</th>
                                            <th>Số điện thoại</th>
                                            <th>Giới tính</th>
                                            <th>Căn cước công dân</th>
                                            <th>Email</th>
                                            <th>Tài khoản</th>
                                            <th>Hạng thành viên</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {Array.isArray(users) && users.map((user) => (
                                        <tr>
                                        <td>{user.userName}</td>
                                        <td>{user.address}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.sex === 1 ? "Nam" : "Nữ"}</td>
                                        <td>{user.identityCard}</td>
                                        <td>{user.email}</td>
                                        <td>{user.account}</td>
                                        <td>{user.memberCard}</td>
                                        <td className="td-options d-flex flex-row gap-2">
                                        <i onClick={()=>handleEdit(user.id)} className="options-icon bi bi-pen"></i>
                                        <i onClick={()=>onDelete(user.id)} className="options-icon bi bi-x-octagon"></i>
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


export default AdminUserComponent