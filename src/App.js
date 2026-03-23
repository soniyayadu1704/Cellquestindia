import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Admin-components/Header";
import Sidebar from "./Admin-components/Sidebar";


import Dashboard from "./admin-pages/Dashboard";
import Doctors from "./admin-pages/Doctors";
import Patients from "./admin-pages/Patients";
import Appointments from "./admin-pages/Appointments";
import Login from "./admin-pages/Login";

import "./App.css";

function App() {
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
        <BrowserRouter>
            <div className="app-container">
                {/* Header full width */}
                <Header toggleSidebar={toggleSidebar} />

                {/* Below header: Sidebar + Main Content */}
                <div className="content-container">
                    <Sidebar active={isSidebarActive} closeSidebar={() => setIsSidebarActive(false)} />

                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/doctors" element={<Doctors />} />
                            <Route path="/patients" element={<Patients />} />
                            <Route path="/appointments" element={<Appointments />} />
                            <Route path="/login" element={<Login />} />
                            

                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;