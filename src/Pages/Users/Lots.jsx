import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Lots.css'

const Lots = () => {
  const navigate = useNavigate()

  return (
    <div className='Lot'>
      <div id="cardlot">
        <div id="mapp">
          <img src="src/assets/imgd/Screenshot 2025-11-15 042022.png" alt="" />

          <div id="buttons">
            <button onClick={() => navigate('/lots/1')}>Lot-1</button>
            <button onClick={() => navigate('/lots/2')}>Lot-2</button>
            <button onClick={() => navigate('/lots/3')}>Lot-3</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lots
