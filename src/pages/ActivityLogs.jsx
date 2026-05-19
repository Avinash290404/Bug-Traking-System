import React, { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";

const defaultLogs = [
  {
    action: "Created Bug",
    performedBy: "Administrator",
    target: "BUG-001",
    time: "10:45 AM",
    status: "Success",
  },
  {
    action: "Assigned Developer",
    performedBy: "Administrator",
    target: "DEV-002",
    time: "11:10 AM",
    status: "Success",
  },
  {
    action: "Deleted Project",
    performedBy: "Administrator",
    target: "PROJ-003",
    time: "12:30 PM",
    status: "Success",
  },
];

function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const savedLogs =
      JSON.parse(localStorage.getItem("activityLogs")) || [];

    if (savedLogs.length > 0) {
      setLogs(savedLogs);
    } else {
      localStorage.setItem(
        "activityLogs",
        JSON.stringify(defaultLogs)
      );
      setLogs(defaultLogs);
    }
  }, []);

  return (
    <div style={container}>
      <Sidebar />

      <div style={main}>
        <h1 style={title}>
          Activity Logs
        </h1>

        <p style={subtitle}>
          Audit trail for all important system actions
        </p>

        <div style={tableBox}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Action</th>
                <th style={th}>Performed By</th>
                <th style={th}>Target</th>
                <th style={th}>Time</th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td style={td}>{log.action}</td>
                  <td style={td}>{log.performedBy}</td>
                  <td style={td}>{log.target}</td>
                  <td style={td}>{log.time}</td>
                  <td style={td}>
                    <span style={statusBadge}>
                      {log.status}
                    </span>
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

const statusBadge = {
  backgroundColor: "#16a34a",
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "13px",
  fontWeight: "bold",
};

export default ActivityLogs;