/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"
import { ProductDetailCreateModel } from "../../../../../Model/ProductDetail/ProductDetailCreateModel"
import { createProductDetail, editProductDetail, getdescriptionByproductID } from "../../../../../Responsitories/ProductDetailResponsitory"
import { ProductDetailModel } from "../../../../../Model/ProductDetail/ProductDetailModel"
import './AdminProductDetailOptions.css'
interface props{
    onCancel: () =>void
    productID : string
}

const AdminProductDetailOptionsComponent:React.FC<props> = ({productID,onCancel})=>{
    const [productdetail,setproductdetail] = useState<ProductDetailCreateModel>()
    const [detaildata,setdetaildata] = useState<ProductDetailModel>()
    const [formedit,setformedit] = useState(false)
    useEffect(()=>{
        fetch()
    },[])
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setproductdetail((prev)=>({
            ...prev,
            productID : productID,
            [name]: name === "description" ? value.split(",") : value,
        }))
        console.log(productdetail)
    }
    const fetch = async() =>{
        if(productID){
            const data =  await getdescriptionByproductID(productID)
            setdetaildata(data)
        }
    }

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()
        try{
            if(productdetail){
                if(!formedit){
                    await createProductDetail(productdetail)
                    alert('Create Success')
                }else {
                    await editProductDetail(productdetail)
                    alert('Edit Success')
                }
                
                
            }
        }catch(error){
            alert("Error")
        }
        
    }
    function clicktoedit(){
        setformedit(prev => !prev)
    }

    return(
        <div className="d-flex flex-row">
                <div>
                    {!formedit &&
                    <div className="form form-zindex">   
                           
                        <div className="form-group row"  >
                                <label className="col-sm-8 col-form-label label-detail">Description</label>
                                <div className="col-sm-12">
                                    {detaildata && <span>{Array.isArray(detaildata.description) ? detaildata.description.join(", ") : detaildata.description}</span>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-8 col-form-label label-detail">Warranty</label>
                                <div className="col-sm-12">
                                {detaildata && (<span>{detaildata.warranty.toString().split("T")[0]}</span>)}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-8 col-form-label label-detail">Origin</label>
                                <div className="col-sm-12">
                                {detaildata && <span>{detaildata.origin}</span>}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="button-options-list d-flex flex-row gap-3">
                                    <button onClick={clicktoedit} type='submit' className="button-options">Edit</button>
                                    <button className="button-options" onClick={onCancel} >Cancel</button> 
                                </div>  
                            </div>   
                        </div>
                    }
                </div>
                <div>
                {formedit &&
                <form className="form form-zindex">
                    <div>      
                        <div className="form-group row"  >
                                <label className="col-sm-5 col-form-label label-detail">Description</label>
                                <div className="col-sm-12">
                                    <input type="text" id="description"  name="description" onChange={handleChange}  className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label label-detail">Warranty</label>
                                <div className="col-sm-12">
                                <input type="date" id="warranty"  name="warranty"     pattern="[a-zA-Z ]+"  onChange={handleChange} className="form-control" />
                                
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-5 col-form-label label-detail">Origin</label>
                                <div className="col-sm-12">
                                <input type="text" id="origin"   name="origin" onChange={handleChange} className="form-control" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="button-options-list d-flex flex-row gap-3">
                                    <button onSubmit={handleSubmit} type='submit' className="button-options">Accept</button>
                                    <button className="btn btn-light" onClick={clicktoedit} >Cancel Edit</button> 
                                </div>  

                            </div>     
                        </div>
                    </form>}
                </div>
        </div>
    )
}


export default AdminProductDetailOptionsComponent