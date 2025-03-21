/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {  useState } from 'react';
import { UnitShipOptionsModel } from '../../../../../Model/UnitShip/UnitShipOptionsModel';
import { editPromotion, createPromotion } from '../../../../../Responsitories/PromotionResponsitory';

interface Props {
    onCancel: () => void; // Định nghĩa prop onCancel
    selectedID: string;
  }
const AdminUnitShipOptionsComponent:React.FC<Props> = ({onCancel, selectedID})=>{
    const [unitship, setunitship] = useState<UnitShipOptionsModel>();
    const [error, seterror] = useState<UnitShipOptionsModel>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let errorMsg = ""
        if(name === "name"){
            if (/[^A-Za-zÀ-ỹ\s]/.test(value)) {
                errorMsg = "Tên đơn vị vẩn chuyển chỉ được chứa chữ cái và khoảng trắng!";
              }
        }

        if (selectedID) {
            setunitship(prev => ({
                ...prev,
                id: selectedID,
            }));
        }
        setunitship((prev) => ({
            ...prev,
            id : "1",
            [name]: value,
        }));
        seterror({...error,[name] : errorMsg})
        
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            // Use conditional logic to decide whether to create or edit
            if (selectedID) {
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
            <div className="col-sm-10">
            {selectedID && 
                <div>
                        <label className="col-sm-5 col-form-label"> ID </label>
                        <input type="text" id="id" value={selectedID} onChange={handleChange}  className="form-control" />
                </div>
            }
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">Name</label>
            <div className="col-sm-10">
                <input type="text" id="name"  name="name"  onChange={handleChange}   pattern="[a-zA-Z ]+"   className="form-control" />
                {error?.name && <p style={{ color: "red" }}>{error?.name}</p>}
            </div>
        </div>
        <div className='button-options-list d-flex flex-row gap-3' >
            <button type='submit' className="button-options">Accept</button>
            <button className="button-options" onClick={onCancel} >Cancel</button> 
        </div>
        
</form>
    )
}






export default AdminUnitShipOptionsComponent