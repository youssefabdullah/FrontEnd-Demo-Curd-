import axios from 'axios';
import React, { useState } from 'react'

export default function Dialog({ existingEmployee, handel_Change_Dialog }) {

    const [textError, settextErorr] = useState('')
    const [error, setErorr] = useState(false)
    const [employeeData, setEmployeeData] = useState({
        name: existingEmployee.name,
        nationalId: existingEmployee.nationalId,
        age: existingEmployee.age,
        branch: existingEmployee.branch
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            if (employeeData.name == '') {
                settextErorr('Please Enter Name Arabic')
                setErorr(true)
            } else if (employeeData.nationalId == '') {
                settextErorr('Please Enter national Id')
                setErorr(true)
            }
            else if (employeeData.age == 0) {
                settextErorr('Please Enter Age')
                setErorr(true)
            }//  else if (text == '-') {
            //     settextErorr('Please Enter Branch Name')
            //     setErorr(true)
            // } 
            else {
                const response = await axios.put('http://localhost:8080/employees/' + existingEmployee.id, employeeData);
                console.log('Employee added:', response.data);
                handel_Change_Dialog(false)
            }
        } catch (error) {

            console.error('Error adding employee:', error);
            if (error.response.status === 400) {
                settextErorr(error.response.data)
                setErorr(true)

            }
        }


    };

    return (
        <div className="employee-form">
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={employeeData.name}
                        onChange={(e) =>
                            setEmployeeData({ ...employeeData, name: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>National ID:</label>
                    <input
                        type="text"
                        value={existingEmployee.nationalId}
                        onChange={(e) =>
                            setEmployeeData({ ...employeeData, nationalId: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input
                        type="number"
                        value={existingEmployee.age}
                        onChange={(e) =>
                            setEmployeeData({ ...employeeData, age: e.target.value })
                        }
                    />
                </div>
                {/* <div className="form-group">
                    <label>Branch ID:</label>

                    <select
                        value={text}
                        onChange={(e) => {
                            var newBranch = branchList.find((branch) => branch.id == e.target.value);

                            setEmployeeData({ ...employeeData, branch: newBranch });
                            setText(e.target.value)

                        }}
                        style={{
                            fontSize: '16px',
                            padding: '10px',
                            borderRadius: '4px',
                            width: '100%',
                            borderColor: '#ccc'
                        }}
                    >
                        <option value='-'>
                            -
                        </option>
                        {branchList.map((branch, index) => (
                            <option n key={index} value={branch.id}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                </div> */}
                <button type="submit" className="btn-submit" >Update Employee</button>
            </form>
            {error ? <div className="error-message">{textError}</div> : null}
        </div>
    )
}
