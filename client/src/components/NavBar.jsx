import React, { useState, useEffect } from "react";
import { Menu, X, Globe, BadgeDollarSign } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import "../LandingPage/Hero/Hero.css";

const NavBar = ({ language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    <Navigate to="/login" />;
  };


  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 navbar-fade-in ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        background: scrolled ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.08)',
        boxShadow: scrolled ? '0 4px 24px 0 #22c55e22, 0 1.5px 4px 0 #4ade8033' : 'none',
        borderBottom: scrolled ? '1.5px solid #bbf7d055' : 'none',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 grid grid-cols-2">
          {/* Left: Logo */}
          <a href="/" className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-green-50 transition duration-200">
            <BadgeDollarSign className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-extrabold text-green-800 tracking-tight drop-shadow">FinAdvise</span>
          </a>

          {/* Right: Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 inline-block list-none mx-5 text-[rgb(6,86,6)] text-[18px] font-medium transition duration-500 cursor-pointer font-[Outfit]">
           <SignedOut>
           <a
              href="/"
              className="nav-link nav-link-animated"
            >
              Home
            </a>
           </SignedOut>

           <SignedIn>
           <a
              href="/financialAdvisior"
              className="nav-link nav-link-animated"
            >
              Dashboard
            </a>
           </SignedIn>
            <a
              href="/ppf"
              className="nav-link nav-link-animated"
            >
              CalcPro
            </a>
            {/* <a
              href="/scheme"
              className="nav-link"
            >
              Scheme
            </a> */}
            <a
              href="/news"
              className="nav-link nav-link-animated"
            >
              News
            </a>
            <a
              href="/road"
              className="nav-link nav-link-animated"
            >
              AdvisorMap
            </a>

            {/* Show Sign In Button if not signed in */}
            <SignedOut>
              <a
                href="/login"
                className="nav-link nav-link-animated"
              >
                Login
              </a>
            </SignedOut>

            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition font-semibold shadow-sm border border-green-200"
            >
              <Globe className="h-4 w-4 mr-1" />
              {/* {language.toUpperCase()} */}
            </button>

            {/* Show User Profile Button if signed in */}
            <SignedIn>
              <div className="ml-2 rounded-full bg-green-50 border border-green-200 p-1 flex items-center shadow-sm">
                <UserButton />
              </div>
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-green-800 p-2 rounded-lg hover:bg-green-100 transition"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 border-t border-green-100 rounded-b-2xl shadow-lg animate-fade-in">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <a
              href="/"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
              Home
            </a>
            <a
              href="/ppf"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
              CalcPro
            </a>
            <a
              href="/scheme"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
              Scheme
            </a>
            <a
              href="/news"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
              News
            </a>
            <a
              href="/road"
              className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
            >
                  AdvisorMap
            </a>

             {/* Show Sign In Button if not signed in */}
             <SignedOut>
              <a
                href="/login"
                className="block px-3 py-2 text-green-800 hover:bg-green-50 rounded-lg font-semibold transition"
              >
                Login
              </a>
            </SignedOut>

            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-2 rounded-full bg-green-100 text-green-800 hover:bg-green-200 transition font-semibold shadow-sm border border-green-200 w-full"
            >
              <Globe className="h-4 w-4 mr-1" />
              {language.toUpperCase()}
            </button>

             {/* Show User Profile Button if signed in */}
             <SignedIn>
              <div className="mt-2 rounded-full bg-green-50 border border-green-200 p-1 flex items-center shadow-sm">
                <UserButton />
              </div>
            </SignedIn>

          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
