import React, { useRef, useEffect } from 'react';
import './Testimonials.css';
import user_1 from '../../assets/shiv.jpg';
import user_2 from '../../assets/aadi.jpg';

const testimonials = [
    {
        img: user_1,
        name: "Shivraj Darekar",
        role: "Software Developer",
        text: "Working on this Financial Advisor platform has been an incredible experience. Crafting secure, scalable software to help users manage their finances smarter is deeply rewarding."
    },
    {
        img: user_2,
        name: "Aditya Deshmukh",
        role: "ML Engineer",
        text: "We’re using machine learning to offer personalized financial insights. It's amazing to see data-driven strategies genuinely help users plan their futures."
    }
];

const Testimonials = () => {
    const cardRefs = useRef([]);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('slide-visible');
                    }
                });
            },
            { threshold: 0.2 }
        );
        cardRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <div id="testimonials" className="testimonials-list">
            {testimonials.map((t, idx) => (
                <div
                    className="slide"
                    key={idx}
                    ref={el => (cardRefs.current[idx] = el)}
                    style={{ "--i": idx }}
                >
                    <div className="user-info">
                        <img src={t.img} alt={t.name} />
                        <div>
                            <h3>{t.name}</h3>
                            <span>{t.role}</span>
                        </div>
                    </div>
                    <p>{t.text}</p>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;