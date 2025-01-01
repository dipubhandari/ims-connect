import React from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaBloggerB } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineWork } from "react-icons/md";
import { MdPermContactCalendar } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { account } from "../../redux/accountSlice";
import { isLogin } from "../../redux/authSlice";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiGlobalLine } from "react-icons/ri";
import { GiStairsGoal } from "react-icons/gi";
import { FcIdea } from "react-icons/fc";
import {checkLogin} from "../../utils/checkLogin"

const Header = () => {
  // const isUserLogin = useSelector((state) => state.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(0);
  const [userType, settUserType] = useState('');
  const [isUserLogin,setIsUserLogin] = useState();

  useEffect(()=>{
    const userType =  localStorage.getItem("currentAcccount") || 'Common User'
    settUserType(userType)
    const isUserLogin = localStorage.getItem("isLogin") || false
    setIsUserLogin(isUserLogin)
  })

  // alert confrim
  function logout(id) {
    confirmAlert({
      title: "Log out",
      message: "Are you sure to logout this account",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            logout = () => {
              setRerender(Math.random());
              navigate("/");
              toast.success("Logout Successfully...");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.setItem("currentAcccount", "Common User");
              localStorage.removeItem('isLogin')
              dispatch(isLogin(false));
              dispatch(account("false"));
              window.location.reload();

            };
            logout();
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  return (
    <div
      className="header_container"
      style={{
        backgroundColor:
          userType == "voter" ? "rgb(0,0,0)" : "rgb(15,  104,18)",
      }}
    >
      <Link to="/" className="header_logo">
        <h1 className="logo">
          Green <span className="logo_special">Future.</span>{" "}
        </h1>
      </Link>

      <section className="header__menu">
        <ToastContainer />
        <Link to="/" className="link_row">
          <b>
            <AiFillHome />
          </b>{" "}
          <Link to="/" className="linkheader">Home</Link>
        </Link>
        {/* show post ideator button only if user is ideator */}
        {userType == "ideator" ? (
        <>
          <Link to="/post-idea" className="link_row">
            <b>
              <FcIdea />
            </b>{" "}
            <Link to="/post-idea" className="linkheader">Post Idea</Link>
          </Link>
          <Link to="/incentive" className="link_row">
            <b>
              <FcIdea />
            </b>{" "}
            <Link to="/incentive" className="linkheader">Incentive</Link>
          </Link>
          </>
          
        ) : (
          ""
        )}

        

        <Link to="/our-goal" className="link_row">
          <b>
            <GiStairsGoal />
          </b>{" "}
          <Link  to="/our-goal" className="linkheader"> Our Goal</Link>
        </Link>

        <Link to='/contact-us' className="link_row">
          <b>
            <MdPermContactCalendar />
          </b>{" "}
          <Link to='/contact-us' className="linkheader">Contact Us</Link>
        </Link>
      </section>
      <section
        className="header_operator"
        style={{
          backgroundColor: userType == "voter" ? "grey" : "rgb(60 135 62)",
        }}
      >

      {/* iff user is not logged in */}
        {!isUserLogin ? (
          <>
            <Link className="first" to="/login">
              <span className="right_logo">
                <FaSignInAlt />
              </span>
              <span className="right_topic">Login</span>
            </Link>
            <Link className="first" to="/select_Account_Type">
              <span className="right_logo">
                <BsFillPersonFill />
              </span>
              <span className="right_topic">Singup</span>
            </Link>
          </>
        ) :
        // if user is logged in 
        (
          <>
            {userType == "ideator" ? (
              <Link to="/post" className="first">
                {/* <span className="right_logo">
                  <MdOutlineWork />
                </span> */}
                <span className="right_topic">
                  {/* <b>Post Idea...</b> */}
                </span>
              </Link>
            ) : null}

            <b
              style={{ backgroundColor: "none", cursor: "pointer" }}
              className="first"
              onClick={logout}
            >
              <span className="right_logo">
                <RiLogoutCircleRLine />
              </span>
              <span className="right_topic">Logout</span>
            </b>
          </>
        )}
      </section>
    </div>
  );
};

export default Header;
