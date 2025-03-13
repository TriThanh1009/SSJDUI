
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { CategoryOptionsModel } from '../../../../../Model/Category/CategoryOptionsModel';
import { editCategory, createCategory } from '../../../../../Responsitories/CategoryResponsitory';


interface Props {
    onCancel: () => void; // Định nghĩa prop onCancel
    selectedID : string
  }
const AdminCategoryOptionsComponent:React.FC<Props> = ({onCancel,selectedID})=>{
    const [category, setcagory] = useState<CategoryOptionsModel>()
    const [error, seterror] = useState<CategoryOptionsModel>();
    const handlechange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        let errorMsg = ""
        if(name === "name"){
            if (/[^A-Za-zÀ-ỹ\s]/.test(value)) {
                errorMsg = "Họ và tên chỉ được chứa chữ cái và khoảng trắng!";
              }
        }
        if(selectedID){
            setcagory(prev=>({
                ...prev,
                id:selectedID
            }))
        }
        setcagory((prev)=>({
            ...prev,
            [name]:value
        }))
        seterror({...error,[name] : errorMsg})
    }
    
    const handlesubmit = async (e: React.FormEvent)=>{
        e.preventDefault()
        try{
            if(selectedID) 
                await editCategory(category)
            await createCategory(category)
        } catch(error) {
            alert('Error')
        }
    }



    return(
    <form className="form" onSubmit={handlesubmit} >
        <div className="form-group row">
            <div className="col-sm-10">
            <label className="col-sm-5 col-form-label"> ID </label>
            {selectedID && <input type="text" id="id" value={selectedID} onChange={handlechange}  className="form-control" /> }
            {!selectedID && <input type="text" id="id" onChange={handlechange}  className="form-control" /> }
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">Name</label>
            <div className="col-sm-10">
                <input type="text" id="name"  name="name" onChange={handlechange}  pattern="[a-zA-Z ]+"   className="form-control" />
                {error?.name && <p style={{ color: "red" }}>{error?.name}</p>}
            </div>
        </div>
        <div className='button-options-list d-flex flex-row gap-3' >
            <button className="button-options">Accept</button>
            <button className="button-options" onClick={onCancel} >Cancel</button> 
        </div>
        
</form>
    )
}






export default AdminCategoryOptionsComponent