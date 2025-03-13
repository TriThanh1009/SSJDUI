import React, { useEffect, useState } from "react"

import clsx from 'clsx'
import AdminCategoryOptionsComponent from "../AdminCategoryOptionsComponent/AdminCategoryOptionsComponent"
import { CategoryModel } from "../../../../../Model/Category/CategoryModel"
import { getCategory, deleteCategory } from "../../../../../Responsitories/CategoryResponsitory"

const AdminCategoryComponent:React.FC = () =>{
    const[categorys,setcategorys] = useState<CategoryModel[]>()
    const [showformoptions, setShowFormOptions] = useState(false);
    let childpage
    const [getid,setgetid] = useState('');
    const clicktoshowFormoption = ()=>{
        setgetid('')
        setShowFormOptions(true)
        console.log(showformoptions) 
    }
    const onCancel = ()=>{
        setShowFormOptions(false)
    }
    if(showformoptions){
        childpage = <AdminCategoryOptionsComponent selectedID={getid} onCancel={onCancel} />
    } else childpage = <div></div>
    useEffect(()=>{
        fetch()
    })
    const fetch = async () =>{
        const data = await getCategory()
        setcategorys(data)
    }

    const handleEdit = (id:string)=>{
        setShowFormOptions(true)
        setgetid(id)
    }
    const onDelete = async (id:string)=>{
        await deleteCategory(id)
        window.location.reload()
    }

    return (
        <div className="d-flex flex-row">
                    <div className={clsx("card shadow","col-md-12",{"col-xl-9":showformoptions})}>
                        <div className="card-header py-3 d-flex flex-row justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Category Table</h6>
                            <button className="button-options" onClick={clicktoshowFormoption}>Create</button> 
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" >
                                    <thead>
                                        <tr className="">
                                            <th>Tên loại bút</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Array.isArray(categorys) && categorys.map((category)=>(
                                            <tr key={category.id}>
                                                <td>{category.name}</td>
                                                <td className="td-options d-flex flex-row gap-2">
                                                <i onClick={()=>handleEdit(category.id)} className="options-icon bi bi-pen"></i>
                                                <i onClick={()=>onDelete(category.id)} className="options-icon bi bi-x-octagon"></i>
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


export default AdminCategoryComponent