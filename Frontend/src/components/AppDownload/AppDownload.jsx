import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>Lorem ipsum dolor sit amet, <br /> FishMonger App</p>
      <img src={assets.play_store} alt="" />
      <img src={assets.app_store} alt="" />
      
    </div>
  )
}

export default AppDownload
