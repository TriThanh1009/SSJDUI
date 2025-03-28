/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from "react"
import './AdminAccountComponent.css'
import clsx from 'clsx'
import AdminAccountOptionsComponent from "../AdminAccountOptionsComponent/AdminAccountOptionsComponent"
import { AccountModel } from "../../../../../Model/Account/AccountModel"
import { deleteAccount, getAccountPaging } from "../../../../../Responsitories/AccountResponsitory"
import { PagingModel } from "../../../../../Model/Paging/PagingModel"
import Pagination from "../../Common/Pagination"
import SearchInput from "../../Common/SearchInput/SearchInput"

const AdminAccountComponent:React.FC = () =>{
    const [accounts,setAccounts] = useState<AccountModel[]>([])
    const [showformoptions, setShowFormOptions] = useState(false);
    const [getid,setgetid] = useState('');
    const [paging,setPaging] = useState<PagingModel>({
        keyword: '',
        pageindex: 1,
        pagesize: 5
    })

    let childpage

    useEffect(()=>{
        fetch()
    },[paging]) 

    const fetch = async () =>{
        try {
            const res = await getAccountPaging(paging);
            if (res) {
                setAccounts(res.items || []);
            }
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    }

    const handleSearch = useCallback((keyword: string) => {
        setPaging(prev => ({
            ...prev,
            keyword,
            pageindex: 1
        }));
    }, []);

    const handlePageChange = (newPage: number) => {
        setAccounts([]);
        setPaging(prev => ({
            ...prev,
            pageindex: newPage
        }));
    };

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
        fetch()
    }

    return (
                <div className="d-flex flex-row">
                    <div className={clsx("card shadow","col-md-12",{"col-xl-9":showformoptions})}>
                     <h6 className="table-title m-2 font-weight-bold text-primary mt-2">Account Table</h6>
                        <div className="card-header py-3 d-flex flex-row justify-content-between">
                            <SearchInput onSearch={handleSearch} />
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
                            <Pagination 
                                pageSize={paging.pagesize}
                                onPageChange={handlePageChange}
                            />
                        </div>                  
                    </div>
                    
                    <div className={clsx("child-page",{"col-md-3":showformoptions})}>
                        {childpage}
                    </div>
                </div>
    )
}

export default AdminAccountComponent