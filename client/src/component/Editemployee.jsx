import React, { useEffect, useState } from 'react'

function Editemployee({ changepage, empId }) {
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

    useEffect(() => {

        fetch("/get-employeee/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: empId })

        }).then(res => res.json()).then(data => {

            if (data) {
                setName(data.f_Name)
                setEmail(data.f_Email)
                setMobile(data.f_Mobile)
                setDesignation(data.f_Designation)
                setGender(data.f_Gender)
                setCourse(data.f_Course)


            }

        })
    }, [])




    const validate = () => {
        console.log('validate');
        const patternemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const numberPattern = /^[0-9]+$/;
        if (!patternemail.test(email)) {
            setValemail('enter a valid email')

        }
        if (!numberPattern.test(mobile)) {
            setValnumber("enter a valid mobile number!")
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
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {


            const formData = new FormData()
            formData.append('id', empId)
            formData.append('name', name)
            formData.append('email', email);
            formData.append('mobile', mobile);
            formData.append('gender', gender);
            formData.append('designation', designation);
            formData.append('course', course);
            formData.append('image', image)


            fetch("/edit-employee", {
                method: "POST",

                body: formData
            }).then(res => res.json()).then(data => {

                if (data.status) {

                    changepage('emplist');
                } else {
                   setValidateemaildup(data.massage)
                }

            })

        } else {
           
        }


    }

    return (
        <div>
            <h2 style={{ backgroundColor: 'yellow', margin: '0' }}>Edit Employee</h2>

            <form onSubmit={(e) => { handleEditSubmit(e) }} action="" style={{ width: '20%', margin: '30px' }}>
                <div >
                    <label >Name:</label><br />
                    <input
                        style={{ width: '100%' }}
                        type="text"

                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        required
                    />

                </div>
                <div >
                    <label >Email:</label><br />
                    <input
                        style={{ width: '100%' }}
                        type="text"
                        value={email}


                        onChange={(e) => { setEmail(e.target.value) }}
                        required
                    />
                    <span style={{ color: 'red' }}>{valemail}</span>
                </div>
                <div >
                    <label >Mobile no:</label><br />
                    <input
                        style={{ width: '100%', }}
                        type="text"
                        value={mobile}


                        onChange={(e) => { setMobile(e.target.value) }}
                        required
                    />
                </div>
                <span style={{ color: 'red' }}>{valnumber}</span>

                <div >
                    <label >Designation:</label><br />
                    <select
                        style={{ width: '100%' }}
                        type="text"

                        value={designation}
                        onChange={(e) => { setDesignation(e.target.value) }}
                        required
                    >
                        <option value="" >select</option>
                        <option value="HR" >HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales" >Sales</option>
                    </select>
                </div>
                <div >
                    <label  >Gender:</label><br />
                    <input

                        type="radio"
                        id="gender"
                        name='gender'

                        onClick={() => { setGender('Male') }}
                        checked={gender === 'Male' ? true : false}

                        required

                    />Male
                    <input type="radio"
                        id="gender"
                        name='gender'

                        onClick={() => { setGender('Female') }}
                        checked={gender === 'Female' ? true : false}
                        required
                    />Female
                </div>
                <div >
                    <label htmlFor="username">Course:</label><br />
                    <input

                        type="checkbox"
                        value='BCA'
                        checked={course === 'BCA' ? true : false}
                        onChange={(e) => { handleCheckBox(e) }}


                    />BCA
                    <input type="checkbox"
                        value='MCA'
                        checked={course === 'MCA' ? true : false}
                        onChange={(e) => { handleCheckBox(e) }}

                    />MCA
                    <input type="checkbox"
                        value='BSC'
                        checked={course === 'BSC' ? true : false}
                        onChange={(e) => { handleCheckBox(e) }}

                    />BSC
                </div>
                <div >
                    <label >Image:</label><br />
                    <input
                        style={{ width: '100%' }}
                        type="file"
                        id="file"
                        onChange={(e) => {
                            setImage(e.target.files[0])
                        }}
                        required
                    />
                    <span style={{ color: 'red' }}>{validateimage}</span>
                    <span style={{ color: 'red' }}>{validateemaildup}</span>
                </div>
                <div>
                    <input type="submit" value={'Update'} />
                </div>

            </form>
        </div>
    )
}

export default Editemployee
