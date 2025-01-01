import { useDispatch } from 'react-redux'
import React from 'react'
import './Hero.css'
import { ImFileText } from 'react-icons/im'
import { BiCategoryAlt, BiCurrentLocation } from 'react-icons/bi'
import { search } from '../../redux/searchKeysSlice';
import { useEffect } from 'react';
import { useState } from 'react'
import { server } from '../../config'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import  banner from './banner.png'

const HeroSection = (props) => {

    const dispatch = useDispatch()
  

    return (
        <>

            <section className="hero_container">

              <img src={banner} className='banner' alt="loading" />

            </section>
        </>

    )
}

export default HeroSection
