import axios from 'axios'; import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './PostIdea.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { server } from '../../config';
import Category from '../../utils/category'
import { useNavigate } from 'react-router-dom';

const PostIdea = () => {

    const [token, setToken] = useState('')
    const [Feature, setFeature] = useState([])
    const navigate = useNavigate();
    // state for input for idea post of the form
    const [input, setInput] = useState({
       ideator : localStorage.getItem('token')
    })

    useEffect(()=>{
        const currentUser = localStorage.getItem('token')
        

    })
    // handle input from fields
    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
       // handle form for idea
    async function handleForm(e) {
        e.preventDefault()
        // validating the fields
        if (!(input.ideaTitle && input.ideaCategory && input.idea)) {
            toast.warn('Enter all the fields...')
        }
        else if (input.idea.length < 100) {
            toast.warn('Your Idea Must Contain at least 100 characters')
        }
        else {
            //  sending post request to the database
            await axios.post(`${server}/post-idea`, input).then(response => {
                if (response.data.success) {
                    setInput({})
                    navigate('/')
                    toast.success('You Posted Idea Successfully');
                }
            })
        }
    }
  
    return (
        <>
            <ToastContainer />
            <div className='post_container'>

                <section className="formx">
                    <h4 style={{margin:'auto'}}>Post A Idea</h4>
                    <hr />
                    <form encType='multipart/form-data' onSubmit={handleForm} action="" className='login_form'>
                        <span className=" ideaTitle">
                            <span className="ideaTitle">
                                <label htmlFor="">Idea Title * </label>
                                <input
                                    type="text"
                                    onChange={handleInput}
                                    name='ideaTitle'
                                    value={input.ideaTitle || ''}
                                    placeholder=' Enter the Idea Title'
                                />
                            </span>
                        </span>
                         <section className="category_section">
                            <label htmlFor="">Select Idea Category</label>
                            <select name='ideaCategory' id='' onChange={handleInput}>
                            <option value="" style={{backgroundColor:'blue',color:"white"}}>Select Category of your idea</option>
                                {
                                    Category.map((item, id) => {
                                        return <option value={`${item.category}`}>{item.category}</option>
                                    })
                                }
                                   </select>
                        </section>
                        <br />
                        <textarea name="idea" className='description_post' id="" cols="10" placeholder='What is your idea?' rows="2" value={input.idea || ''}
                            onChange={handleInput}></textarea>
                                            <input
                            type='submit'
                            value='Post Idea' className='create_btn'
                        />
                    </form>
                </section>
            </div>
        </>
    )
}

export default PostIdea
