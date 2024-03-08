import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => {
                setStudents(res.data);
                setFilteredStudents(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/delete/${id}`);
            window.location.reload(); // Reload the page to reflect changes
        } catch (err) {
            console.log(err);
        }
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchValue) ||
            student.email.toLowerCase().includes(searchValue) ||
            student.fatherName.toLowerCase().includes(searchValue) ||
            student.motherName.toLowerCase().includes(searchValue) ||
            student.homeAddress.toLowerCase().includes(searchValue) ||
            student.registrationDate.toLowerCase().includes(searchValue)
        );
        setFilteredStudents(filtered);
    };

    return (
        <div className='d-flex vh-100 bg-primary'>
            <div className='w-100 bg-white rounded p-3' style={{ overflowY: 'auto' }}>
                <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', padding: '10px', zIndex: 999 }}>
                    <Link to="/create" className='btn btn-success mb-3'>Add +</Link>
                    <input type="text" placeholder="Search" className="form-control mb-3" onChange={handleSearch} />
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Father's Name</th>
                            <th>Mother's Name</th>
                            <th>Age</th>
                            <th>Home Address</th>
                            <th>Registration Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => (
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

export default Student;
