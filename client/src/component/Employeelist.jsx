import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

function Employeelist({ setempId, changepage }) {
    const [employees, setEmployees] = useState([])
    const [records, setRecords] = useState([])
    const [search,setSearch]= useState('')
    useEffect(() => {
        fetch("/all-employeees", {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {

            if (data) {

                setEmployees(data)
                setRecords(data)
            }

        })

    }, [])
    useEffect(() => {
        const result = employees.filter(employee => {
            return employee.f_Name.toLowerCase().match(search.toLowerCase())
                || employee.f_Email.toLowerCase().match(search.toLowerCase())
                || employee.f_Designation.toLowerCase().match(search.toLowerCase())
                || employee.f_Gender.toLowerCase().match(search.toLowerCase())
                || employee.f_Createdate.toLowerCase().match(search.toLowerCase())
                || employee.f_Course.toLowerCase().match(search.toLowerCase())

        })
        console.log(result);
        setRecords(result)
    }, [search])
    
    const handleDelete = (e)=> {
        fetch("/delete-employees/"+e.target.value, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {

            if (data.status) {
                fetch("/all-employeees", {
                    method:'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json()).then(data => {

                    if (data) {
                        setRecords(data)
                        setEmployees(data)
                    }

                })
                
            }

        })
    }
    
    const handleEdit = (e) => {
        
        changepage('editemp');
        setempId(e.target.value)
    }
    const columns = [
        {
            name: 'UnIque id',
            selector: row => row._id,
            sortable :true

        },
        {
            name: 'Image',
            selector: (row) => <img width={50} height={50} src={'http://localhost:5000/'+row.f_Image} />

        },
        {
            name: 'Name',
            selector: row => row.f_Name,
            sortable: true

        },
        {
            name: 'Email',
            selector: row => row.f_Email,
            sortable: true

        },
        {
            name: 'Mobile No',
            selector: row => row.f_Mobile

        },
        {
            name: 'Designation',
            selector: row => row.f_Designation

        },
        {
            name: 'gender',
            selector: row => row.f_Gender

        },
        {
            name: 'Course',
            selector: row => row.f_Course

        },
        {
            name: 'Create date',
            selector: row => row.f_Createdate,
            sortable: true

        },
        {
            name: 'Action',
            cell: (row) => <div><button value={row._id} style={{ color: 'orange' }} onClick={(e) => { handleEdit(e) }}>edit </button> <button value={row._id} style={{ color: 'red' }} onClick={(e) => { handleDelete(e) }}>delete</button></div>

        }
    ]
    return (
        <div>
            <h2 style={{ backgroundColor: 'yellow', margin: '0' }}>Employee List</h2>
            <h2 style={{ textAlign: 'right', fontWeight: "normal", margin: '0' }}>Total Count: {records.length}            <button style={{ backgroundColor: 'green', margin: '0 50px 0', border: "none", width: '20%', height: '30px', fontSize: "25px", color: '#fff' }} onClick={() => { changepage('addemp') }}>Create Employee</button></h2>
            <h2 style={{textAlign:'right',padding:'10px'}}>Search <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}}/></h2>
            <DataTable
                columns={columns}
                data={records}
            
            />
           
        </div>
    )
}

export default Employeelist
