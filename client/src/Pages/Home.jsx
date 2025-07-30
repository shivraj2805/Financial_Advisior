import React, { useRef, useEffect, useState } from "react";
import { Layout } from "lucide-react";
import { UserCircle } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";
import "../LandingPage/Hero/Hero.css";

const SNAKE_LENGTH = 18;

const HomePage = () => {
  const features = [
    {
      icon: UserCircle,
      title: "User Profiles",
      description: "View and manage detailed user profiles",
      link: "/profiles",
    },
    {
      icon: BookOpen,
      title: "Learning Center",
      description: "Access courses and educational content",
      link: "/learn",
    },
    {
      icon: BookOpen,
      title: "Roadmap",
      description: "Access courses and educational content",
      link: "/road",
    },
    {
      icon: Newspaper,
      title: "Daily Tech News",
      description: "Stay updated with the latest tech news",
      link: "/news",
    },

  ];

  // Cursor and snake trail logic
  const cursorRef = useRef(null);
  const snakeTrailRef = useRef(Array(SNAKE_LENGTH).fill({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
  const [snakeTrail, setSnakeTrail] = useState(snakeTrailRef.current);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 relative overflow-x-hidden">
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
      {/* Header */}
      <div className="flex items-center justify-center mb-12 pt-16 animate-fade-in-slow">
        <Layout className="w-12 h-12 text-white mr-4 drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">Central Hub</h1>
      </div>
      <div className="flex justify-center mb-8 animate-fade-in">
        <Link to="/login" className="button bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-green-600 hover:to-blue-600 transition text-lg">Login</Link>
      </div>
      {/* Feature Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <a
                key={feature.title}
                href={feature.link}
                className="group p-8 bg-white bg-opacity-10 rounded-2xl backdrop-blur-lg hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20 shadow-xl hover:shadow-2xl flex flex-col items-center text-center animate-pop-in"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <Icon className="w-14 h-14 text-blue-200 group-hover:text-blue-100 mb-4 drop-shadow" />
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">
                  {feature.title}
                </h3>
                <p className="text-blue-100 text-lg">{feature.description}</p>
              </a>
            );
          })}
        </div>
        {/* Footer */}
        <footer className="mt-16 text-center text-blue-100 text-base animate-fade-in-slow">
          <p>© 2024 Central Hub. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
