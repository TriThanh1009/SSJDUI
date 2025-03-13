/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react"

import AdminProductOptionsComponent from "../AdminProductOptionsComponent/AdminProductOptionsComponent"
import './AdminProductComponent.css'
import { deleteProduct, getProduct } from "../../../../../Responsitories/ProductResponsitory"
import { ProductModel } from "../../../../../Model/Product/ProductModel"

import AdminProductDetailOptionsComponent from "../AdminProductDetailComponent/AdminProductDetailOptionsComponent"
const AdminProductComponent:React.FC = () =>{
    const apiUrl = import.meta.env.VITE_API_GET_IMG;
    const [products,setproducts] = useState<ProductModel[]>()
    const [showformoptions, setShowFormOptions] = useState(false);
    const [showformdetail,setshowformdetail] = useState(false)
    let childpage
    let formdetail
    const [getid,setgetid] = useState('');
     useEffect(()=>{
         fetch()
     })
     const fetch = async()=>{
        const data = await getProduct()
        if(data)
            setproducts(data)
       
    }
    
    const clicktoshowFormoption = ()=>{
        setgetid('')
        setShowFormOptions(true)
        console.log(showformoptions) 
        }
    const clicktoshowformdetail = (id : string) =>{
        setgetid(id)
        setshowformdetail(prev => !prev)
    }
    const handleEdit = (id:string)=>{
            setShowFormOptions(true)
            setgetid(id)
            }
    const onDelete = async (id:string)=>{
            await deleteProduct(id)
            window.location.reload()
            }
    const onOptionsCancel = ()=>{
        setShowFormOptions(false)
        }
    const onDetailFormCancel = () =>{
        setshowformdetail(false)
    }

    if(showformoptions){
        childpage = <AdminProductOptionsComponent selectedID={getid} onCancel={onOptionsCancel} />
        } else childpage = <div></div>
    if(showformdetail){
        formdetail = <AdminProductDetailOptionsComponent productID={getid} onCancel={onDetailFormCancel}/>
    }

    
    return (
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Product Table</h6>
                            <button className="button-options" onClick={clicktoshowFormoption}>Create</button> 
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" >
                                    <thead>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Thương hiệu</th>
                                            <th>Thể loại</th>
                                            <th>Số lượng bút</th>
                                            <th>Giá tiền</th>
                                            <th>Tồn kho</th>
                                            <th>Trạng thái</th>
                                            <th>Hình ảnh</th>
                                            <th>Options</th>
                                            <th>Chi tiết</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Array.isArray(products) && products.map((product)=>(
                                            <tr key={product.id}>
                                                <td>{product.name}</td>
                                                <td>{product.brand}</td>
                                                <td>{product.category}</td>
                                                <td>{product.size}</td>
                                                <td>{product.price.toLocaleString("vi-VN")}</td>
                                                <td>{product.stock}</td>
                                                <td>{product.isActive === "1" ? "Còn hàng" : "Hết hàng"}</td>
                                                <td className="product-list-img"><img src={`${apiUrl}${product.image}`}  /></td>
                                                <td className="td-options d-flex flex-row gap-2">
                                                <i onClick={()=>handleEdit(product.id)} className="options-icon bi bi-pen"></i>
                                                <i onClick={()=>onDelete(product.id)} className="options-icon bi bi-x-octagon"></i>                                              
                                                </td>
                                                <td><button className="btn btn-primary" onClick={()=>clicktoshowformdetail(product.id)}>Detail</button></td>
                                            </tr>
                                        ))} 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="detail-page">
                                {childpage}
                        </div>
                        <div className="detail-page">
                                {formdetail}
                        </div>
                    </div>

    )
}


export default AdminProductComponent