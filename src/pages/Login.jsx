import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.length === 0) {
      const defaultUsers = [
        {
          name: "Administrator",
          email: "admin@gmail.com",
          password: "admin123",
          role: "admin",
        },
        {
          name: "Developer",
          email: "developer@gmail.com",
          password: "dev123",
          role: "developer",
        },
      ];

      localStorage.setItem(
        "users",
        JSON.stringify(defaultUsers)
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password
    );

    if (foundUser) {
      localStorage.setItem("role", foundUser.role);
      localStorage.setItem("username", foundUser.name);

      navigate("/dashboard");
      return;
    }

    setError("Invalid email or password");
  };

  return (
    <div style={container}>
      <div style={loginBox}>
        <h1 style={title}>BugTracker Pro</h1>

        <p style={subtitle}>
          Enterprise Bug Management System
        </p>

        {error && (
          <div style={errorBox}>
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          style={loginBtn}
        >
          Login
        </button>

        <div style={demoBox}>
          <p>
            <strong>Admin Login</strong>
          </p>
          <p>admin@gmail.com / admin123</p>

          <br />

          <p>
            <strong>Developer Login</strong>
          </p>
          <p>developer@gmail.com / dev123</p>
        </div>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  backgroundColor: "#050816",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const loginBox = {
  width: "450px",
  backgroundColor: "#111827",
  padding: "40px",
  borderRadius: "16px",
  border: "1px solid #1e293b",
  boxShadow: "0 0 30px rgba(0,0,0,0.3)",
};

const title = {
  fontSize: "32px",
  color: "#06b6d4",
  marginBottom: "10px",
  textAlign: "center",
};

const subtitle = {
  color: "#94a3b8",
  marginBottom: "30px",
  textAlign: "center",
};

const errorBox = {
  backgroundColor: "#7f1d1d",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "20px",
  color: "white",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #374151",
  backgroundColor: "#0f172a",
  color: "white",
};

const loginBtn = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#06b6d4",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "20px",
};

const demoBox = {
  backgroundColor: "#0f172a",
  padding: "18px",
  borderRadius: "10px",
  color: "#cbd5e1",
  fontSize: "14px",
};

export default Login;