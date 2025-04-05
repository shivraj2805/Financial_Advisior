import React from 'react';
import "./Hero.css";
import dark_arrow from "../../assets/dark-arrow.png";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const naviagate=useNavigate();

  return (
    <div  className='hero container'>
      <div className="hero-text">
        <h1 className='main-head'>Smart Financial Planning For Your Future</h1>
        <p className='sub-head'>Expert guidance, micro-investments, and government schemes all in one place</p>
        <div className='pt-4'>
        <button onClick={()=>{
          naviagate("/financialAdvisior")
        }}  class="btn text-green-800">Get Started <img src={dark_arrow} alt="" /></button>
        </div>
      </div>

    </div>
  )
}

export default Hero