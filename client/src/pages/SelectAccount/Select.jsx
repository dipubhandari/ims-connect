import { Link } from 'react-router-dom'
import React from 'react'
import Header from '../../components/Header/Header'
import './Select.css'
import { FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineWork } from 'react-icons/md'
import { FcIdea } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { account } from '../../redux/accountSelectSlice';

const Select = () => {

    const dispatch = useDispatch()
    //  putting what account selected by in user in a redux store
    function handleClick(clickedOn){
        console.log(`you select ${clickedOn} account`);
       dispatch(account(clickedOn))
       localStorage.setItem('accountSelected',clickedOn)
       console.log(localStorage.getItem('accountSelected'));
    }
    
    return (
        <>
            
            <div className='select_account_container'>
                <section className="select_title">
                    <h1>Create account as a...</h1>
                </section>
                <section className="select_jobseeker" onClick={()=>{handleClick('ideator')}}>
                    <Link to='/create-new-user' className='new_link' ><FcIdea /> Ideator</Link>
                </section>
                <section className="employer" onClick={()=>{handleClick('voter')}}>
                    <Link to='/create-new-user' className='new_link'><FaStarHalfAlt /> Voter</Link>
                </section>
               
              

            </div>
        </>
    )
}

export default Select
