import React, { useEffect, useState } from "react"

import clsx from 'clsx'
import AdminUnitShipOptionsComponent from "../AdminUnitShipOptionsComponent/AdminUnitShipOptionsComponent"
import { UnitShipModel } from "../../../../../Model/UnitShip/UnitShipModel"
import { getUnitShip, deleteUnitShip } from "../../../../../Responsitories/UnitShipResponsitory"


const AdminUnitShipComponent:React.FC = () =>{
    const [unitships,setUnitShips] = useState<UnitShipModel[]>()
    const [showformoptions, setShowFormOptions] = useState(false);
    const [getid,setgetid] = useState('');
    let childpage       
    useEffect(()=>{
        fetch()
    },[])
    const fetch = async () =>{
        const data = await getUnitShip()
        setUnitShips(data)
    }
    const clicktoshowFormoption = ()=>{
        setgetid('')
        setShowFormOptions(true)
    }
    const onCancel = ()=>{
        setShowFormOptions(false)
    }
    if(showformoptions){
        childpage = <AdminUnitShipOptionsComponent selectedId={getid} onCancel={onCancel}/>
    } else childpage = <div></div>
    
    const handleEdit = (id:string)=>{
        setShowFormOptions(true)
        setgetid(id)
    }
    const onDelete = async (id: string) =>{
        await deleteUnitShip(id)
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
                                            <th>Đơn vị vận chuyển</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {Array.isArray(unitships) && unitships.map((unitship) => (
                                        <tr>
                                        <td>{unitship.name}</td>
                                        <td className="td-options d-flex flex-row gap-2">
                                        <i onClick={()=>handleEdit(unitship.id)} className="options-icon bi bi-pen"></i>
                                        <i onClick={()=>onDelete(unitship.id)} className="options-icon bi bi-x-octagon"></i>
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


export default AdminUnitShipComponent