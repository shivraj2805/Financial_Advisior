import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import "./nav.css";
import logo from "../../assets/logo.png";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { BadgeDollarSign } from 'lucide-react';

export const LandNavbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
       {/* Left: Logo */}
       <div className="flex items-center">
            <BadgeDollarSign className="h-8 w-8 text-green-600 ml-7" />
            <span className="ml-2 text-xl font-bold text-green-800">
              FinAdvise
            </span>
          </div>
      <ul>

        <SignedOut>
        <li><Link to="hero" smooth={true} offset={0} duration={500}>Home</Link></li>
        </SignedOut>
        
        <SignedIn>
        <li><a href='/financialAdvisior' smooth={true} offset={0} duration={500}>Dashboard</a></li>
        </SignedIn> 

        <li><Link to="program" smooth={true} offset={-260} duration={500}>Program</Link></li>
        <li><Link to="about" smooth={true} offset={-150} duration={500}>About us</Link></li>
        <li><Link to="testimonials" smooth={true} offset={-260} duration={500}>Testimonials</Link></li>
        <li><Link to="contact" smooth={true} offset={-260} duration={500} className="btn">Contact us</Link></li>
        <li>
              {/* Show Sign In Button if not signed in */}
              <SignedOut>
              <a
                href="/financialAdvisior"
                className="text-green-800 hover:text-green-600 transition-colors btn"
              >
                Login
              </a>
            </SignedOut>       

             {/* Show User Profile Button if signed in */}
           <div className='text-center'>
           <SignedIn>
              <UserButton />
            </SignedIn> 
           </div>

          </li>
      </ul>
    </nav>
  );
};

