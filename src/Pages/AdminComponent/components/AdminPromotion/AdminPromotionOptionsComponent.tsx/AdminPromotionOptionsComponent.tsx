/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {  useState } from 'react';
import { PromotionOptionsModel } from '../../../../../Model/Promotion/PromotionOptionsModel';
import { editPromotion, createPromotion } from '../../../../../Responsitories/PromotionResponsitory';

interface Props {
    onCancel: () => void; // Định nghĩa prop onCancel
    selectedId: string;
  }
const AdminPromotionOptionsComponent:React.FC<Props> = ({onCancel, selectedId})=>{
    const [promotion, setpromotions] = useState<PromotionOptionsModel>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (selectedId) {
            setpromotions(prev => ({
                ...prev,
                id: selectedId,
            }));
        }
        setpromotions((prev) => ({
            ...prev,
            [name]: value,
        }));
        
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            // Use conditional logic to decide whether to create or edit
            if (selectedId) {
                await editPromotion(promotion);
                alert('Edit Success!');
            } else {
                await createPromotion(promotion);
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
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">Create Date</label>
            <div className="col-sm-10">
                <input type="text" id="createDate"   name="createDate" onChange={handleChange}   className="form-control" />

            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">End Date</label>
            <div className="col-sm-10">
                <input type="text" id="endDate"   name="endDate"  onChange={handleChange}   className="form-control" />

            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">Discount Percent</label>
            <div className="col-sm-10">
                <input type="text" id="percentDiscount"   name="percentDiscount"  onChange={handleChange}  className="form-control" />

            </div>
        </div>
        <div className='button-options-list d-flex flex-row gap-3' >
            <button type='submit' className="button-options">Accept</button>
            <button className="button-options" onClick={onCancel} >Cancel</button> 
        </div>
        
</form>
    )
}






export default AdminPromotionOptionsComponent