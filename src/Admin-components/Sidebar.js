// src/Admin-components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUserMd, FaProcedures, FaCalendarCheck } from "react-icons/fa";
import "./sidebar.css";

function Sidebar({ active, closeSidebar }) {
  return (
    <div className={active ? "sidebar active" : "sidebar"}>
      <Link to="/" className="sidebar-link" onClick={closeSidebar}>
        <FaTachometerAlt className="sidebar-icon" /> <span className="sidebar-text">Dashboard</span>
      </Link>

      <Link to="/doctors" className="sidebar-link" onClick={closeSidebar}>
        <FaUserMd className="sidebar-icon" /> <span className="sidebar-text">Doctors</span>
      </Link>

      <Link to="/patients" className="sidebar-link" onClick={closeSidebar}>
        <FaProcedures className="sidebar-icon" /> <span className="sidebar-text">Patients</span>
      </Link>

      <Link to="/appointments" className="sidebar-link" onClick={closeSidebar}>
        <FaCalendarCheck className="sidebar-icon" /> <span className="sidebar-text">Appointments</span>
      </Link>
    </div>
  );
}

export default Sidebar;