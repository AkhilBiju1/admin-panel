import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let dataToSubmit = {

            Pass: password,
            username: username
        }
       
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSubmit)
        }).then(res => res.json()).then(async data => {

          
            if (data.user) {
                
                onLogin(data.user);
                
            } else {
               alert(data.massage)

            }

        })



            
       
    };

    return (
        <div>
            
            <h2 >Login Page</h2>
            <div style={{ width: '40%', margin: "0 auto ", display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div >
                        <label htmlFor="username">Username:</label><br />
                        <input
                            style={{ width: '100%' }}
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>

                        <label htmlFor="password">Password:</label><br />
                        <input style={{ width: '100%' }}
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button type="submit" style={{ backgroundColor: 'green', border: "none", width: '100%', height: '40px', fontSize: "25px", color: '#fff', marginTop: "15px" }}>Login</button>

                </form>
            </div>
        </div>
       
    );
};

export default Login;
