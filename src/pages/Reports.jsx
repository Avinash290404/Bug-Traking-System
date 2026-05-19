import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";

function Reports() {
  const [summary, setSummary] = useState({
    total: 0,
    critical: 0,
    resolved: 0,
    developers: 0,
  });

  useEffect(() => {
    const bugs =
      JSON.parse(localStorage.getItem("bugs")) || [];

    const developers =
      JSON.parse(localStorage.getItem("developers")) || [];

    setSummary({
      total: bugs.length,
      critical: bugs.filter(
        (bug) => bug.severity === "Critical"
      ).length,
      resolved: bugs.filter(
        (bug) => bug.status === "Resolved"
      ).length,
      developers: developers.length,
    });
  }, []);

  return (
    <div style={container}>
      <Sidebar />

      <div style={main}>
        <h1 style={title}>
          Reports & Analytics
        </h1>

        <p style={subtitle}>
          Performance insights and bug tracking analytics
        </p>

        {/* Summary Cards */}
        <div style={cardGrid}>
          <div style={card}>
            <p style={cardTitle}>Total Bugs</p>
            <h2 style={{ color: "#06b6d4" }}>
              {summary.total}
            </h2>
          </div>

          <div style={card}>
            <p style={cardTitle}>Critical Bugs</p>
            <h2 style={{ color: "#ef4444" }}>
              {summary.critical}
            </h2>
          </div>

          <div style={card}>
            <p style={cardTitle}>Resolved Bugs</p>
            <h2 style={{ color: "#22c55e" }}>
              {summary.resolved}
            </h2>
          </div>

          <div style={card}>
            <p style={cardTitle}>Developers</p>
            <h2 style={{ color: "#eab308" }}>
              {summary.developers}
            </h2>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div style={chartBox}>
          <h2 style={{ marginBottom: "20px" }}>
            Severity Analytics
          </h2>

          <div style={chartPlaceholder}>
            📊 Charts Section
            <br />
            (Pie Chart / Bar Graph / Trend Analysis)
          </div>
        </div>

        {/* Performance Overview */}
        <div style={performanceBox}>
          <h2 style={{ marginBottom: "20px" }}>
            Performance Overview
          </h2>

          <div style={performanceItem}>
            ✔ Bug Resolution Efficiency: High
          </div>

          <div style={performanceItem}>
            ⚠ Critical Bug Response Time: Moderate
          </div>

          <div style={performanceItem}>
            🚀 Developer Productivity: Strong
          </div>

          <div style={performanceItem}>
            🔐 System Stability Score: 92%
          </div>
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
  marginBottom: "30px",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  marginBottom: "30px",
};

const card = {
  backgroundColor: "#111827",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
};

const cardTitle = {
  color: "#94a3b8",
  marginBottom: "10px",
};

const chartBox = {
  backgroundColor: "#111827",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
  marginBottom: "30px",
};

const chartPlaceholder = {
  height: "250px",
  backgroundColor: "#0f172a",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#94a3b8",
  fontSize: "18px",
};

const performanceBox = {
  backgroundColor: "#111827",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
};

const performanceItem = {
  backgroundColor: "#0f172a",
  padding: "14px",
  borderRadius: "10px",
  marginBottom: "14px",
};

export default Reports;