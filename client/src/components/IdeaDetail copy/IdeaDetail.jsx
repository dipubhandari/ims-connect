import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import HeroSection from '../HeroSection/Hero'
import './IdeaDetail.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { server } from '../../config'
import Footer from '../Footer/Footer'
import { apply } from '../../redux/applySlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IdeaDetail = () => {

    // 
    const dispatch = useDispatch()

    // post detail state
    const [ideaDetail, setDetail] = useState({})

    // getting id from url
    const path = useLocation().pathname
    // useEffect(() => {
    //     const paths = path.split('/')
    //     const token = paths[paths.length - 1]
    //     console.log(token)
    //     async function getDetails() {
    //         await axios.get(`${server}/idea-post-detail/${token}`).then((response) => {
    //             // console.log(first)
    //             const data = { ...response.data.companydetail, ...response.data.ideadetail }
    //             setDetail(data)
    //             console.log(data)
    //         }).catch(() => {

    //         })
    //     }
    //     getDetails()

    //     console.log(ideaDetail)

    // }, [])


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
        <h1 className='ideaDetailTitle'>Title of the idea</h1>
        <p className='ideaDetailPara'>Here is the idea of the user </p>

        <div class="ideaCard">
            <div class="ideaCard-item">
                <h3>Innovativeness</h3>
                <p>10 out of 90</p>
            </div>
            <div class="ideaCard-item">
                <h3>Effectiveness</h3>
                <p>20 out of 100</p>
            </div>
            <div class="ideaCard-item">
                <h3>Uniqueness</h3>
                <p>40 out of 100</p>
            </div>

        </div>
        <br />
                <p>This idea got 89 Likes, 76 dislikes and 90 views</p>
        <br />
        <Link to={`/vote-idea/1`} class="ideabutton">Vote This Idea</Link>

    </div>

                    

                </section>

                <section className="other_ideas">

                </section>
            </div>

        </div>
    )
}

export default IdeaDetail