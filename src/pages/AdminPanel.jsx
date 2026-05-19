import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "developer",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const savedUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    setUsers(savedUsers);
  };

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.password
    ) {
      setMessage("Please fill all fields");
      return;
    }

    const userExists = users.find(
      (user) => user.email === newUser.email
    );

    if (userExists) {
      setMessage("User already exists");
      return;
    }

    const updatedUsers = [
      ...users,
      newUser,
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUsers(updatedUsers);

    setMessage("User created successfully");

    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "developer",
    });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter(
      (user) => user.email !== email
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUsers(updatedUsers);
  };

  return (
    <div style={container}>
      <Sidebar />

      <div style={main}>
        <h1 style={title}>
          Admin Panel
        </h1>

        <p style={subtitle}>
          Manage users, roles, and system access
        </p>

        {message && (
          <div style={messageBox}>
            {message}
          </div>
        )}

        {/* Create User Form */}
        <div style={formBox}>
          <h2 style={{ marginBottom: "20px" }}>
            Create New User
          </h2>

          <div style={grid}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={newUser.name}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={newUser.email}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="role"
              value={newUser.role}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="admin">
                Admin
              </option>
              <option value="developer">
                Developer
              </option>
            </select>

            <button
              onClick={handleCreateUser}
              style={createBtn}
            >
              Create User
            </button>
          </div>
        </div>

        {/* User Table */}
        <div style={tableBox}>
          <h2 style={{ marginBottom: "20px" }}>
            User Management
          </h2>

          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Role</th>
                <th style={th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td style={td}>{user.name}</td>
                  <td style={td}>{user.email}</td>
                  <td style={td}>{user.role}</td>

                  <td style={td}>
                    <button
                      onClick={() =>
                        handleDeleteUser(user.email)
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
  marginBottom: "25px",
};

const formBox = {
  backgroundColor: "#111827",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
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

const createBtn = {
  padding: "14px",
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

const messageBox = {
  backgroundColor: "#16a34a",
  padding: "14px",
  borderRadius: "10px",
  marginBottom: "20px",
  fontWeight: "bold",
};

export default AdminPanel;