import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const mappedPatients = data.map((user, index) => ({
          id: index + 1,
          name: user.name,
          age: 20 + (user.id % 50),
          phone: user.phone,
          email: user.email,
        }));
        setPatients(mappedPatients);
      });
  }, []);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    setEditingPatient(null);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleSavePatient = (patientData) => {
    if (editingPatient) {
      setPatients((prev) =>
        prev.map((p) => (p.id === editingPatient.id ? { ...patientData, id: editingPatient.id } : p))
      );
    } else {
      const newId = patients.length > 0 ? patients[patients.length - 1].id + 1 : 1;
      setPatients((prev) => [...prev, { ...patientData, id: newId }]);
    }
    setShowModal(false);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setShowModal(true);
  };

  const handleDeletePatient = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      setPatients((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
        <h2>Patients</h2>
        <button
          onClick={handleAddPatient}
          style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#0f4c81", color: "#fff", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px" }}
        >
          <FaPlus /> Add Patient
        </button>
      </div>

      <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
        <FaSearch style={{ fontSize: "16px", color: "#0f4c81" }} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: "5px", border: "1px solid #ccc", width: "100%", maxWidth: "300px", outline: "none" }}
        />
      </div>

      <div className="table-responsive">
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", minWidth: "600px" }}>
        <thead style={{ background: "#0f4c81", color: "white" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Age</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Phone</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{p.id}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{p.name}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{p.age}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{p.phone}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{p.email}</td>
                <td style={{ padding: "8px", border: "1px solid #ddd", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleEditPatient(p)}
                    style={{ background: "#0f4c81", color: "white", border: "none", borderRadius: "3px", padding: "5px", cursor: "pointer" }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeletePatient(p.id)}
                    style={{ background: "red", color: "white", border: "none", borderRadius: "3px", padding: "5px", cursor: "pointer" }}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>No patients found.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: "8px", width: "500px", maxWidth: "90%", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h2>{editingPatient ? "Edit Patient" : "Add Patient"}</h2>
              <button style={{ background: "transparent", border: "none", fontSize: "18px", cursor: "pointer" }} onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <form
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                handleSavePatient({
                  name: form.name.value,
                  age: parseInt(form.age.value),
                  phone: form.phone.value,
                  email: form.email.value,
                });
              }}
            >
              <label>
                Name
                <input name="name" type="text" defaultValue={editingPatient?.name || ""} required />
              </label>
              <label>
                Age
                <input name="age" type="number" defaultValue={editingPatient?.age || ""} required />
              </label>
              <label>
                Phone
                <input name="phone" type="text" defaultValue={editingPatient?.phone || ""} required />
              </label>
              <label>
                Email
                <input name="email" type="email" defaultValue={editingPatient?.email || ""} required />
              </label>
              <button type="submit" style={{ backgroundColor: "#0f4c81", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>
                {editingPatient ? "Save Changes" : "Add Patient"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Patients;