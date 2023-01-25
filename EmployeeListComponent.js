import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class EmployeeListComponent extends Component {
  
  constructor(props){
    super(props);
    this.state={
        employees : [],
        message : null
    }
  }

  componentDidMount(){
    this.getAllEmployees();
  }

  getAllEmployees(){
    //make service call -> get data -> set data to state(employees)
    EmployeeService.getAllEmployees().then(response=>{
        this.setState({employees : response.data});
    });
  }
  
deleteEmployee(id){
    //console.log("Deleted clicked"+id);
    EmployeeService.deleteEmployee(id).then((response)=>{
        this.setState({message:response.data});
        this.getAllEmployees();
    });

}

    render() {
    return (
      <div>
      <h2>Employee List View</h2>
        <table className='table table-hover'>
            <thead>
                <tr className='bg-info text-white'>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>SAL</th>
                    <th>DEPT</th>
                    <th>OPERATION</th>
                </tr>
            </thead>
            <tbody>
            {
                this.state.employees.map((emp)=>(
                    <tr key={emp.empId}>
                    <td>{emp.empId}</td>
                    <td>{emp.empName}</td>
                    <td>{emp.empSal}</td>
                    <td>{emp.empDept}</td>
                    <td><button className='btn btn-danger' onClick={()=>this.deleteEmployee(emp.empId)}>Delete</button></td>
                </tr>
                ))
            }
            </tbody>
        </table>
        {
        this.state.message && (
            <div className='alert alert-success'>{this.state.message}</div>
        )
      }
      </div>
    )
  }
}

export default EmployeeListComponent
