// src/Admin-components/Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaSignOutAlt, FaBars } from "react-icons/fa";
import { GiStethoscope } from "react-icons/gi";

import "./header.css";

function Header({ toggleSidebar }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <header className="header">
      {/* Left: Hamburger + Logo */}
      <div className="header-left">
        <FaBars onClick={toggleSidebar} style={{ cursor: "pointer", marginRight: "10px" }} />
        <GiStethoscope  className="logo-icon" />
        <h2 className="logo-text">MedLab Admin</h2>
      </div>

      {/* Center: Search (Removed as per request) */}

      {/* Right: Date/Time + Notification + Profile + Logout */}
      <div className="header-right">
        <div className="date-time">{formattedDate} | {formattedTime}</div>
        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>
        <Link to="/login" className="logout-btn" style={{ display: "flex", alignItems: "center", gap: "5px", textDecoration: "none", color: "red" }}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </Link>
      </div>
    </header>
  );
}

export default Header;