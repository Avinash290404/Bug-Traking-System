import React from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const username =
    localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div style={sidebar}>
      <div>
        {/* Logo */}
        <div style={logoBox}>
          <h1 style={logo}>BugTracker Pro</h1>
          <p style={subLogo}>
            Enterprise Management System
          </p>
        </div>

        {/* User Info */}
        <div style={userBox}>
          <p style={{ fontWeight: "bold" }}>
            👤 {username}
          </p>
          <p style={{ color: "#94a3b8" }}>
            🔐 {role?.toUpperCase()}
          </p>
        </div>

        {/* Navigation */}
        <div style={navBox}>
          <Link to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>

          <Link to="/bugs" style={linkStyle}>
            Bug Management
          </Link>

          <Link to="/developers" style={linkStyle}>
            Developer Management
          </Link>

          <Link to="/projects" style={linkStyle}>
            Project Management
          </Link>

          <Link to="/activity" style={linkStyle}>
            Activity Logs
          </Link>

          <Link to="/reports" style={linkStyle}>
            Reports
          </Link>

          {role === "admin" && (
            <Link to="/admin" style={linkStyle}>
              Admin Panel
            </Link>
          )}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={logoutBtn}
      >
        Logout
      </button>
    </div>
  );
}

const sidebar = {
  width: "280px",
  minHeight: "100vh",
  backgroundColor: "#0b1120",
  padding: "30px 20px",
  borderRight: "1px solid #1e293b",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const logoBox = {
  marginBottom: "30px",
};

const logo = {
  color: "#06b6d4",
  fontSize: "28px",
  fontWeight: "bold",
};

const subLogo = {
  color: "#94a3b8",
  fontSize: "14px",
};

const userBox = {
  backgroundColor: "#111827",
  padding: "18px",
  borderRadius: "12px",
  marginBottom: "30px",
  border: "1px solid #1e293b",
};

const navBox = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const linkStyle = {
  padding: "15px 18px",
  borderRadius: "12px",
  textDecoration: "none",
  color: "#ffffff",
  backgroundColor: "#111827",
  border: "1px solid #1f2937",
  fontWeight: "600",
  fontSize: "15px",
};

const logoutBtn = {
  padding: "14px",
  backgroundColor: "#ef4444",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px",
};

export default Sidebar;