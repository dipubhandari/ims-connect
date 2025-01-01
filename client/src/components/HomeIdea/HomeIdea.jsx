// page for ideas on the homepage

// import { post } from './post'
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./HomeIdea.css";
import { server } from "../../config";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
// import Ideas from "../../utils/dummyData";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { HiEye } from "react-icons/hi2";
import {images} from '../../utils/image'
const HomeIdea = () => {
 
  const [latestIdea, setLatestIdea] = useState({});
  const [totalVotes, setTotalVotes] = useState(0)
  useEffect(() => {
    // fetching latest job
    const latestJob = async () => {
      const posts = await axios
        .get(`${server}/all-ideas`)
        .then((response) => {
          console.log(response.data);
          setLatestIdea(response.data);
          console.log(response.data[0].votedBy.length);
          setTotalVotes(response.data)
        });
    };
    latestJob();
  }, []);

  return (
    <>
      <h4 className="idea_title">
        <span>Top Trending Ideas ({latestIdea.length})</span>
      </h4>

      <div className="idea_container">
        {
          (latestIdea.length > 0)
          ?
          <section className="idea_content">
          {latestIdea.map((item, id) => {
            let count = Math.floor(Math.random() * 10) + 1;
            return (
          
              <Link to={`/idea-detail/${item.
              _id}`} className="idea_Card" key={id}>

             <div className="top_idea_card">
             <section className="ideator_logo">
                  {/* <img src={`${server}/uploads/logo/${item.logo}`} alt="" /> */}
                  <img src={images[count+1]} />
              
                </section>

                <section className="idea_category">
                  <h6 className="ideaTitle">Idea Title :{item.ideaTitle}</h6>
                  <span className="ideaTitle">Idea Category: {item.ideaCategory}</span>
                  <span className="ideaTitle">Posted By: {item.ideatorName}</span>
                  <span className="view_more">View Idea...</span>
                  <span className="idea_record">
                 <span> <AiFillLike/> {item.likes.length}</span>
                  <span> <AiFillDislike/>{item.dislikes.length}</span>
                  <span className="eye"> <HiEye/>{item.views}</span>
                  </span>
                </section>
             </div>
                <div className="rating_box">
                <NavLink
                  to={`idea-detail/${item._id}`}
                  className="idea_rating"
                >
                  <span className="rate_on">Innovative</span> 
                  <span className="stars">
                    {item.innovative}/ {item.votedBy.length}
                    </span>
                </NavLink>
                <NavLink
                  to={`idea-detail/${item._id}`}
                  className="idea_rating"
                >
                <span className="rate_on">Uniqueness</span> 
                <span className="stars">
                  
                    {item.uniqueness} / {item.votedBy.length}
                  
                </span>
                </NavLink>
                <NavLink
                  to={`idea-detail/${item._id}`}
                  className="idea_rating"
                >
                 <span className="rate_on">Effectiveness</span> 
                 <span className="stars">                    {item.effectiveness} / {item.votedBy.length}
                 </span>
                </NavLink>
              </div>
              </Link>
               
            
            );
          })}{" "}
        </section>
          :
          "No Idea Posted Till Date"
        }
      </div>

      <h4 className="viewbtn">
        <Link to="/jobs" className="viewbtnlink">
          View All
        </Link>
      </h4>
    </>
  );
};

export default HomeIdea;
