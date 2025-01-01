import "./App.css";
import AnalyzerHome from "./pages/AnalyzerHome/AnalyzerHome";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import CreateAccount from "./pages/CreateAccount/Signup";
import { server } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "./redux/authSlice";
import { account } from "./redux/accountSlice";
import Select from "./pages/SelectAccount/Select";
import axios from "axios";
import PostIdea from "./pages/PostIdea/PostIdea";
import IdeatorHome from "./pages/IdeatorHome/IdeatorHome";
import Goal from "./pages/OurGoals/Goals";
import ContactUs from "./pages/ContactUs/ContactUs";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import IdeaDetail from "./components/IdeaDetail/IdeaDetail";
import Vote from "./components/Vote/Vote";
import Admin from "./pages/Admin/Admin";
import Incentive from "./pages/Incentive/Incentive";

function App() {
  const isAuth = useSelector((state) => state.isLogin);
  const [userType, setUserType] = useState(localStorage.getItem('currentAcccount' || "Common User"))
  const [isLogin,setIsLogin] = useState(localStorage.getItem('isLogin'))
  // checking if the user is logged in or not
  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(`${server}/checklogin`, { token }).then((data) => {
          if (data.data.user) {
            const currentUser = localStorage.getItem('currentAcccount') || "Common User"
            setUserType(currentUser)
            console.log(currentUser);
             console.log(localStorage.getItem('isLogin'));
          } else {
            // dispatch(account("N/A"));
          }
        });
      } else {
        // dispatch(isLogin(false));
      }
    }
    checkLogin();
  }, []);
  // checking if the user is logged in or not

  return (
    <>
      <section className="AppContainer">
        <Header/>
        <Routes>
          {/* homepage */}
          <Route
            path="/"
            element={
              (userType == "ideator") ? (
                <IdeatorHome />
              ) : (
                <AnalyzerHome/>
              )
            }
          />
          <Route
            path="/homepage"
            element={
              userType == "ideator" ? (
                <IdeatorHome />
              ) : (
                <AnalyzerHome isLogin={isAuth} />
              )
            }
          />
          {/* homepage here */}

          {/* accoutn selection when signup */}
          <Route path="/select_Account_Type" element={<Select />} />

          <Route path="/login" element={<Login />} />
          {/* login */}
          {/* contact us route */}
          <Route path="/contact-us" element={<ContactUs/>} />
          <Route path="/incentive" element={<Incentive/>} />

          {/* signup for new employer */}
          <Route path="/create-new-user" element={<CreateAccount />} />
          {/* signup for new employer  herer*/}

          {/* if usertype is ideator then show post idea button otherwise not */}
        
            <Route
              path="/post-idea"
              element={isLogin ? <PostIdea /> : <Login />}
            />
          
          <Route path="/admin" element={<Admin/>} />
          <Route path="/our-goal" element={<Goal/>} />
          <Route path="vote-idea/:id" element={(isLogin)?<Vote/>:<Login/>}/>
          <Route path="/idea-detail/:ideaId" element={(isLogin)?<IdeaDetail/>:<Login/>} />
          <Route path="*" element="PAGE NOT FOUND" />
        </Routes>
        <Footer/>
      </section>
    </>
  );
}

export default App;
