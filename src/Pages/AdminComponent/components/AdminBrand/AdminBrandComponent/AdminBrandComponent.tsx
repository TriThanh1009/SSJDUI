/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from "react"
import './AdminBrandComponent.css'
import AdminBrandOptionsComponent from "../AdminBrandOptionsComponent/AdminBrandOptionsComponent"
import { BrandModel } from "../../../../../Model/Brand/BrandModel"
import { deleteBrand, getBrandPaging } from "../../../../../Responsitories/BrandResponsitory"
import { PagingModel } from "../../../../../Model/Paging/PagingModel"
import Pagination from "../../Common/Pagination"
import SearchInput from "../../Common/SearchInput/SearchInput"
import clsx from 'clsx'

const AdminBrandComponent:React.FC = () =>{
    const [brands, setBrands] = useState<BrandModel[]>([])
    const [showformoptions, setShowFormOptions] = useState(false);
    const [getid, setgetid] = useState('');
    const [totalRecords, setTotalRecords] = useState(0);
    const [paging, setPaging] = useState<PagingModel>({
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
            const res = await getBrandPaging(paging);
            if (res) {
                setBrands(res.items || []);
                const totalPages = Math.ceil((res.totalRecords || 0) / paging.pagesize);
                setTotalRecords(totalPages);
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
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
        setBrands([]);
        setPaging(prev => ({
            ...prev,
            pageindex: newPage
        }));
    };

    const clicktoshowFormoption = () => {
        setgetid('')
        setShowFormOptions(true)
    }

    const onCancel = () => {
        setShowFormOptions(false)
    }

    if(showformoptions){
        childpage = <AdminBrandOptionsComponent selectedID={getid} onCancel={onCancel}/>
    } else childpage = <div></div>
    
    const handleEdit = (id:string) => {
        setShowFormOptions(true)
        setgetid(id)
    }

    const onDelete = async (id: string) => {
        await deleteBrand(id)
        fetch()
    }

    return (
        <div className="d-flex flex-row">
            <div className={clsx("card shadow", "col-md-12", { "col-xl-9": showformoptions })}>
                <h6 className="table-title m-2 font-weight-bold text-primary mt-2">Brand Table</h6>
                <div className="card-header py-3 d-flex flex-row justify-content-between">
                    <SearchInput onSearch={handleSearch} />
                    <button className="button-options" onClick={clicktoshowFormoption}>Create</button> 
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" >
                            <thead>
                                <tr>
                                    <th>Tên thương hiệu</th>
                                    <th>Options</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Array.isArray(brands) && brands.map((brand) => (
                                    <tr key={brand.id}>
                                        <td>{brand.name}</td>
                                        <td className="td-options d-flex flex-row gap-2">
                                            <i onClick={() => handleEdit(brand.id)} className="options-icon bi bi-pen"></i>
                                            <i onClick={() => onDelete(brand.id)} className="options-icon bi bi-x-octagon"></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination 
                        pageSize={totalRecords}
                        onPageChange={handlePageChange}
                    />
                </div>                  
            </div>
            
            <div className={clsx("child-page", { "col-md-3": showformoptions })}>
                {childpage}
            </div>
        </div>
    )
}

export default AdminBrandComponent