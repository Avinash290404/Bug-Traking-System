import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BugManagement from "./pages/BugManagement";
import DeveloperManagement from "./pages/DeveloperManagement";
import ProjectManagement from "./pages/ProjectManagement";
import ActivityLogs from "./pages/ActivityLogs";
import Reports from "./pages/Reports";
import AdminPanel from "./pages/AdminPanel";

/* Protected Route */
function ProtectedRoute({ children }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" />;
  }

  return children;
}

/* Admin Only Route */
function AdminRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bugs"
          element={
            <ProtectedRoute>
              <BugManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/developers"
          element={
            <ProtectedRoute>
              <DeveloperManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activity"
          element={
            <ProtectedRoute>
              <ActivityLogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;