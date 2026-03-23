// src/admin-pages/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

// Chart.js imports
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Icons for cards
import { MdLocalHospital, MdPeople, MdEventNote, MdToday } from "react-icons/md";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    todayBookings: 0,
  });

  useEffect(() => {
    // Dummy API call
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        setData({
          doctors: 12,
          patients: 34,
          appointments: 18,
          todayBookings: 5
        });
      })
      .catch(err => console.log(err));
  }, []);

  // Chart data
  const chartData = {
    labels: ["Doctors", "Patients", "Appointments", "Today's Bookings"],
    datasets: [
      {
        label: "Counts",
        data: [data.doctors, data.patients, data.appointments, data.todayBookings],
        backgroundColor: "#d4ab7d", // single color for bars
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Dashboard Summary",
        font: { size: 18 }
      }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 5 } }
    }
  };

  return (
    <div className="dashboard">
      <div className="cards">
        {/* Total Doctors */}
        <div className="card-hover card-one">
          <div className="card-header">
            <MdLocalHospital size={30} />
          </div>
          <h3>Total Doctors</h3>
          <p>{data.doctors}</p>
        </div>

        {/* Total Patients */}
        <div className="card-hover card-two">
          <div className="card-header" style={{ backgroundColor: "#7fb77e" }}>
            <MdPeople size={30} />
          </div>
          <h3>Total Patients</h3>
          <p>{data.patients}</p>
        </div>

        {/* Total Appointments */}
        <div className="card-hover card-three">
          <div className="card-header" style={{ backgroundColor: "#ff8b94" }}>
            <MdEventNote size={30} />
          </div>
          <h3>Total Appointments</h3>
          <p>{data.appointments}</p>
        </div>

        {/* Today's Bookings */}
        <div className="card-hover card-four">
          <div className="card-header" style={{ backgroundColor: "#e0c64d" }}>
            <MdToday size={30} />
          </div>
          <h3>Today's Bookings</h3>
          <p>{data.todayBookings}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="chart">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Dashboard;