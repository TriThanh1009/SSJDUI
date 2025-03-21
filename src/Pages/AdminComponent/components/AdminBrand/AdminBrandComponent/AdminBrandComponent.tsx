import React, { useEffect, useState } from "react"

import clsx from 'clsx'
import { BrandModel } from "../../../../../Model/Brand/BrandModel";
import AdminBrandOptionsComponent from "../AdminBrandOptionsComponent/AdminBrandOptionsComponent";
import { deleteBrand, getBrand } from "../../../../../Responsitories/BrandResponsitory";


const AdminBrandComponent:React.FC = () =>{
    const[brands,setbrands] = useState<BrandModel[]>()
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
        childpage = <AdminBrandOptionsComponent selectedID={getid} onCancel={onCancel} />
    } else childpage = <div></div>
    useEffect(()=>{
        fetch()
    })
    const fetch = async () =>{
        const data = await getBrand()
        setbrands(data)
    }

    const handleEdit = (id:string)=>{
        setShowFormOptions(true)
        setgetid(id)
    }
    const onDelete = async (id:string)=>{
        await deleteBrand(id)
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
                                            <th>Hãng</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Array.isArray(brands) && brands.map((brand)=>(
                                            <tr key={brand.id}>
                                                <td>{brand.name}</td>
                                                <td className="td-options d-flex flex-row gap-2">
                                                <i onClick={()=>handleEdit(brand.id)} className="options-icon bi bi-pen"></i>
                                                <i onClick={()=>onDelete(brand.id)} className="options-icon bi bi-x-octagon"></i>
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


export default AdminBrandComponent