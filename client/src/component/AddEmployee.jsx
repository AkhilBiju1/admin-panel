import React, { useState } from 'react'

function AddEmployee({changepage}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [designation, setDesignation] = useState('')
    const [gender, setGender] = useState('')
    const [course, setCourse] = useState('')
    const [image, setImage] = useState(null)
    const [valemail, setValemail] = useState('')
    const [valnumber, setValnumber] = useState('')
    const [validateimage, setValidateimage] = useState('')
    const [validateemaildup, setValidateemaildup] = useState('')

    const validate = () => {
        console.log('validate');
        const patternemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const numberPattern = /^[0-9]+$/;
        if (!patternemail.test(email)) {
           setValemail('enter a valid email')
            
        }
        if (!numberPattern.test(mobile)) {
            setValnumber( "enter a valid mobile number!")
        }
        if (image.type === "image/png" || image.type === "image/jpeg") {
            setValidateimage('')
        } else {
            setValidateimage('image must be jpg or png')   
        }
        if (!patternemail.test(email) || !numberPattern.test(mobile)) {
            return false
        } else {
            if (image.type === "image/png" || image.type === "image/jpeg") {

                return true
            } 
                return false
            
        }

        
    }
    const handleCheckBox = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCourse(value)
            
        } else {
            setCourse("")

        }
        
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            
           
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email);
            formData.append('mobile', mobile);
            formData.append('gender', gender);
            formData.append('designation', designation);
            formData.append('course', course);
            formData.append('image', image)

            for (var [key, value] of formData.entries()) {
                console.log(value);
            }
            fetch("/add-employeee", {
                method: "POST",
               
                body: formData
            }).then(res => res.json()).then( data => {

               if (data.status) {
                    
                   changepage('emplist');
               } else {
                    setValidateemaildup(data.massage)
               }

            })

        }


    }
    
    return (
        <div>
            <h2 style={{ backgroundColor: 'yellow', margin: '0' }}>Create Employee</h2>

            <form onSubmit={(e)=>{handleSubmit(e)}} action="" style={{width:'20%', margin:'30px'}}>
                <div >
                    <label >Name:</label><br />
                    <input
                        style={{ width: '100%' }}
                        type="text"
                       
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                        required
                    />
                    
                </div>
                <div >
                    <label >Email:</label><br />
                    <input
                        style={{ width: '100%' }}
                        type="text"
                        value={email}
                       
                        
                        onChange={(e) => { setEmail(e.target.value)}}
                        required
                    />
                    <span style={{color: 'red'}}>{valemail}</span>
                </div>
                <div >
                    <label >Mobile no:</label><br />
                    <input
                        style={{ width: '100%',  }}
                        type="text"
                        value={mobile}
                        
                        
                        onChange={(e) => {setMobile(e.target.value)}}
                        required
                    />
                </div>
                <span style={{ color: 'red' }}>{valnumber}</span>

                <div >
                    <label >Designation:</label><br />
                    <select
                        style={{ width: '100%' }}
                        type="text"
                       
                        
                        onChange={(e) => {setDesignation(e.target.value)}}
                        required
                    >
                        <option value="" >select</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div >
                    <label  >Gender:</label><br />
                    <input
                        
                        type="radio"
                        id="gender"
                        name='gender'
                        
                        onClick={() => {setGender('Male') }}
                        required
                        
                    />Male
                    <input  type="radio"
                        id="gender"
                        name='gender'
                        onClick={() => {setGender('Female') }}
                        required
                         />Female
                </div>
                <div >
                    <label htmlFor="username">Course:</label><br />
                    <input

                        type="checkbox"
                        value='BCA'
                        checked={course ==='BCA'? true :false}
                        onChange={(e) => {handleCheckBox(e) }}
                        

                    />BCA
                    <input type="checkbox"
                        value='MCA'
                        checked={course === 'MCA' ? true : false}
                        onChange={(e) => {handleCheckBox(e) }}
                        
                    />MCA
                    <input type="checkbox"
                        value='BSC'
                        checked={course === 'BSC' ? true : false}
                        onChange={(e) => {handleCheckBox(e) }}
                        
                    />BSC
                </div>
                <div >
                    <label >Image:</label><br />
                    <input 
                        style={{ width: '100%' }}
                        type="file"
                        id="file"
                        onChange={(e) => {setImage(e.target.files[0]) 
                        }}
                        required
                    />
                    <span style={{ color: 'red' }}>{validateimage}</span>

                    <span style={{ color: 'red' }}>{validateemaildup}</span>
                </div>
                <div>
                    

                    <input type="submit" value={'Submit'} />
                </div>
                
            </form>
        </div>
    )
}

export default AddEmployee
