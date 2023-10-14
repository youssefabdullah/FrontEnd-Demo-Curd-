// src/components/App.js
import React, { useEffect, useState } from 'react';
import EmployeeForm from './component/EmployeeForm';
import BranchForm from './component/BranchForm';
import './App.css'
import axios from 'axios';
import Dialog from './component/Dialog';

function App() {
  const [employees, setEmployees] = useState([]);
  const [existingEmployee, setbranchList] = useState({
    id: 0,
    name: '',
    nationalId: '',
    age: 0,
    branch: {
      id: 0,
      name: ''
    }
  })
  const [openDialog, setopenDialog] = useState(false)


  const handel_Change_Dialog = (open) => {
    setopenDialog(open)
  }

  useEffect(() => {
    axios.get('http://localhost:8080/employees/')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('There was a problem with the Axios request:', error);
      });
  }, [employees]);
  return (
    <div>
      {openDialog ? (
        <>
          <Dialog existingEmployee={existingEmployee} handel_Change_Dialog={handel_Change_Dialog}/>
        </>) : (<>

          {/* Add Employees and Branch */}
          < div className='home'>
            <EmployeeForm />
            <BranchForm />
          </div>

          {/* Get Data and display */}
          <div>
            <h2>Employees:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>National Id</th>
                  <th>Branch id</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((item) => (
                  <tr key={item.id}>
                    <td style={{ textAlign: 'center' }}>{item.id}</td>
                    <td style={{ textAlign: 'center' }}>{item.name}</td>
                    <td style={{ textAlign: 'center' }}>{item.age}</td>
                    <td style={{ textAlign: 'center' }}>{item.nationalId}</td>
                    <td style={{ textAlign: 'center' }}>{item.branch.id}</td>
                    <td style={{ textAlign: 'center' }}><button className="btn-submit" onClick={e => {

                      setopenDialog(true);
                      setbranchList({
                        id: item.id,
                        name: item.name,
                        nationalId: item.nationalId,
                        age: item.age,
                        branch: item.branch
                      })
                    }}>Update</button></td>
                    <td style={{ textAlign: 'center' }}><button className="btn-submit" style={{ background: '#ff0000' }} onClick={e => axios.delete('http://localhost:8080/employees/' + item.id)}>x</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>)}
    </div >
  );
}
// axios.put('http://localhost:8080/employees/' + item.id)
export default App;
