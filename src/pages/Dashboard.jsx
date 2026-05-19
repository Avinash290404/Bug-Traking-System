import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const role = localStorage.getItem("role");
  const username =
    localStorage.getItem("username") || "User";

  const userInfo =
    role === "admin"
      ? {
          role: "Administrator",
          access: "Full System Access",
        }
      : {
          role: "Developer",
          access: "Bug Resolution Access",
        };

  useEffect(() => {
    const bugs =
      JSON.parse(localStorage.getItem("bugs")) || [];

    const totalBugs = bugs.length;

    const criticalBugs = bugs.filter(
      (bug) => bug.severity === "Critical"
    ).length;

    const openBugs = bugs.filter(
      (bug) => bug.status === "Open"
    ).length;

    const inProgress = bugs.filter(
      (bug) => bug.status === "In Progress"
    ).length;

    const resolved = bugs.filter(
      (bug) => bug.status === "Resolved"
    ).length;

    const developers =
      JSON.parse(
        localStorage.getItem("developers")
      ) || [];

    setStats([
      {
        title: "Total Bugs",
        value: totalBugs,
        color: "#06b6d4",
      },
      {
        title: "Critical Bugs",
        value: criticalBugs,
        color: "#ef4444",
      },
      {
        title: "Open Bugs",
        value: openBugs,
        color: "#f97316",
      },
      {
        title: "In Progress",
        value: inProgress,
        color: "#8b5cf6",
      },
      {
        title: "Resolved",
        value: resolved,
        color: "#22c55e",
      },
      {
        title: "Developers",
        value: developers.length,
        color: "#eab308",
      },
    ]);

    const latest = bugs
      .slice(0, 5)
      .map(
        (bug) =>
          `[${bug.severity}] ${bug.title} - ${bug.status}`
      );

    setRecentActivity(latest);
  }, []);

  const handleNotifications = () => {
    if (recentActivity.length > 0) {
      alert(recentActivity.join("\n"));
    } else {
      alert("No notifications available");
    }
  };

  return (
    <div style={container}>
      <Sidebar />

      <div style={mainContent}>
        {/* Header */}
        <div style={headerBox}>
          <div>
            <h1 style={title}>
              Bug Tracking Dashboard
            </h1>

            <p style={subtitle}>
              Real-time enterprise bug monitoring system
            </p>
          </div>

          <div style={rightHeader}>
            <button
              onClick={handleNotifications}
              style={notificationBtn}
            >
              🔔 Notifications ({recentActivity.length})
            </button>

            <div style={profileCard}>
              <h3>
                👤 {username}
              </h3>

              <p style={profileText}>
                🛡️ Role: {userInfo.role}
              </p>

              <p style={profileText}>
                🔐 Access: {userInfo.access}
              </p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={cardGrid}>
          {stats.map((item, index) => (
            <div
              key={index}
              style={{
                ...cardStyle,
                border: `1px solid ${item.color}`,
              }}
            >
              <p style={cardTitle}>
                {item.title}
              </p>

              <h2
                style={{
                  color: item.color,
                  fontSize: "30px",
                }}
              >
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={activityBox}>
          <h2 style={{ marginBottom: "20px" }}>
            Recent Bug Activity
          </h2>

          {recentActivity.map((item, index) => (
            <div
              key={index}
              style={activityItem}
            >
              {item}
            </div>
          ))}
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

const mainContent = {
  flex: 1,
  padding: "35px",
};

const headerBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "30px",
};

const title = {
  fontSize: "34px",
};

const subtitle = {
  color: "#94a3b8",
  marginTop: "8px",
};

const rightHeader = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  alignItems: "flex-end",
};

const notificationBtn = {
  backgroundColor: "#111827",
  padding: "14px 22px",
  borderRadius: "12px",
  border: "1px solid #ef4444",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const profileCard = {
  backgroundColor: "#111827",
  padding: "20px",
  borderRadius: "14px",
  border: "1px solid #06b6d4",
  minWidth: "260px",
};

const profileText = {
  color: "#cbd5e1",
  marginTop: "8px",
  fontSize: "14px",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginBottom: "35px",
};

const cardStyle = {
  backgroundColor: "#111827",
  padding: "24px",
  borderRadius: "14px",
};

const cardTitle = {
  color: "#94a3b8",
  marginBottom: "10px",
};

const activityBox = {
  backgroundColor: "#111827",
  padding: "24px",
  borderRadius: "14px",
  border: "1px solid #1e293b",
};

const activityItem = {
  backgroundColor: "#0f172a",
  padding: "14px",
  borderRadius: "10px",
  marginBottom: "12px",
  borderLeft: "4px solid #ef4444",
};

export default Dashboard;