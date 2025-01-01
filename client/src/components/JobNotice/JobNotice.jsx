import React from 'react'
import './Application.css'
import { Link, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { server } from '../../config'
import { jobId } from '../../redux/jobIdSlice'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ideas } from '../../utils/ideaPost'

const JobApplicatoin = (props) => {





  return (
   <>
   
   </>
  )
}

export default JobApplicatoin
