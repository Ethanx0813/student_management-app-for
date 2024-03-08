import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setStudents(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/delete/${id}`);
            setStudents(students.filter(student => student.ID !== id)); // Update local state after deletion
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Father's Name</th>
                            <th>Mother's Name</th>
                            <th>Age</th>
                            <th>Home Address</th>
                            <th>Registration Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.fatherName}</td>
                                <td>{student.motherName}</td>
                                <td>{student.age}</td>
                                <td>{student.homeAddress}</td>
                                <td>{student.registrationDate}</td>
                                <td>
                                    <Link to={`/update/${student.ID}`} className='btn btn-primary me-2'>Update</Link>
                                    <button className='btn btn-danger ms-2' onClick={() => handleDelete(student.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StudentList;
