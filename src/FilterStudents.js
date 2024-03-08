import React, { useState } from 'react';

function FilterStudents({ filterStudents }) {
    const [filters, setFilters] = useState({
        name: '',
        registrationDate: '',
        homeCity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        filterStudents(filters);
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#fff', padding: '10px', zIndex: 999 }}>
            <h2>Filter Students</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <div style={{ flex: '1', marginRight: '10px' }}>
                        <label>Name:</label>
                        <input type="text" name="name" value={filters.name} onChange={handleChange} style={{ width: '100%' }} />
                    </div>
                    <div style={{ flex: '1', marginRight: '10px' }}>
                        <label>Registration Date:</label>
                        <input type="text" name="registrationDate" value={filters.registrationDate} onChange={handleChange} style={{ width: '100%' }} />
                    </div>
                    <div style={{ flex: '1' }}>
                        <label>Home City:</label>
                        <input type="text" name="homeCity" value={filters.homeCity} onChange={handleChange} style={{ width: '100%' }} />
                    </div>
                </div>
                <button type="submit" style={{ width: '100%' }}>Apply Filters</button>
            </form>
        </div>
    );
}

export default FilterStudents;
