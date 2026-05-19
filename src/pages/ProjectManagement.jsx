import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";

function ProjectManagement() {
  const [projects, setProjects] = useState([]);

  const [newProject, setNewProject] = useState({
    name: "",
    priority: "High",
    assignedDeveloper: "",
    deadline: "",
    status: "Active",
  });

  useEffect(() => {
    const savedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    setProjects(savedProjects);
  }, []);

  const handleChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProject = () => {
    if (
      !newProject.name ||
      !newProject.assignedDeveloper ||
      !newProject.deadline
    ) {
      alert("Please fill all fields");
      return;
    }

    const createdProject = {
      id: `PROJ-${projects.length + 1}`,
      ...newProject,
    };

    const updatedProjects = [
      createdProject,
      ...projects,
    ];

    localStorage.setItem(
      "projects",
      JSON.stringify(updatedProjects)
    );

    setProjects(updatedProjects);

    setNewProject({
      name: "",
      priority: "High",
      assignedDeveloper: "",
      deadline: "",
      status: "Active",
    });
  };

  const handleDelete = (id) => {
    const updated = projects.filter(
      (project) => project.id !== id
    );

    localStorage.setItem(
      "projects",
      JSON.stringify(updated)
    );

    setProjects(updated);
  };

  return (
    <div style={container}>
      <Sidebar />

      <div style={main}>
        <h1 style={title}>
          Project Management
        </h1>

        <p style={subtitle}>
          Manage projects, deadlines, and assignments
        </p>

        {/* Add Project Form */}
        <div style={formBox}>
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={newProject.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="priority"
            value={newProject.priority}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="text"
            name="assignedDeveloper"
            placeholder="Assigned Developer"
            value={newProject.assignedDeveloper}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="date"
            name="deadline"
            value={newProject.deadline}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="status"
            value={newProject.status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Active</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>On Hold</option>
          </select>

          <button
            onClick={handleAddProject}
            style={addBtn}
          >
            Create Project
          </button>
        </div>

        {/* Project Table */}
        <div style={tableBox}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Project ID</th>
                <th style={th}>Project Name</th>
                <th style={th}>Priority</th>
                <th style={th}>Assigned Developer</th>
                <th style={th}>Deadline</th>
                <th style={th}>Status</th>
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td style={td}>{project.id}</td>
                  <td style={td}>{project.name}</td>
                  <td style={td}>{project.priority}</td>
                  <td style={td}>
                    {project.assignedDeveloper}
                  </td>
                  <td style={td}>{project.deadline}</td>
                  <td style={td}>{project.status}</td>

                  <td style={td}>
                    <button
                      onClick={() =>
                        handleDelete(project.id)
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

export default ProjectManagement;