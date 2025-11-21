import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Userland.css'

const Userland = () => {
  const navigate = useNavigate()

  return (
    <div className='Land'>
      <div id="content1">
        <div id="box1">
          <h1>Parkmate</h1>
        </div>
        <div id="box2">
          <h4>Parking made Simple</h4>
          <p>Plan ahead and save time with
            seamless parking finds. Whether you're
            heading to college or downtown,
            get a spot ready before you arrive.</p>

          <button onClick={() => navigate('/lots')}>Book Now</button>
        </div>
      </div>
    </div>
  )
}

export default Userland
