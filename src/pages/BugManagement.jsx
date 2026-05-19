import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";

function BugManagement() {
  const [bugs, setBugs] = useState([]);
  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    severity: "High",
    priority: "P2",
    assignedTo: "",
    status: "Open",
    project: "",
    reportedDate: "",
  });

  useEffect(() => {
    const savedBugs =
      JSON.parse(localStorage.getItem("bugs")) || [];

    setBugs(savedBugs);
  }, []);

  const handleChange = (e) => {
    setNewBug({
      ...newBug,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBug = () => {
    if (
      !newBug.title ||
      !newBug.description ||
      !newBug.assignedTo ||
      !newBug.project ||
      !newBug.reportedDate
    ) {
      alert("Please fill all fields");
      return;
    }

    const createdBug = {
      id: `BUG-${bugs.length + 1}`,
      ...newBug,
    };

    const updatedBugs = [
      createdBug,
      ...bugs,
    ];

    localStorage.setItem(
      "bugs",
      JSON.stringify(updatedBugs)
    );

    setBugs(updatedBugs);

    setNewBug({
      title: "",
      description: "",
      severity: "High",
      priority: "P2",
      assignedTo: "",
      status: "Open",
      project: "",
      reportedDate: "",
    });
  };

  const handleDelete = (id) => {
    const updated = bugs.filter(
      (bug) => bug.id !== id
    );

    localStorage.setItem(
      "bugs",
      JSON.stringify(updated)
    );

    setBugs(updated);
  };

  const handleExportCSV = () => {
    const headers = [
      "Bug ID",
      "Title",
      "Severity",
      "Priority",
      "Assigned To",
      "Status",
      "Project",
      "Reported Date",
    ];

    const rows = bugs.map((bug) => [
      bug.id,
      bug.title,
      bug.severity,
      bug.priority,
      bug.assignedTo,
      bug.status,
      bug.project,
      bug.reportedDate,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      "bug-report.csv"
    );

    document.body.appendChild(link);
    link.click();
  };

  return (
    <div style={container}>
      <Sidebar />

      <div style={main}>
        <h1 style={title}>
          Bug Management
        </h1>

        <p style={subtitle}>
          Manage bugs, assignments, and issue tracking
        </p>

        <button
          onClick={handleExportCSV}
          style={exportBtn}
        >
          Export Bug Report
        </button>

        {/* Add Bug Form */}
        <div style={formBox}>
          <input
            type="text"
            name="title"
            placeholder="Bug Title"
            value={newBug.title}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="description"
            placeholder="Bug Description"
            value={newBug.description}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="severity"
            value={newBug.severity}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            name="priority"
            value={newBug.priority}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>P1</option>
            <option>P2</option>
            <option>P3</option>
            <option>P4</option>
          </select>

          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned Developer"
            value={newBug.assignedTo}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="status"
            value={newBug.status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Testing</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>

          <input
            type="text"
            name="project"
            placeholder="Project Name"
            value={newBug.project}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="date"
            name="reportedDate"
            value={newBug.reportedDate}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            onClick={handleAddBug}
            style={addBtn}
          >
            Add Bug
          </button>
        </div>

        {/* Table */}
        <div style={tableBox}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Bug ID</th>
                <th style={th}>Title</th>
                <th style={th}>Severity</th>
                <th style={th}>Priority</th>
                <th style={th}>Assigned</th>
                <th style={th}>Status</th>
                <th style={th}>Project</th>
                <th style={th}>Date</th>
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {bugs.map((bug) => (
                <tr key={bug.id}>
                  <td style={td}>{bug.id}</td>
                  <td style={td}>{bug.title}</td>
                  <td style={td}>{bug.severity}</td>
                  <td style={td}>{bug.priority}</td>
                  <td style={td}>{bug.assignedTo}</td>
                  <td style={td}>{bug.status}</td>
                  <td style={td}>{bug.project}</td>
                  <td style={td}>{bug.reportedDate}</td>

                  <td style={td}>
                    <button
                      onClick={() =>
                        handleDelete(bug.id)
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

const exportBtn = {
  padding: "12px 22px",
  backgroundColor: "#8b5cf6",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "25px",
};

const formBox = {
  backgroundColor: "#111827",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  marginBottom: "30px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "15px",
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
  padding: "14px",
  backgroundColor: "#22c55e",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
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

export default BugManagement;