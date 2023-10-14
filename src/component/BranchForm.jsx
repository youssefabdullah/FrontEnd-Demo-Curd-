// src/components/BranchForm.js
import axios from 'axios';
import React, { useState } from 'react';

function BranchForm() {

    const [error, setErorr] = useState(false)
    const [textError, settextErorr] = useState('')
    const [branchData, setBranchData] = useState({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can also reset the form here if needed.

        try {
            const response = axios.post('http://localhost:8080/branchs/', branchData);
            console.log('Employee added:', response.data);
            // You can reset the form here if needed.
        } catch (error) {

            console.error('Error adding employee:', error);
            if (error.response.status === 400) {
                settextErorr(error.response.data)
                setErorr(true)
            }
        }
        setBranchData({
            name: '',
        })
    };

    return (
        <div className="employee-form">
            <h2>Add Branch</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={branchData.name}
                        onChange={(e) =>
                            setBranchData({ ...branchData, name: e.target.value })
                        }
                    />
                </div>
                <button type="submit" className="btn-submit">Add Branch</button>
            </form>
            {error ? <div className="error-message">{textError}</div> : null}
        </div>
    );
}

export default BranchForm;
