import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import logo from "../../assets/logo.png";
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { BadgeDollarSign, Menu, X } from 'lucide-react';
import "../../LandingPage/Hero/Hero.css";

export const LandNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on link click (for better UX)
  const handleMenuLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 navbar-fade-in ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        background: scrolled ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.08)',
        boxShadow: scrolled ? '0 4px 24px 0 #22c55e22, 0 1.5px 4px 0 #4ade8033' : 'none',
        borderBottom: scrolled ? '1.5px solid #bbf7d055' : 'none',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-green-50 transition duration-200">
          <BadgeDollarSign className="h-8 w-8 text-green-600" />
          <span className="ml-2 text-xl font-extrabold text-green-800 tracking-tight drop-shadow">FinAdvise</span>
        </a>
        {/* Hamburger Button */}
        <button
          className="md:hidden text-green-800 p-2 rounded-lg hover:bg-green-100 transition"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {/* Menu */}
        <ul className={`hidden md:flex items-center space-x-8 font-semibold text-green-800 text-lg transition-all duration-300`}> 
          <SignedOut>
            <li>
              <Link to="hero" smooth={true} offset={0} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
                Home
              </Link>
            </li>
          </SignedOut>
          <SignedIn>
            <li>
              <a href='/financialAdvisior' className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
                Dashboard
              </a>
            </li>
          </SignedIn>
          <li>
            <Link to="program" smooth={true} offset={-260} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
              Program
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} offset={-150} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
              About us
            </Link>
          </li>
          <li>
            <Link to="testimonials" smooth={true} offset={-260} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} offset={-260} duration={500} className="nav-link nav-link-animated" onClick={handleMenuLinkClick}>
              Contact us
            </Link>
          </li>
          <li>
            <SignedOut>
              <a
                href="/financialAdvisior"
                className="nav-link nav-link-animated"
                onClick={handleMenuLinkClick}
              >
                Login
              </a>
            </SignedOut>
            <div className='text-center ml-2 rounded-full bg-green-50 border border-green-200 p-1 flex items-center shadow-sm'>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </li>
        </ul>
      </div>
      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-green-100 rounded-b-2xl shadow-lg animate-fade-in">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <SignedOut>
              <a href="#hero" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Home</a>
            </SignedOut>
            <SignedIn>
              <a href='/financialAdvisior' className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Dashboard</a>
            </SignedIn>
            <a href="#program" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Program</a>
            <a href="#about" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>About us</a>
            <a href="#testimonials" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Testimonials</a>
            <a href="#contact" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Contact us</a>
            <SignedOut>
              <a href="/financialAdvisior" className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition" onClick={handleMenuLinkClick}>Login</a>
            </SignedOut>
            <div className='mt-2 rounded-full bg-green-50 border border-green-200 p-1 flex items-center shadow-sm'>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};