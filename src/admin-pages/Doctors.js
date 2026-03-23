import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Fetch dummy API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const mappedDoctors = data.map((user, index) => ({
          id: index + 1, // sequential ID
          name: "Dr. " + user.name,
          specialty: ["Cardiology", "Neurology", "Pediatrics", "Radiology"][index % 4],
          phone: user.phone,
          email: user.email,
          availability: ["Mon-Fri", "Tue-Thu", "Wed-Fri"][index % 3],
        }));
        setDoctors(mappedDoctors);
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    setEditingDoctor(null); // adding new doctor
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleSaveDoctor = (doctorData) => {
    if (editingDoctor) {
      // Update existing doctor
      setDoctors((prev) =>
        prev.map((d) => (d.id === editingDoctor.id ? { ...doctorData, id: editingDoctor.id } : d))
      );
    } else {
      // Add new doctor with sequential ID
      const newId = doctors.length > 0 ? doctors[doctors.length - 1].id + 1 : 1;
      setDoctors((prev) => [...prev, { ...doctorData, id: newId }]);
    }
    setShowModal(false);
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setShowModal(true);
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <div>
      {/* Header with Add button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <h2>Doctors</h2>
        <button
          onClick={handleAddDoctor}
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
          <FaPlus /> Add Doctor
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
        <FaSearch style={{ fontSize: "16px", color: "#0f4c81" }} />
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%", maxWidth: "300px", outline: "none" }}
        />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", minWidth: "700px" }}>
        <thead style={{ background: "#0f4c81", color: "white" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Specialty</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Phone</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Availability</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <tr key={doc.id}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{doc.id}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{doc.name}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{doc.specialty}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{doc.phone}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{doc.email}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{doc.availability}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleEditDoctor(doc)}
                    style={{ background: "#0f4c81", color: "white", border: "none", borderRadius: "3px", cursor: "pointer", padding: "5px", display: "flex", alignItems: "center", gap: "3px" }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDoctor(doc.id)}
                    style={{ background: "red", color: "white", border: "none", borderRadius: "3px", cursor: "pointer", padding: "5px", display: "flex", alignItems: "center", gap: "3px" }}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "10px", textAlign: "center" }}>
                Loading doctors...
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {/* Add/Edit Doctor Modal */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: "8px", width: "500px", maxWidth: "90%", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2>{editingDoctor ? "Edit Doctor" : "Add Doctor"}</h2>
              <button style={{ background: "transparent", border: "none", fontSize: "18px", cursor: "pointer" }} onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <form
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                handleSaveDoctor({
                  name: form.name.value,
                  specialty: form.specialty.value,
                  phone: form.phone.value,
                  email: form.email.value,
                  availability: form.availability.value,
                });
              }}
            >
              <label>
                Name
                <input name="name" type="text" placeholder="Enter doctor's name" defaultValue={editingDoctor?.name || ""} required />
              </label>

              <label>
                Specialty
                <select name="specialty" defaultValue={editingDoctor?.specialty || ""} required>
                  <option value="">Select Specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Radiology">Radiology</option>
                </select>
              </label>

              <label>
                Phone
                <input name="phone" type="text" placeholder="Enter phone number" defaultValue={editingDoctor?.phone || ""} required />
              </label>

              <label>
                Email
                <input name="email" type="email" placeholder="Enter email" defaultValue={editingDoctor?.email || ""} required />
              </label>

              <label>
                Availability
                <select name="availability" defaultValue={editingDoctor?.availability || ""} required>
                  <option value="">Select Availability</option>
                  <option value="Mon-Fri">Mon-Fri</option>
                  <option value="Tue-Thu">Tue-Thu</option>
                  <option value="Wed-Fri">Wed-Fri</option>
                </select>
              </label>

              <button type="submit" style={{ backgroundColor: "#0f4c81", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>
                {editingDoctor ? "Save Changes" : "Add Doctor"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;