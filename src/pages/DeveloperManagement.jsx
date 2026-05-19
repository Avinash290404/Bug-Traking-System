import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";

function DeveloperManagement() {
  const [developers, setDevelopers] = useState([]);

  const [newDeveloper, setNewDeveloper] = useState({
    name: "",
    email: "",
    status: "Active",
  });

  useEffect(() => {
    const savedDevelopers =
      JSON.parse(localStorage.getItem("developers")) || [];

    setDevelopers(savedDevelopers);
  }, []);

  const handleChange = (e) => {
    setNewDeveloper({
      ...newDeveloper,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDeveloper = () => {
    if (
      !newDeveloper.name ||
      !newDeveloper.email
    ) {
      alert("Please fill all fields");
      return;
    }

    const createdDeveloper = {
      id: `DEV-${developers.length + 1}`,
      ...newDeveloper,
      assignedBugs: 0,
    };

    const updatedDevelopers = [
      createdDeveloper,
      ...developers,
    ];

    localStorage.setItem(
      "developers",
      JSON.stringify(updatedDevelopers)
    );

    setDevelopers(updatedDevelopers);

    setNewDeveloper({
      name: "",
      email: "",
      status: "Active",
    });
  };

  const handleDelete = (id) => {
    const updated = developers.filter(
      (dev) => dev.id !== id
    );

    localStorage.setItem(
      "developers",
      JSON.stringify(updated)
    );

    setDevelopers(updated);
  };

  return (
    <div style={container}>
      <Sidebar />

      <div style={main}>
        <h1 style={title}>
          Developer Management
        </h1>

        <p style={subtitle}>
          Manage developers and bug assignments
        </p>

        {/* Add Developer Form */}
        <div style={formBox}>
          <input
            type="text"
            name="name"
            placeholder="Developer Name"
            value={newDeveloper.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Developer Email"
            value={newDeveloper.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="status"
            value={newDeveloper.status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Active</option>
            <option>Busy</option>
            <option>On Leave</option>
          </select>

          <button
            onClick={handleAddDeveloper}
            style={addBtn}
          >
            Add Developer
          </button>
        </div>

        {/* Developer Table */}
        <div style={tableBox}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Developer ID</th>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Assigned Bugs</th>
                <th style={th}>Status</th>
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {developers.map((dev) => (
                <tr key={dev.id}>
                  <td style={td}>{dev.id}</td>
                  <td style={td}>{dev.name}</td>
                  <td style={td}>{dev.email}</td>
                  <td style={td}>{dev.assignedBugs}</td>
                  <td style={td}>{dev.status}</td>

                  <td style={td}>
                    <button
                      onClick={() =>
                        handleDelete(dev.id)
                      }
                      style={deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#050816",
  color: "white",
};

const main = {
  flex: 1,
  padding: "35px",
};

const title = {
  fontSize: "32px",
};

const subtitle = {
  color: "#94a3b8",
  marginBottom: "20px",
};

const formBox = {
  backgroundColor: "#111827",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  marginBottom: "30px",
  display: "grid",
  gridTemplateColumns: "2fr 2fr 1fr auto",
  gap: "15px",
  alignItems: "end",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid #374151",
  backgroundColor: "#0f172a",
  color: "white",
};

const addBtn = {
  padding: "14px 24px",
  backgroundColor: "#22c55e",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  height: "50px",
};

const tableBox = {
  backgroundColor: "#111827",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  overflowX: "auto",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  textAlign: "left",
  padding: "14px",
  borderBottom: "1px solid #374151",
  color: "#94a3b8",
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #374151",
};

const deleteBtn = {
  padding: "8px 14px",
  backgroundColor: "#ef4444",
  border: "none",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
};

export default DeveloperManagement;