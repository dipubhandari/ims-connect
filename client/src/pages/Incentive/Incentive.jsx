import React from 'react'
import './Incentive.css'

const Incentive = () => {
  return (
    <div className='incentive_container'>
      <div>Your Incentive is: <span className="incentive_text"> 1000$</span><br /></div>
     <div> <button className="addToBank" onClick={()=>{alert("Added to your bank account")}}>Add To Your Bank Account</button>
     </div>
    </div>
  )
}

export default Incentive
