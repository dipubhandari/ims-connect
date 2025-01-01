import React, { useEffect, useState } from 'react'
import "./Admin.css"
import axios from 'axios'
import {server} from "../../config"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
 
    // state for the ideas
    const [ideas,setIdeas] = useState([])
        const location = useNavigate()

    async function handleIncentive(id){
         console.log(id);
         await axios.put(`${server}/provide-incentive`,{id}).then((response) => {
            if(response.data.success_msg){
                  toast.success(response.data.success_msg)
                  window.location.reload();
            }
            if(response.data.error_msg){
                toast.warn(response.data.error_msg)
          }
           }).catch((err) => {
            console.log(err);
           })
    }  
    async function handleDelete(id){
        await axios.post(`${server}/delete-idea`,{id}).then((response) => {
            if(response.data.success_msg){
                window.location.reload();
                  toast.success(response.data.success_msg)
            }
            if(response.data.error_msg){
                toast.success(response.data.error_msg)
          }
           }).catch((err) => {
            console.log(err);
           })
    }

    useEffect(()=>{
        // checking admin is logged in or not
        const userType = localStorage.getItem('currentAcccount')
        if(userType != 'admin'){
            setTimeout(() => {
                location('/login')
            }, 1000)
        }
//    getting ideas
async function getIdeas() {
    await axios.get(`${server}/all-ideas`).then((response) => {
     console.log(response);
     if(response.data){
        setIdeas(response.data)
     }
    }).catch((err) => {
     console.log(err);
    })
}
getIdeas()

    },[])
  return (
   <>
<div className="body">
    
<ToastContainer />
   
   <div classNameName="adminContainer">
   <main className="table" id="customers_table">
        <section className="table__header">
            <h1>All Ideas</h1>
            <div className="input-group">
                <input type="search" placeholder="Search Ideas..."/>
                <img src="images/search.png" alt=""/>
            </div>
            <div className="export__file">
                <input type="checkbox" id="export-file"/>
            </div>
        </section>
        <section className="table__body">
            <table>
                <thead>
                    <tr>
                        <th> Id <span className="icon-arrow"></span></th>
                        <th> Posted By <span className="icon-arrow"></span></th>
                        <th> Idea Title <span className="icon-arrow"></span></th>
                        <th> Idea Category <span className="icon-arrow"></span></th>
                        <th> Total Votes <span className="icon-arrow"></span></th>
                        <th> Action <span className="icon-arrow"></span></th>
                        <th> Provide Incentive <span className="icon-arrow"></span></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    ideas.map((item)=>{
                        return <>
                          <tr>
                        <td> 1 </td>
                        <td> {item.ideatorName}</td>
                        <td> {item.ideaTitle} </td>
                        <td> {item.ideaCategory} </td>
                        <td> {item.votedBy.length} </td>
                        <td>
                            <p className="status cancelled" onClick={()=>{handleDelete(item._id)}} style={{cursor:"pointer"}}>Delete</p>
                        </td>
                        <td>
                            {
                                (item.incentive)
                                ?
                                <p className="status warning " onClick={()=>{handleIncentive(item._id)}} style={{cursor:"pointer"}}>Remove Incentive</p>
                                :
                                <p className="status delivered" onClick={()=>{handleIncentive(item._id)}} style={{cursor:"pointer"}}>Provide Incentive</p>
                            }
                        </td>
                    </tr>
                        </>
                    })
                  }
                   
                </tbody>
            </table>
        </section>
    </main>
   </div>
</div>
   </>
  )
}

export default Admin
