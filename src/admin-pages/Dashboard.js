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
    axios.get("https://jsonplaceholder.typicode.com/users") // dummy API
      .then(res => {
        // Here, just simulating values from API
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
        backgroundColor: ["#d4ab7d"], 
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Dashboard Summary",
        font: { size: 18 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5 } // adjust step size if needed
      }
    }
  };

  return (
    <div className="dashboard">
     

      <div className="cards">
        <div className="card-hover card-one">
          <h3>Total Doctors</h3>
          <p>{data.doctors}</p>
        </div>
        <div className="card-hover card-two">
          <h3>Total Patients</h3>
          <p>{data.patients}</p>
        </div>
        <div className="card-hover card-three">
          <h3>Total Appointments</h3>
          <p>{data.appointments}</p>
        </div>
        <div className="card-hover card-four">
          <h3>Today's Bookings</h3>
          <p>{data.todayBookings}</p>
        </div>
      </div>

      <div className="chart">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Dashboard;