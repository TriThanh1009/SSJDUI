/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"
import { OrderWithOrderDetail } from "../../../../../Model/RelationshipModel/OrderWithOrderDetail/OrderWithOrderDetail"
import { listByOrderID } from "../../../../../Responsitories/OrderDetailResponsitory"


interface Props{
    onCancel : () => void
    orderId : string
}

const AdminOrderDetailComponent:React.FC<Props> = ({orderId,onCancel}) =>{
    const [orderdetail,setorderdetail] = useState<OrderWithOrderDetail[]>()

    useEffect(()=>{
        fetch()
    },[])

    const fetch = async () =>{
        const data = await listByOrderID(orderId)
        setorderdetail(data)
        console.log(orderdetail)

    }


    return(
        <div className="form form-zindex">
            {Array.isArray(orderdetail) && orderdetail.map((od)=>(
            <div className="form-group row"> 
                {Array.isArray(od.orderDetails) && od.orderDetails.map((o)=>(
                <div className="d-flex flex-row gap-5">
                    <div>
                    <label className="col-sm-10 col-form-label label-detail">Product</label>
                        <div className="col-sm-12">
                            {o.unitProduct}
                        </div>
                        <div className="form-group row">
                    <label className="col-sm-1010 col-form-label label-detail">Price</label>
                            <div className="col-sm-12">
                            {o.unitPrice}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row">
                        <label className="col-sm-10 col-form-label label-detail">Quantity</label>
                                <div className="col-sm-12">
                                    {o.quantity}
                                </div>
                            </div>
                        <div className="form-group row">
                        <label className="col-sm-10 col-form-label label-detail">Promotion</label>
                            <div className="col-sm-12">
                                {o.promotion}
                            </div>
                            </div>
                        <div className="d-flex justify-content-between">
                            <div className="button-options-list d-flex flex-row gap-3">
                                <button className="button-options" onClick={onCancel} >Cancel</button> 
                            </div>  
                        </div> 
                    </div>
                </div>  
                ))}
            </div>
            ))}
        </div>
    )
}







export default AdminOrderDetailComponent