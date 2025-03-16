/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { ProductOptionsModel } from '../../../../../Model/Product/ProductOptionsModel';
import { editProduct, createProduct } from '../../../../../Responsitories/ProductResponsitory';
import { BrandModel } from '../../../../../Model/Brand/BrandModel';
import { getBrand } from '../../../../../Responsitories/BrandResponsitory';
import { CategoryModel } from '../../../../../Model/Category/CategoryModel';
import { getCategory } from '../../../../../Responsitories/CategoryResponsitory';

interface Props {
    onCancel: () => void; // Định nghĩa prop onCancels
    selectedID : string
  }

const AdminProductOptionsComponent:React.FC<Props> = ({onCancel,selectedID}) =>{
const [product, setproduct] = useState<ProductOptionsModel>()
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [brands,setbrands] = useState<BrandModel[]>()
const [categorys,setcategorys] = useState<CategoryModel[]>()

    useEffect(()=>{
        getbrand()
        getcategory()
    })

    const getbrand = async() =>{
        const data = await getBrand()
            setbrands(data)
        
    }
    const getcategory = async() =>{
        const data = await getCategory()
        setcategorys(data)
        
    }


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };
    const handlechange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const { name, value } = e.target;
        if (selectedID) {
            setproduct(prev => ({
                ...prev,
                ID : selectedID,
                Image : selectedFile,
                [name] : value
            }));
            
        }
        else{
            setproduct((prev) => ({
                ...prev,
                Image : selectedFile,
                [name]: value,
            }));
        }

        console.log(product?.CategoryID,product?.BrandID)
    }

    const handlesubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        try{
            const formData = new FormData();
        
            if (product) {
                Object.entries(product).forEach(([key, value]) => {
                    if (key === "Image" && value instanceof File) {
                        formData.append(key, value); // Đảm bảo file ảnh là dạng nhị phân
                    } else if (["Price"].includes(key)) {
                        formData.append(key, parseFloat(value as string).toString()); // Chuyển đổi số thực
                    } else if (["Stock", "isActive", "Size"].includes(key)) {
                        formData.append(key, parseInt(value as string).toString()); // Chuyển đổi số nguyên
                    } else {
                        formData.append(key, value as string); // Giữ nguyên các giá trị chuỗi
                    }
                });
            }
            /*else if (key === "descriptions" && Array.isArray(value)) {
                value.forEach((desc) => {
                    formData.append(key, desc); // Thêm từng phần tử
                });
            }
            */ //neu kieu du lieu la chuoi string
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        if (selectedID) {
            await editProduct(formData);
        } else {
            await createProduct(formData);
        }
        } catch (error) {
            alert('Error');
        }
    }

    return (
        <form className="form form-zindex" onSubmit={handlesubmit} >
            <h1 className='text-center'>Create</h1>
        <div className='d-flex flex-row'>
            <div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" id="Name"  name="Name"  onChange={handlechange}    className="form-control" />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Brand</label>
                    <div className="col-sm-10">
                        <select id="BrandID" name="BrandID" onChange={handlechange} className="form-control">
                            <option value="">-- Chọn thương hiệu --</option>
                            {brands?.map((brand) => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Category</label>
                    <div className="col-sm-10">
                        <select id="CategoryID" name='CategoryID' onChange={handlechange} className='form-control'>
                            <option value="">-- Chọn loại bút -- </option>
                            {categorys?.map((category)=>(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Size</label>
                    <div className="col-sm-10">
                        <input type="text" id="Size"   name="Size" onChange={handlechange}   className="form-control" />

                    </div>
                </div>
            </div>
            <div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Price</label>
                    <div className="col-sm-10">
                        <input type="text" id="Price"   name="Price" onChange={handlechange}   className="form-control" />

                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Stock</label>
                    <div className="col-sm-10">
                        <input type="text" id="Stock"   name="Stock"  onChange={handlechange}  className="form-control" />

                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Active</label>
                    <div className="col-sm-10">
                    <select id="CategoryID" name='CategoryID' onChange={handlechange} className='form-control'>
                            <option value="">-- Tình trạng -- </option>
                            <option value="0">Hết hàng</option>
                            <option value="1">Còn hàng</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Image</label>
                    <div className="col-sm-10">
                        <input type="file" id="Image"   name="Image" onChange={handleFileChange}   className="form-control" />
                    </div>
                </div>
                <div className='button-options-list d-flex flex-row gap-3' >
                    <button type='submit' className="button-options">Accept</button>
                    <button className="button-options" onClick={onCancel} >Cancel</button> 
                </div>
            </div>
           
        </div>
    </form>
    )
}



export default AdminProductOptionsComponent