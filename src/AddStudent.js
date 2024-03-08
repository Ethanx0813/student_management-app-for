import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStudent() {
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [age, setAge] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/create', { 
            Name: name, 
            FatherName: fatherName,
            MotherName: motherName,
            Age: age,
            HomeAddress: homeAddress,
            RegistrationDate: registrationDate
        })
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control'
                            onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Father's Name</label>
                        <input type="text" placeholder="Enter Father's Name" className='form-control'
                            onChange={e => setFatherName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Mother's Name</label>
                        <input type="text" placeholder="Enter Mother's Name" className='form-control'
                            onChange={e => setMotherName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Age</label>
                        <input type="number" placeholder='Enter Age' className='form-control'
                            onChange={e => setAge(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Home Address</label>
                        <input type="text" placeholder='Enter Home Address' className='form-control'
                            onChange={e => setHomeAddress(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Registration Date</label>
                        <input type="date" className='form-control'
                            onChange={e => setRegistrationDate(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;
