/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react"
import { OrderModel } from "../../../../../Model/Order/OrderModel"
import { ChangePaymentStatus, getOrderByID, getOrderPaging } from "../../../../../Responsitories/OrderResponsitory"
import  './AdminOrderComponent.css'
import failure from "../../../../../Image/failure.png"
import success from "../../../../../Image/success.png"
import AdminOrderDetailComponent from "../AdminOrderDetailComponent/AdminOrderDetailComponent"
import { PagingModel } from "../../../../../Model/Paging/PagingModel"
import SearchInput from "../../Common/SearchInput/SearchInput"
import Pagination from "../../Common/Pagination"

const AdminOrderComponent:React.FC = () =>{
    const [orders,setorders] = useState<OrderModel[]>()
    const [status, setStatus] = useState<{ [key: string]: number }>({});
    const [showformdetail,setshowformdetail] = useState(false)
    const [getorderid,setorderid] = useState("")
    const [paging, setPaging] = useState<PagingModel>({
        keyword: '',
        pageindex: 1,
        pagesize: 5
    })
    let formdetail

    useEffect(()=>{
        fetch()
    },[paging])
    const fetch = async () =>{
        try {
            const res = await getOrderPaging(paging);
            if (res) {
                setorders(res.items || []);
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
        setorders([]);
        setPaging(prev => ({
            ...prev,
            pageindex: newPage
        }));
    };

    function clicktoshowformdetail(id: string){
        setorderid(id)
        setshowformdetail(prev => !prev)
    }
    function onDetailCancel(){
        setshowformdetail(false)
    }

    const changepaymentstatus =  async(id : string) =>{     
        await ChangePaymentStatus(id)
        const updatepayment = await getOrderByID(id)
        setStatus(updatepayment.paymentStatus)
        window.location.reload()
    }
    
    if(showformdetail){
        formdetail = <AdminOrderDetailComponent orderId={getorderid} onCancel={onDetailCancel}></AdminOrderDetailComponent>
    }

    return (
                    <div className="card shadow mb-4">
                        <h6 className="table-title m-2 font-weight-bold text-primary mt-2">Order Table</h6>
                        <div className="card-header py-3 d-flex flex-row justify-content-between">                     
                            <SearchInput onSearch={handleSearch} />
                            {/* <button className="button-options">Create</button>  */}
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" >
                                    <thead>
                                        <tr className="">
                                            <th>Khách hàng</th>
                                            <th>Số điện thoại</th>
                                            <th>Ngày đặt hàng</th>
                                            <th>Đơn vị vận chuyển</th>
                                            <th>Địa chỉ</th>
                                            <th>Trạng thái đơn hàng</th>
                                            <th>Tổng tiền</th>
                                            <th>Phương thức thanh toán</th>
                                            <th>Trạng thái thanh toán</th>
                                            <th>Options</th>
                                            <th>Chi tiết</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {Array.isArray(orders) && orders.map((order) => (
                                        <tr key={order.id}>
                                        <td>{order.customerName}</td>
                                        <td>{order.customerPhone}</td>
                                        <td>{order.orderDate.toString().split("T")[0]}</td>
                                        <td>{order.shippingUnit}</td>
                                        <td>{order.shippingAddress}</td>
                                        <td>{order.orderStatus==="1" ? "Thành công" : "Thất bại"} </td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.paymentMethod}</td>
                                        <td><img className="switch-options" src={(status[order.id] ?? order.paymentStatus) === 1 ? success : failure} //Vì mặc định stastua  useState(0); nên cái này nó phải ngược, khi nào tìm được cách sẽ fix
                                                                            onClick={()=>changepaymentstatus(order.id)}
                                                                            style={{ cursor: "pointer" }}/>{(status[order.id] ?? order.paymentStatus) === 1 ? "Đã thanh toán" : "Chưa thanh toán"}
                                        </td> 
                                        <td className="td-options d-flex flex-row gap-2">
                                        <i className="bi bi-pen"></i>
                                        <i className="bi bi-x-octagon"></i>
                                        </td>
                                        <td><button className="btn btn-primary" onClick={() => clicktoshowformdetail(order.id)}>Detail</button></td>
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
                        <div className="detail-page">
                                {formdetail}
                        </div>
                    </div>

    )
}


export default AdminOrderComponent