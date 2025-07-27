import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { FaFilter, FaSearch, FaRegUser, FaMapMarkerAlt, FaRupeeSign, FaBirthdayCake, FaBriefcase } from "react-icons/fa";
import { useRef } from "react";
import "../LandingPage/Hero/Hero.css";

const SNAKE_LENGTH = 18;

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    category: "All",
    state: "All",
    income: "All",
    age: "All",
    occupation: "All",
  });

  const [activeCard, setActiveCard] = useState(null);

  const cursorRef = useRef(null);
  const snakeTrailRef = useRef(Array(SNAKE_LENGTH).fill({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
  const [snakeTrail, setSnakeTrail] = useState(snakeTrailRef.current);

  const fetchSchemes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/schemes", filters);

      if (Array.isArray(response.data)) {
        setSchemes(response.data);
      } else {
        setSchemes([]);
        setError("Unexpected response format");
        console.error("Unexpected format:", response.data);
      }
    } catch (err) {
      setError("Failed to fetch schemes");
      setSchemes([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if at least one filter is not 'All'
    const anyFilterSelected = Object.values(filters).some((v) => v !== 'All');
    if (anyFilterSelected) {
      fetchSchemes();
    } else {
      // If all filters are 'All', fetch general schemes (backend will handle this)
      fetchSchemes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Mouse tracking and snake trail animation
  useEffect(() => {
    const cursor = cursorRef.current;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationFrame;

    const moveCursor = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
      if (cursor) {
        cursor.style.left = mouse.x + "px";
        cursor.style.top = mouse.y + "px";
      }
    };

    const animateSnake = () => {
      setSnakeTrail((prev) => {
        const newTrail = [...prev];
        newTrail[0] = { ...mouse };
        for (let i = 1; i < SNAKE_LENGTH; i++) {
          newTrail[i] = {
            x: newTrail[i].x + (newTrail[i - 1].x - newTrail[i].x) * 0.5,
            y: newTrail[i].y + (newTrail[i - 1].y - newTrail[i].y) * 0.5,
          };
        }
        return newTrail;
      });
      animationFrame = requestAnimationFrame(animateSnake);
    };
    animateSnake();
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // SVG lines for snake effect
  const lines = [];
  for (let i = 1; i < snakeTrail.length; i++) {
    const p1 = snakeTrail[i - 1];
    const p2 = snakeTrail[i];
    lines.push(
      <line
        key={i}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke="url(#snake-gradient)"
        strokeWidth={16 - i * 0.7}
        opacity={0.10 + 0.4 * (1 - i / SNAKE_LENGTH)}
        strokeLinecap="round"
        className="snake-line"
      />
    );
  }

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Scroll-based shading effect for cards
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.govt-scheme-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80 && rect.bottom > 80) {
          card.classList.add('scrolled');
        } else {
          card.classList.remove('scrolled');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 200); // Initial trigger
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <NavBar />
      {/* Custom Cursor & Snake Trail */}
      <div ref={cursorRef} className="custom-cursor" />
      <svg className="snake-svg-lines" width={window.innerWidth} height={window.innerHeight}>
        <defs>
          <linearGradient id="snake-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#bbf7d0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {lines}
      </svg>
      {snakeTrail.map((pos, idx) => (
        <div
          key={idx}
          className="snake-dot"
          style={{
            left: pos.x + "px",
            top: pos.y + "px",
            opacity: 0.35 * (1 - idx / SNAKE_LENGTH),
            zIndex: 9995,
            width: 28 - idx + "px",
            height: 28 - idx + "px",
            background: `radial-gradient(circle at 40% 40%, #fff 70%, #bbf7d0 90%, #22c55e 100%)`,
            filter: `blur(${2 + idx * 1.1}px)`
          }}
        />
      ))}
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-32 w-[22rem] h-[22rem] bg-green-200 opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-[26rem] h-[26rem] bg-green-400 opacity-20 rounded-full blur-3xl z-0"></div>
      {/* Animated floating SVG blob for extra visual effect */}
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 animate-float" width="420" height="420" viewBox="0 0 420 420" fill="none" style={{pointerEvents:'none'}}>
        <ellipse cx="210" cy="210" rx="180" ry="90" fill="#bbf7d0" opacity="0.18"/>
        <ellipse cx="210" cy="210" rx="120" ry="50" fill="#4ade80" opacity="0.13"/>
        <ellipse cx="210" cy="210" rx="70" ry="25" fill="#22c55e" opacity="0.11"/>
      </svg>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-blue-50 flex flex-col md:flex-row relative overflow-x-hidden">
        {/* Sidebar filters */}
        <aside className="md:w-80 w-full md:sticky top-20 h-fit md:h-[calc(100vh-5rem)] p-6 bg-white/90 border-r shadow-md flex flex-col gap-6 z-10">
          <div className="flex items-center gap-2 mb-4 text-green-700 font-bold text-lg">
            <FaFilter /> Filters
          </div>
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemes..."
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {[
            { key: "category", icon: <FaRegUser /> },
            { key: "state", icon: <FaMapMarkerAlt /> },
            { key: "income", icon: <FaRupeeSign /> },
            { key: "age", icon: <FaBirthdayCake /> },
            { key: "occupation", icon: <FaBriefcase /> },
          ].map(({ key, icon }) => (
            <div key={key} className="mb-2">
              <label className="block mb-1 capitalize font-medium flex items-center gap-2 text-gray-700">{icon} {key}</label>
              <select
                className="w-full border rounded-lg p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={filters[key]}
                onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
              >
                {["All"]
                  .concat(
                    key === "category"
                      ? [
                          "General",
                          "Agriculture",
                          "Healthcare",
                          "Housing",
                          "Education",
                          "Women",
                          "Youth",
                          "Senior Citizens",
                          "Business",
                          "Entrepreneurship",
                          "Rural Development",
                          "Social Welfare",
                          "Minorities",
                          "SC/ST",
                          "Disability"
                        ]
                      : key === "state"
                      ? [
                          "Andhra Pradesh",
                          "Arunachal Pradesh",
                          "Assam",
                          "Bihar",
                          "Chhattisgarh",
                          "Delhi",
                          "Goa",
                          "Gujarat",
                          "Haryana",
                          "Himachal Pradesh",
                          "Jammu & Kashmir",
                          "Jharkhand",
                          "Karnataka",
                          "Kerala",
                          "Madhya Pradesh",
                          "Maharashtra",
                          "Manipur",
                          "Meghalaya",
                          "Mizoram",
                          "Nagaland",
                          "Odisha",
                          "Punjab",
                          "Rajasthan",
                          "Sikkim",
                          "Tamil Nadu",
                          "Telangana",
                          "Tripura",
                          "Uttar Pradesh",
                          "Uttarakhand",
                          "West Bengal"
                        ]
                      : key === "income"
                      ? [
                          "Below 1L",
                          "1L-3L",
                          "3L-6L",
                          "6L-12L",
                          "Above 12L"
                        ]
                      : key === "age"
                      ? [
                          "0-5",
                          "6-17",
                          "18-25",
                          "26-40",
                          "41-60",
                          "60+"
                        ]
                      : [
                          "Farmer",
                          "Student",
                          "Business",
                          "Service",
                          "Entrepreneur",
                          "Unemployed",
                          "Women",
                          "Senior Citizen",
                          "Person with Disability"
                        ]
                  )
                  .map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-extrabold mb-6 text-green-800 tracking-tight">Government Schemes</h2>
          {loading && (
            <div className="flex justify-center items-center h-40">
              <svg className="animate-spin h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>
          )}
          {error && <p className="text-red-600 font-semibold bg-red-50 border border-red-200 rounded p-4 mb-4">{error}</p>}
          {!loading && !error && (
            <>
              <p className="mb-6 text-gray-600 text-sm">
                Showing <span className="font-bold text-green-700">{filteredSchemes.length}</span> matching schemes
              </p>
              {filteredSchemes.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <svg width="80" height="80" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="1.5" d="M12 20v-6m0 0V4m0 10c-4.418 0-8 1.343-8 3v3h16v-3c0-1.657-3.582-3-8-3Z"/></svg>
                  <span className="mt-4 text-lg">No schemes found for your selection.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSchemes.map((scheme, index) => (
                    <div
                      key={index}
                      className={`govt-scheme-card shadow-lg border border-green-100 rounded-2xl bg-white/90 transition-all duration-300 animate-fade-in relative overflow-hidden${activeCard === index ? ' hovered' : ''}`}
                      onMouseEnter={() => setActiveCard(index)}
                      onMouseLeave={() => setActiveCard(null)}
                      tabIndex={0}
                      onFocus={() => setActiveCard(index)}
                      onBlur={() => setActiveCard(null)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-700">
                            {scheme.category || "Scheme"}
                          </span>
                          <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-700">
                            {scheme.state || "All India"}
                          </span>
                        </div>
                        <CardTitle className="text-xl font-bold text-green-800">
                          {scheme.name || scheme.title}
                        </CardTitle>
                        <CardDescription className="text-xs text-gray-500 mt-1">
                          {scheme.eligibility && <span>Eligibility: {scheme.eligibility}</span>}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm text-gray-800">
                        {scheme.description && (
                          <div className="mb-2">
                            <strong className="text-green-700">Description:</strong> {scheme.description}
                          </div>
                        )}
                        {scheme.lastApplyDate && (
                          <div>
                            <strong className="text-green-700">Last Apply Date:</strong> {scheme.lastApplyDate}
                          </div>
                        )}
                        {scheme.applicationProcedure && (
                          <div>
                            <strong className="text-green-700">How to Apply:</strong> {scheme.applicationProcedure}
                          </div>
                        )}
                        {scheme.applicationLink && scheme.applicationLink.startsWith("https://") && scheme.applicationLink.includes(".gov.in") && (
                          <div className="pt-2">
                            <a
                              href={scheme.applicationLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold shadow hover:from-green-600 hover:to-blue-600 transition"
                            >
                              Apply Now
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default GovernmentSchemes;
