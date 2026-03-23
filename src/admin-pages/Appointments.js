import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaEye, FaTimes } from "react-icons/fa";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Helper to get random status
  const getRandomStatus = () => {
    const statuses = ["Pending", "Confirmed", "Canceled"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  // Fetch dummy API with random status
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        const mappedAppointments = data.map((user, index) => ({
          id: index + 1, // sequential ID
          patient: user.name,
          doctor:
            "Dr. " +
            ["Alice Smith", "Bob Johnson", "Carol Lee", "David Brown"][
              user.id % 4
            ],
          date: `2026-03-${25 + (user.id % 5)} ${10 + (user.id % 8)}:00`,
          status: getRandomStatus(),
        }));
        setAppointments(mappedAppointments);
      })
      .catch(err => console.error("Error fetching appointments:", err));
  }, []);

  const filteredAppointments = appointments.filter(
    a =>
      a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal open/close
  const handleAddAppointment = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Add new appointment with sequential ID
  const handleAddNew = (newAppointment) => {
    const newId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 1;
    setAppointments(prev => [...prev, { ...newAppointment, id: newId }]);
  };

  // Action handlers
  const handleConfirm = (id) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: "Confirmed" } : a))
    );
  };

  const handleCancel = (id) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: "Canceled" } : a))
    );
  };

  const handleDelete = (id) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleView = (appointment) => {
    alert(
      `Viewing appointment:\nPatient: ${appointment.patient}\nDoctor: ${appointment.doctor}\nDate: ${appointment.date}`
    );
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "orange";
    if (status === "Confirmed") return "green";
    if (status === "Canceled") return "red";
    return "black";
  };

  return (
    <div>
      {/* Header with Add button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <h2>Appointments</h2>
        <button
          onClick={handleAddAppointment}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backgroundColor: "#0f4c81",
            color: "white",
            padding: "8px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          <FaPlus /> Add Appointment
        </button>
      </div>

      {/* Search */}
      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FaSearch style={{ fontSize: "16px", color: "#0f4c81" }} />
        <input
          type="text"
          placeholder="Search by patient or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: "300px",
            outline: "none",
          }}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", minWidth: "800px" }}>
        <thead style={{ background: "#0f4c81", color: "white" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Patient</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Doctor</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date & Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((a) => (
              <tr key={a.id}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{a.id}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{a.patient}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{a.doctor}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{a.date}</td>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    color: getStatusColor(a.status),
                    fontWeight: "bold",
                  }}
                >
                  {a.status}
                </td>
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  {a.status === "Pending" && (
                    <>
                      <button
                        style={{
                          background: "green",
                          color: "white",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                          padding: "5px",
                        }}
                        onClick={() => handleConfirm(a.id)}
                      >
                        Confirm
                      </button>
                      <button
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                          padding: "5px",
                        }}
                        onClick={() => handleCancel(a.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {a.status === "Confirmed" && (
                    <button
                      style={{
                        background: "#0f4c81",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        padding: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                      onClick={() => handleView(a)}
                    >
                      <FaEye /> View
                    </button>
                  )}
                  {a.status === "Canceled" && (
                    <button
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                        padding: "5px",
                      }}
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>
                Loading appointments...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {/* Add Appointment Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              width: "500px",
              maxWidth: "90%",
              padding: "20px",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2>Add Appointment</h2>
              <button style={{ background: "transparent", border: "none", fontSize: "18px", cursor: "pointer" }} onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <form
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const newAppointment = {
                  patient: form.patient.value,
                  doctor: form.doctor.value,
                  date: form.date.value + " " + form.time.value,
                  status: form.status.value,
                };
                handleAddNew(newAppointment);
                handleCloseModal();
              }}
            >
              <label>
                Patient Name
                <input name="patient" type="text" placeholder="Enter patient name" required />
              </label>

              <label>
                Doctor
                <select name="doctor" required>
                  <option value="">Select Doctor</option>
                  <option value="Dr. Alice Smith">Dr. Alice Smith</option>
                  <option value="Dr. Bob Johnson">Dr. Bob Johnson</option>
                  <option value="Dr. Carol Lee">Dr. Carol Lee</option>
                  <option value="Dr. David Brown">Dr. David Brown</option>
                </select>
              </label>

              <div style={{ display: "flex", gap: "10px" }}>
                <label style={{ flex: 1 }}>
                  Date
                  <input name="date" type="date" required />
                </label>
                <label style={{ flex: 1 }}>
                  Time
                  <input name="time" type="time" required />
                </label>
              </div>

              <label>
                Status
                <select name="status">
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </label>

              <button
                type="submit"
                style={{
                  backgroundColor: "#0f4c81",
                  color: "#fff",
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Add Appointment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;