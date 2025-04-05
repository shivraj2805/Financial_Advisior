import React from 'react';
import "./About.css";
import about_img from '../../assets/about-2.webp';
import play_icon from '../../assets/play-icon.png';

const About = () => {
  return (
    <div className='about'>
      <div className="about-left">
        <img src={about_img} alt="About Us" className='about-img' />
        <img src={play_icon} alt="Play Icon" className='play-icon' />
      </div>
      <div className="about-right">
        <h3>ABOUT US</h3>
        <h2>Guiding You Towards Financial Freedom</h2>
        <p>At FinAdvise, we are dedicated to helping individuals and businesses achieve financial security and growth. Our expert advisors provide tailored solutions for investments, retirement planning, wealth management, and more.</p>
        <p>With years of experience and a commitment to excellence, we offer personalized financial strategies that align with your goals and aspirations. Our mission is to simplify financial decision-making, ensuring a secure and prosperous future for you and your loved ones.</p>
        <p>Partnering with trusted institutions and leveraging industry insights, we empower our clients with the knowledge and confidence needed to make informed financial choices. Let us guide you on the path to financial success.</p>
      </div>
    </div>
  );
};

export default About;
