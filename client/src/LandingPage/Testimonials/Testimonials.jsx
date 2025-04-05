import React, { useRef } from 'react';
import './Testimonials.css';
import next_icon from '../../assets/next-icon.png';
import back_icon from '../../assets/back-icon.png';
import user_1 from '../../assets/shiv.jpg';
import user_2 from '../../assets/aadi.jpg';
import user_3 from '../../assets/aashu.jpg';
import user_4 from '../../assets/satya.jpg';
import user_5 from '../../assets/shubham.jpg';

const Testimonials = () => {
    const slider = useRef();
    let tx = 0;

    const slideForward = () => {
        if (tx > -50) {
            tx -= 25;
        }
        slider.current.style.transform = `translate(${tx}%)`;
    };

    const slideBackward = () => {
        if (tx < 0) {
            tx += 25;
        }
        slider.current.style.transform = `translate(${tx}%)`;
    };

    return (
        <div className='testimonials'>
            <img src={next_icon} alt="" className='next-btn' onClick={slideForward} />
            <img src={back_icon} alt="" className='back-btn' onClick={slideBackward} />
            <div className="slider">
                <ul ref={slider}>
                    <li>
                        <div className="slide ">
                            <div className="user-info">
                                <img src={user_1} alt="" />
                                <div>
                                    <h3>Shivraj Darekar</h3>
                                    <span>Software Developer</span>
                                </div>
                            </div>
                            <p>Working on this Financial Advisor platform has been an incredible experience. Crafting secure, scalable software to help users manage their finances smarter is deeply rewarding.</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_2} alt="" />
                                <div>
                                    <h3>Aditya Deshmukh</h3>
                                    <span>ML Engineer</span>
                                </div>
                            </div>
                            <p>We’re using machine learning to offer personalized financial insights. It's amazing to see data-driven strategies genuinely help users plan their futures.</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_3} alt="" />
                                <div>
                                    <h3>Aashish Suryavanshi</h3>
                                    <span>Backend Developer</span>
                                </div>
                            </div>
                            <p>Building the backend architecture for this platform has been both challenging and exciting. Stability and performance are key in financial tech, and we’re nailing it!</p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_4} alt="" />
                                <div>
                                    <h3>Satyajeet Chavan</h3>
                                    <span>Frontend Developer</span>
                                </div>
                            </div>
                            <p>I focused on creating a user-friendly interface that simplifies financial planning. Our goal is to make managing money intuitive for everyone.</p>
                        </div>
                    </li>
                    {/* <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_5} alt="" />
                                <div>
                                    <h3>Shubham Jadhav</h3>
                                    <span>Frontend Developer</span>
                                </div>
                            </div>
                            <p>I focused on creating a user-friendly interface that simplifies financial planning. Our goal is to make managing money intuitive for everyone.</p>
                        </div>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Testimonials;
