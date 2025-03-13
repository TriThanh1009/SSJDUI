/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { UnitShipOptionsModel } from '../../../../../Model/UnitShip/UnitShipOptionsModel';
import { editPromotion, createPromotion } from '../../../../../Responsitories/PromotionResponsitory';

interface Props {
    onCancel: () => void; // Định nghĩa prop onCancel
    selectedId: string;
  }
const AdminUserOptionsComponent:React.FC<Props> = ({onCancel, selectedId})=>{
    const [unitship, setunitship] = useState<UnitShipOptionsModel>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (selectedId) {
            setunitship(prev => ({
                ...prev,
                id: selectedId,
            }));
        }
        setunitship((prev) => ({
            ...prev,
            [name]: value,
        }));
        
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            // Use conditional logic to decide whether to create or edit
            if (selectedId) {
                await editPromotion(unitship);
                alert('Edit Success!');
            } else {
                await createPromotion(unitship);
                alert('Create Success!');
            }
            window.location.reload();  // Reload after success
        } catch (error) {
            alert('Error');
        }
    };
    


    return(
    <form className="form" onSubmit={handleSubmit} >
        <div className="form-group row" >
            <label className="col-sm-5 col-form-label">ID</label>
            <div className="col-sm-10">
                {selectedId && <input type="text" id="id"  name="id" value={selectedId}   onChange={handleChange}  className="form-control" />}
                {!selectedId && <input type="text" id="id"  name="id" onChange={handleChange}  className="form-control" />}
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">Name</label>
            <div className="col-sm-10">
                <input type="text" id="name"  name="name"  onChange={handleChange}   pattern="[a-zA-Z ]+"   className="form-control" />
            </div>
        </div>
        <div className='button-options-list d-flex flex-row gap-3' >
            <button type='submit' className="button-options">Accept</button>
            <button className="button-options" onClick={onCancel} >Cancel</button> 
        </div>
        
</form>
    )
}






export default AdminUserOptionsComponent