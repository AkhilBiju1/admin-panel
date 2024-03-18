
import React, { useState } from 'react';
import Login from './Login';
import Adminpanel from './component/Adminpanel';
import Employeelist from './component/Employeelist';
import AddEmployee from './component/AddEmployee';
import Editemployee from './component/Editemployee';
const App = () => {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('home')
  const [employeeID,setEmployeeId] = useState('')
  const handleLogin = (userData) => {
    setUser(userData);
  };

  

  return (
    <div>
      {user ? (<div>
          <header style={{backgroundColor: "lightblue"}}>
                <ul style={{margin:'0', listStyle:'none',display:'flex',justifyContent : "start", flexWrap:'wrap',width:'100wh'}}>
                    <li style={{marginLeft:'10%',width:'20%'}}>
                <h4 style={{ textAlign: 'left' }} onClick={()=>setPage('home')}>Home</h4>
                    </li>
              <li style={{ width: '20%' }}>
              <h4 onClick={() => { setPage('emplist') }} >Employee List</h4>
                    </li>
            <li style={{ width: '30%' }}><h4 style={{ textAlign: 'right' }}>{user.f_userName}</h4></li>
              <li style={{ width: '10%', }}><h4 style={{ textAlign: 'right' }} onClick={()=>{setUser(null)}}>Logout</h4></li>
                </ul>
          </header>
          {page === 'home' ? <Adminpanel /> : ''}
        {page === 'emplist' ? <Employeelist changepage={setPage} setempId={setEmployeeId} /> : ''}
        {page === 'addemp' ? <AddEmployee changepage={setPage}  /> : ''}
        {page === 'editemp' ? <Editemployee changepage={setPage} empId={employeeID} /> : ''}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
