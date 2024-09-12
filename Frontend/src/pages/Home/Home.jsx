import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import FoodDiplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

  
const [category, setCategory] =useState("All");

  return (
    <div>
      <Header/>
      <FoodDiplay category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
