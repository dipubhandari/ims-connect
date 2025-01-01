import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import HeroSection from '../../components/HeroSection/Hero'
import './IdeaDetail.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { server } from '../../config'
import Footer from '../../components/Footer/Footer'
import { apply } from '../../redux/applySlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IdeaDetail = () => {

    // 
    const dispatch = useDispatch()
    // post detail state
    const [ideaDetail, setDetail] = useState({
        votedBy:[],
        likes:[],
        dislikes:[],
        _id:""
    })

    // getting id from url
    const path = useLocation().pathname
    useEffect(() => {
        const paths = path.split('/')
        const id = paths[paths.length - 1]
        async function getDetails() {
            await axios.get(`${server}/idea-detail/${id}`).then((response) => {
              setDetail(response.data)
              console.log(response.data);
            }).catch(() => {

            })
        }
        getDetails()


    }, [])


    return (
        <div>
            <ToastContainer />

            <div className="apply_page_container">

                <section className="company">
                    <section className="company_detail_nav">
                        <img src={`${server}/uploads/logo/${ideaDetail.logo}`} alt="" />
                        <h2>{ideaDetail.companyname}</h2>
                    </section>
                    <section className="company_detail">
                        <p>{ideaDetail.description}</p>
                    </section>
                 
                </section>

                <section className="idea_details">
                    <section className="idea_position_apply">
                     
                    </section> <h4 className='idea_summary_title'>Idea Summary</h4>
                   {/* detail here */}
                 
          <div class="ideacontainer">
        <h1 className='ideaDetailTitle'>{ideaDetail.ideaTitle}</h1>
        <p className='ideaDetailPara'>{ideaDetail.idea} </p>

        <div class="ideaCard">
            <div class="ideaCard-item">
                <h3>Innovativeness</h3>
                <p>{ideaDetail.innovative} out of {ideaDetail.votedBy.length}</p>
            </div>
            <div class="ideaCard-item">
                <h3>Effectiveness</h3>
                <p>{ideaDetail.effectiveness} out of {ideaDetail.votedBy.length}</p>
            </div>
            <div class="ideaCard-item">
                <h3>Uniqueness</h3>
                <p>{ideaDetail.uniqueness} out of {ideaDetail.votedBy.length}</p>
            </div>

        </div>
        <br />
                <p>This idea got {ideaDetail.likes.length} Likes, {ideaDetail.dislikes.length} dislikes and {ideaDetail.views} views</p>
        <br />
        <Link to={`/vote-idea/${ideaDetail._id}`} class="ideabutton">Vote This Idea</Link>

    </div>

                    

                </section>

                <section className="other_ideas">

                </section>
            </div>

        </div>
    )
}

export default IdeaDetail