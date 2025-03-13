/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import './AdminAccountOptionsComponent.css'
import { AccountCreateModel } from '../../../../../Model/Account/AccountCreateModel';
import { createAccount, editAccount } from '../../../../../Responsitories/AccountResponsitory';
interface Props {
    onCancel: () => void; // Định nghĩa prop onCancel
    selectedItemId: string;
  }
const AdminAccountOptionsComponent:React.FC<Props> = ({onCancel, selectedItemId})=>{
    const [accounts, setAccounts] = useState<AccountCreateModel>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (selectedItemId) {
            setAccounts(prev => ({
                ...prev,
                id: selectedItemId,
                [name]: value,
            }));
        }
        setAccounts((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(accounts)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            // Use conditional logic to decide whether to create or edit
            if (selectedItemId) {
                await editAccount(accounts);
                alert('Edit Success!');
            } else {
                await createAccount(accounts);
                alert('Create Success!');
            }
            //window.location.reload();  // Reload after success
        } catch (error) {
            alert('Error');
        }
    };
    


    return(
    <form className="form" >
        <div className="form-group row" >
            <label className="col-sm-5 col-form-label">ID</label>
            <div className="col-sm-10">
                {selectedItemId && <input type="text" id="id"  name="id" value={selectedItemId}   onChange={handleChange}  className="form-control" />}
                {!selectedItemId && <input type="text" id="id"  name="id" onChange={handleChange}  className="form-control" />}
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">User Name</label>
            <div className="col-sm-10">
                <input type="text" id="userName"  name="userName"  onChange={handleChange}   pattern="[a-zA-Z ]+"   className="form-control" />
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">Password</label>
            <div className="col-sm-10">
                <input type="text" id="password"   name="password" onChange={handleChange}   className="form-control" />

            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">Password Check</label>
            <div className="col-sm-10">
                <input type="text" id="passwordCheck"   name="passwordCheck"  onChange={handleChange}   className="form-control" />

            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-5 col-form-label">Email</label>
            <div className="col-sm-10">
                <input type="text" id="email"   name="email"  onChange={handleChange}  className="form-control" />

            </div>
        </div>
        <div className='button-options-list d-flex flex-row gap-3' >
            <button onSubmit={handleSubmit} type='submit' className="button-options">Accept</button>
            <button className="button-options" onClick={onCancel} >Cancel</button> 
        </div>
        
</form>
    )
}






export default AdminAccountOptionsComponent