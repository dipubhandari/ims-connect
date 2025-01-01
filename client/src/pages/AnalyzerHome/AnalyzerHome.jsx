import React from 'react'
import Hero from '../../components/HeroSection/Hero'
import HomeIdea from '../../components/HomeIdea/HomeIdea'
import './AnalyzerHome.css'

const AnalyzerHome = (props) => {
    return (
        <div className='home_container'>
            {/* header */}
          
            <section className="hero">
                <Hero />
            </section>

            <section className="job">
                <HomeIdea />
            </section>
         
        </div>
    )
}

export default AnalyzerHome
