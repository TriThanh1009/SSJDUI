
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { BrandOptionsModel } from '../../../../../Model/Brand/CategoryOptionsModel';
import { createBrand, editBrand } from '../../../../../Responsitories/BrandResponsitory';


interface Props {
    onCancel: () => void; // Định nghĩa prop onCancel
    selectedID : string
  }
const AdminBrandOptionsComponent:React.FC<Props> = ({onCancel,selectedID})=>{
    const [brand, setbrand] = useState<BrandOptionsModel>()
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target

        if(selectedID){
            setbrand(prev=>({
                ...prev,
                id:selectedID
            }))
        }
        setbrand((prev)=>({
            ...prev,
            id : "1",
            [name]:value
        }))
    }
    
    const handlesubmit = async (e: React.FormEvent)=>{
        e.preventDefault()
        try{
            if(selectedID) 
                await editBrand(brand)
            await createBrand(brand)
        } catch(error) {
            alert('Error')
        }
    }



    return(
    <form className="form" onSubmit={handlesubmit} >
        <div className="form-group row"> 
            <div className="col-sm-10">
            {selectedID && 
                <div>
                        <label className="col-sm-5 col-form-label"> ID </label>
                        <input type="text" id="id" value={selectedID} onChange={handlechange}  className="form-control" />
                </div>
            }
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">Name</label>
            <div className="col-sm-10">
                <input type="text" id="name"  name="name" onChange={handlechange}  pattern="[a-zA-Z ]+"   className="form-control" />
            </div>
        </div>
        <div className='button-options-list d-flex flex-row gap-3' >
            <button className="button-options">Accept</button>
            <button className="button-options" onClick={onCancel} >Cancel</button> 
        </div>
        
</form>
    )
}






export default AdminBrandOptionsComponent