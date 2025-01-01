import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from '../../components/Header/Header'
import './IdeatorHome.css'
import { RxDashboard } from 'react-icons/rx'
import { MdOutlineWork } from 'react-icons/md'
import axios from 'axios'
import {server} from "../../config"
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from 'react-toastify';

const IdeatorHome = (props) => {
    const [component, setComponent] = useState('job')
       const [ideas,setIdeas] = useState([])
       const [currentDelete,setCurrentDelete] = useState("")
       useEffect(()=>{
        //  getting the user from local storage
        const user = localStorage.getItem('token')
        async function getIdeas() {
            await axios.get(`${server}/user-ideas/${user}`).then((response) => {
             if(response.data){
                setIdeas(response.data)
             }
            }).catch((err) => {
            })
        }
        getIdeas()
       },[])

         function DeletePopup(idea_id) {
            setCurrentDelete(idea_id)
           confirmAlert({
             title: "Delete Idea",
             message: "Are you sure to Delete this Idea",
             buttons: [
               {
                 label: "Yes",
                 onClick: () => {
                    DeletePopup = async() => {
                    //  delete particular ideas
                    await axios.delete(`${server}/delete-ideator-idea/${currentDelete}`).then((response) => {
                        if(response.data.success_msg){
                              window.location.reload();
                              toast.warn(response.data.success_msg)
                        }
                        if(response.data.error_msg){
                            toast.error(response.data.error_msg)
                      }
                       }).catch((err) => {
                        console.log(err);
                       })
                   };
                   DeletePopup();
                 },
               },
               {
                 label: "No",
               },
             ],
           });
         }

    return (
        <div className='employercontainer'>
        <ToastContainer/>
            <section className="dashboard">
            <section className="left_dashboard">
                    <button><RxDashboard />Dashboard</button>
                    <input onClick={() => setComponent('yourIdeas')} type="button" value='Your Ideas' />
                </section>
                <section className="">
                <main className="table" id="customers_table">
        <section className="table__body">
            <table>
                <thead>
                    <tr>
                        <th> Idea Title <span className="icon-arrow"></span></th>
                        <th> Idea Category <span className="icon-arrow"></span></th>
                        <th> Action <span className="icon-arrow"></span></th>
                        <th> Total Votes: <span className="icon-arrow"></span></th>
                        <th> Incentive: <span className="icon-arrow"></span></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    ideas.map((item)=>{
                        return <>
                          <tr>
                        <td> {item.ideaTitle}</td>
                        <td> {item.ideaCategory} </td>
                        <td>
                            <p className="status cancelled" style={{cursor:"pointer"}} onClick={()=>{DeletePopup(item._id)}}>Delete</p>
                        </td>
                        <td> {item.votedBy.length} </td>
                        <td> {item.incentive ? "Yes" : "No"} </td>
                    </tr>
                        </>
                    })
                  }
                </tbody>
            </table>
        </section>
    </main>
    </section>
     </section>
        </div>
    )
}
export default IdeatorHome
