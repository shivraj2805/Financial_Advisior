import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import dark_arrow from "../../assets/dark-arrow.png";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: "💡", label: "Personalized Advice" },
  { icon: "📈", label: "Track Investments" },
  { icon: "🔒", label: "Secure & Private" },
  { icon: "🤝", label: "Community Support" },
];

const SNAKE_LENGTH = 20;

const Hero = () => {
  const navigate = useNavigate();
  const cursorRef = useRef(null);
  const scrollBlobRef = useRef(null);
  const [snakeTrail, setSnakeTrail] = useState(
    Array(SNAKE_LENGTH).fill({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  );

  // Mouse tracking and snake trail animation
  useEffect(() => {
    const cursor = cursorRef.current;
    const scrollBlob = scrollBlobRef.current;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animationFrame;

    const moveCursor = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
      cursor.style.left = mouse.x + "px";
      cursor.style.top = mouse.y + "px";
      scrollBlob.style.left = mouse.x + "px";
      scrollBlob.style.top = mouse.y + "px";
    };

    // Snake trail animation (faster)
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

  // Scroll effect for cursor and blob
  useEffect(() => {
    const cursor = cursorRef.current;
    const scrollBlob = scrollBlobRef.current;
    if (!cursor || !scrollBlob) return;

    const handleScroll = () => {
      cursor.classList.add("cursor-scroll");
      scrollBlob.classList.add("scroll-blob-active");
      setTimeout(() => {
        cursor.classList.remove("cursor-scroll");
        scrollBlob.classList.remove("scroll-blob-active");
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SVG lines for snake effect (thicker, faint greeny-white)
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
        strokeWidth={18 - i * 0.7}
        opacity={0.13 + 0.5 * (1 - i / SNAKE_LENGTH)}
        strokeLinecap="round"
        className="snake-line"
      />
    );
  }

  return (
    <section className="hero-3d w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-0 md:px-0 py-0 bg-gradient-to-br from-green-50 via-white to-green-200 relative overflow-hidden">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>
      {/* Scroll Visualisation Blob */}
      <div ref={scrollBlobRef} className="scroll-blob"></div>
      {/* Snake Trail Lines (SVG) */}
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
      {/* Snake Trail Dots */}
      {snakeTrail.map((pos, idx) => (
        <div
          key={idx}
          className="snake-dot"
          style={{
            left: pos.x + "px",
            top: pos.y + "px",
            opacity: 0.45 * (1 - idx / SNAKE_LENGTH),
            zIndex: 9995,
            width: 38 - idx + "px",
            height: 38 - idx + "px",
            background: `radial-gradient(circle at 40% 40%, #fff 70%, #bbf7d0 90%, #22c55e 100%)`,
            filter: `blur(${3 + idx * 1.1}px)`
          }}
        />
      ))}
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-green-200 opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] bg-green-400 opacity-20 rounded-full blur-3xl z-0"></div>
      {/* Left: Text & Features */}
      <div className="flex-1 flex flex-col items-start justify-center z-10 px-8 md:px-32 py-20">
        {/* Headings */}
        <h2 className="text-2xl md:text-4xl font-bold text-green-700 mb-2 tracking-wide animate-fade-in-slow">
          Smarter Wealth <span className="text-green-500">&middot;</span> Brighter Future
        </h2>
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 mb-5 tracking-tight animate-fade-in">
          Smart Financial Planning For Your Future
        </h1>
        <p className="text-base md:text-lg text-green-900 mb-8 font-medium animate-fade-in-slow">
          Unlock your financial potential with{" "}
          <span className="font-bold text-green-700">expert guidance</span> and{" "}
          <span className="font-bold text-green-700">secure tools</span>.
        </p>
        {/* Feature Cards - small, horizontal */}
        <div className="flex flex-wrap gap-3 mb-10 w-full max-w-lg">
          {features.map((f, i) => (
            <div
              key={f.label}
              className="feature-card-3d flex items-center gap-2 bg-white/90 border border-green-100 rounded-lg px-4 py-2 shadow hover:shadow-lg transition text-sm"
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <span className="text-green-600 text-lg drop-shadow">
                {f.icon}
              </span>
              <span className="font-semibold text-green-900">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-6 animate-fade-in-slow">
          <button
            onClick={() => navigate("/financialAdvisior")}
            className="flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white text-lg font-bold rounded-full shadow-xl transition-all duration-200 transform hover:-translate-y-1 hover:scale-105"
          >
            Get Started
            <img
              src={dark_arrow}
              alt=""
              className="w-6 h-6 ml-1 animate-bounce-x"
            />
          </button>
          <button
            onClick={() => window.scrollTo({ top: 900, behavior: "smooth" })}
            className="flex items-center gap-2 px-10 py-3 bg-white border-2 border-green-500 text-green-700 text-lg font-bold rounded-full shadow hover:bg-green-50 transition-all duration-200"
          >
            Learn More
          </button>
        </div>
      </div>
      {/* Right: 3D/Animated Visualization */}
      <div className="flex-1 flex justify-center items-center z-10 px-8 md:px-24 py-20">
        <div className="relative rounded-3xl shadow-2xl border-4 border-green-200 overflow-hidden w-full max-w-xl h-[440px] bg-gradient-to-br from-green-900 via-green-700 to-green-400 flex items-center justify-center perspective-3d">
          {/* 3D Animated SVG Chart */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="320"
              height="320"
              viewBox="0 0 320 320"
              fill="none"
              className="drop-shadow-2xl animate-rotate-3d"
            >
              <ellipse
                cx="160"
                cy="160"
                rx="110"
                ry="45"
                fill="#bbf7d0"
                opacity="0.7"
              />
              <ellipse
                cx="160"
                cy="160"
                rx="80"
                ry="30"
                fill="#4ade80"
                opacity="0.7"
              />
              <ellipse
                cx="160"
                cy="160"
                rx="50"
                ry="15"
                fill="#22c55e"
                opacity="0.7"
              />
              <g className="animate-bar-grow">
                <rect
                  x="120"
                  y="120"
                  width="18"
                  height="80"
                  rx="7"
                  fill="#16a34a"
                />
                <rect
                  x="155"
                  y="90"
                  width="18"
                  height="110"
                  rx="7"
                  fill="#22d3ee"
                />
                <rect
                  x="190"
                  y="70"
                  width="18"
                  height="130"
                  rx="7"
                  fill="#facc15"
                />
              </g>
            </svg>
          </div>
          {/* Overlay Caption */}
          <div className="absolute bottom-6 left-6 bg-green-700/90 text-white text-lg px-5 py-3 rounded-xl shadow-lg pointer-events-none font-semibold backdrop-blur">
           Secure Your Future For Better Life !
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;