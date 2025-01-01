import axios from 'axios'; import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Signup.css'
import { ToastContainer, toast } from 'react-toastify';
import { server } from '../../config'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const CreateAccount = () => {
    const selectedAccount = useState(localStorage.getItem('accountSelected'))
    const [input, setinput] = useState({})
    const [accountType, setAccountType] = useState(localStorage.getItem('accountSelected'))
    async function handleForm(e) {
        e.preventDefault()
        if (!(input.name && input.address && input.email && input.password && input.description && input.phone)) {
            toast.warn('Enter all the fields')
        }
        else if (input.phone.length < 10) {
            toast.warn('Enter correct Mobile')
        }
        else if (input.password.length < 8 || input.password.length > 16) {
            toast.warn('Password must between 8 to 16 character long')
        }
        else if (input.description.length < 50) {
            toast.warn('Description should at least 50 character long.')
        }
        else {
            const formData = new FormData()
            formData.append('userType', accountType)
            formData.append('qualification', input.qualification)
            formData.append('phone', input.phone)
            formData.append('name', input.name)
            formData.append('email', input.email)
            formData.append('address', input.address)
            formData.append('age', input.age)
            formData.append('password', input.password
            )
            formData.append('description', input.description)
            console.log(formData)
            await axios.post(`${server}/create-new-account`,
                formData
            ).then((result) => {
                if (result.data.error_msg) {
                    toast.warn(result.data.error_msg)
                }
                if (result.data.success) {
                    toast.success(result.data.success)
                    setinput({})
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    return (
        <>
           
            <ToastContainer />
            <div className='loginContainer'>
                <section className="form">
                    <h4>{(selectedAccount == 'ideator') ?" Create Ideator Account *" : "Create Voter Account *"}</h4>
                    <hr />
                    <form encType='multipart/form-data' onSubmit={handleForm} action="" className='login_form'>
                        <span className=" form_email">
                            <span className="form_fullname">
                                <label htmlFor="">Enter Full Name</label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    name='name'
                                    value={input.name || ''}
                                    required placeholder='Enter Full name'
                                />
                            </span>
                            </span>
                        <span className="form_email">
                            <span className='email'>
                                <span>Email*</span>
                                <input
                                    type="text"
                                    name='email'
                                    value={input.email || ''}
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    required placeholder='Enter email'
                                />
                            </span>
                            <span className='phone'>
                                <span>Phone*</span>
                                <input
                                    type="text"
                                    value={input.phone || ''}
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    name='phone'
                                    required placeholder='Enter Phone'
                                />
                            </span>
                        </span>
                        <span className="form_email">
                            <span className='email'>
                                <span>Qualification*</span>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    name='qualification'
                                    value={input.qualification || ''}
                                    required placeholder='Your Qualification'
                                />
                            </span>

                            <span className='phone'>
                                <span>Age*</span>
                                <input
                                    type="number"
                                    value={input.age || ''}
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    name='age'
                                    required placeholder='Enter Your Age'
                                />

                            </span>
                        </span>     <span className="form_email">
                            <span className='email'>
                                <span>Password*</span>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    name='password'
                                    value={input.password || ''}
                                    required placeholder='Choose Passowrd'
                                />
                            </span>

                            <span className='phone'>
                                <span>Address*</span>
                                <input
                                    type="text"
                                    value={input.address || ''}
                                    onChange={(e) =>
                                        setinput({ ...input, [e.target.name]: e.target.value })}
                                    name='address'
                                    required placeholder='Address (only Country)'
                                />

                            </span>
                        </span>
                        <br />
                        <textarea name="description" className='user_desc' id="" cols="10" required placeholder='Describe about ideator(experience, age, qualification etc. (less than 1000 words).' rows="10" value={input.description || ''}
                            onChange={(e) =>
                                setinput({ ...input, [e.target.name]: e.target.value })}></textarea>
                        <input
                            type='submit'
                            value='Create' className='create_btn'
                        />
                    </form>
                </section>
            </div>
        </>
    )
}
export default CreateAccount
