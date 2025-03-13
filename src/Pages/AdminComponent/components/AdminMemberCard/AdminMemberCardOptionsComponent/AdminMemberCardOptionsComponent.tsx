/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { MemberCardOptionsModel } from '../../../../../Model/MemberCard/MemberCardOptionsModel';
import { editMemberCard, createMemberCard } from '../../../../../Responsitories/MemberCardResponsitory';


interface Props {
    onCancel: () => void; // Định nghĩa prop onCancel
    selectedID : string
  }

const AdminMemberCardOptionsComponent:React.FC<Props> = ({onCancel,selectedID}) =>{
    const [membercard, setmembercard] = useState<MemberCardOptionsModel>()
    const handlechange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        if(selectedID){
            setmembercard(prev=>({
                ...prev,
                id:selectedID
            }))
        }
        setmembercard((prev)=>({
            ...prev,
            [name]:value,
        }))
    }

    const handlesubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        try{
            if(selectedID) 
                await editMemberCard(membercard)
            await createMemberCard(membercard)
        } catch (error) {
            alert('Error');
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
                <label className="col-sm-5 col-form-label">Point</label>
                <div className="col-sm-10">
                    <input type="text" id="point"  name="point" onChange={handlechange}  pattern="[a-zA-Z ]+"   className="form-control" />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-5 col-form-label">Class</label>
                <div className="col-sm-10">
                    <input type="text" id="memberClass"  name="memberClass" onChange={handlechange}  pattern="[a-zA-Z ]+"   className="form-control" />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-5 col-form-label">Discount</label>
                <div className="col-sm-10">
                    <input type="text" id="discount"  name="discount" onChange={handlechange}  pattern="[a-zA-Z ]+"   className="form-control" />
                </div>
            </div>
            <div className='button-options-list d-flex flex-row gap-3' >
                <button className="button-options">Accept</button>
                <button className="button-options" onClick={onCancel} >Cancel</button> 
            </div>
            
    </form>
    )
}



export default AdminMemberCardOptionsComponent