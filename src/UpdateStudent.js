// UpdateStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [age, setAge] = useState('');
    const [homeAddress, setHomeAddress] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/student/${id}`)
            .then(res => {
                const data = res.data;
                setName(data.name);
                setEmail(data.email);
                setFatherName(data.fatherName);
                setMotherName(data.motherName);
                setAge(data.age);
                setHomeAddress(data.homeAddress);
                setRegistrationDate(data.registrationDate);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, { 
            name: name, 
            email: email,
            fatherName: fatherName,
            motherName: motherName,
            age: age,
            homeAddress: homeAddress,
            registrationDate: registrationDate
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
                    <h2>Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Name</label>
                        <input type="text" className='form-control' value={name || ''}  
                            onChange={e => setName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Email</label>
                        <input type="email" className='form-control' value={email || ''}  
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Father's Name</label>
                        <input type="text" className='form-control' value={fatherName || ''}  
                            onChange={e => setFatherName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Mother's Name</label>
                        <input type="text" className='form-control' value={motherName || ''}  
                            onChange={e => setMotherName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Age</label>
                        <input type="text" className='form-control' value={age || ''}  
                            onChange={e => setAge(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Home Address</label>
                        <input type="text" className='form-control' value={homeAddress || ''}  
                            onChange={e => setHomeAddress(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Registration Date</label>
                        <input type="date" className='form-control' value={registrationDate || ''}  
                            onChange={e => setRegistrationDate(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;
