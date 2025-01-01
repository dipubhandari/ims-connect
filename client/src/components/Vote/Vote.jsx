import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import HeroSection from "../HeroSection/Hero";
import "./Vote.css";
import { Link, redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { server } from "../../config";
import Footer from "../Footer/Footer";
import { apply } from "../../redux/applySlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Vote = () => {
  const dispatch = useDispatch();
  const [ideaDetail, setDetail] = useState({
    votedBy:[],
    likes:[],
    dislikes:[],
    _id:""
  });
  const [uniqueness,setUniqueness] = useState(false)
  const [effectiveness,setEffectiveness] = useState(false)
  const [innovative,setInnovative] = useState(false)
  // when user clicks on submit button
  const submitVote = async() =>{
    const paths = path.split('/')
    const id = paths[paths.length - 1]
      const data= {
        uniqueness,effectiveness,innovative
      }
      const voter = localStorage.getItem('token')
      data.voter = voter
      data.idea = id
      await axios.post(`${server}/vote-idea`,data).then((response) => {
        if(response.data.success_msg){
    
          toast.success(response.data.success_msg)
        }
        if(response.data.err_msg){
          toast.warn(response.data.err_msg)
        }
      }).catch((error) => {
        console.log(error);
      })
  }
// when user clicks on vote switch button
  function handleUniBtn(clicked){
        setUniqueness(!uniqueness)
  }
  function handleEffBtn(){
        setEffectiveness(!effectiveness)
  }
  function handleInoBtn(){
        setInnovative(!innovative)
  }
  const path = useLocation().pathname
  // getting idea detail from database
  useEffect(() => {
      const paths = path.split('/')
      const id = paths[paths.length - 1]
      async function getDetails() {
          await axios.get(`${server}/idea-detail/${id}`).then((response) => {
            setDetail(response.data)
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
          <section className="idea_position_apply"></section>{" "}
          <h4 className="idea_summary_title">Vote This Idea</h4>
          {/* detail here */}
          <div class="ideacontainer">
            <h1 className="ideaDetailTitleVote">{ideaDetail.ideaTitle}</h1>
            <p className="ideaDetailPara">{ideaDetail.idea} </p>

            <div class="ideaCard">
              <div class="ideaCard-itemVote">
                <h3>Innovative</h3>
                <p style={{ display: "flex", margin:"auto", padding: "10px" }}>
                  <b  style={{margin:"10px"}}>VOTE: </b>
                  <input type="checkbox" name='innovative' onClick={()=>handleInoBtn("innovative")} />
                </p>
              </div>
              <div class="ideaCard-itemVote">
                <h3>Effectiveness</h3>
                <p style={{ display: "flex", margin:"auto", padding: "10px" }}>
                
                  <b  style={{margin:"10px"}}>VOTE: </b>
                  <input type="checkbox" name="effectiveness" onClick={()=>handleEffBtn("effectiveness")} />
                </p>
              </div>
              <div class="ideaCard-itemVote">
                <h3>Uniqueness</h3>
                <p style={{ display: "flex", margin:"auto", padding: "10px" }}>
                <b  style={{margin:"10px"}}>VOTE: </b>
                <input type="checkbox" name="uniqueness" value={uniqueness} onClick={()=>handleUniBtn("uniqueness")}/>
                </p>
              </div>
            </div>
            <br />
            <br />
            <button onClick={submitVote} class="ideabutton">
              Confirm Vote
            </button>
          </div>
        </section>
        <section className="other_ideas"></section>
      </div>
    </div>
  );
};
export default Vote;
