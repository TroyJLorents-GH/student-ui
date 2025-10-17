import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronLeft, ChevronRight, Home, Users, LogIn, LogOut, Upload, LayoutDashboard } from "lucide-react";

export default function Navbar({ collapsed, setCollapsed, isAuthenticated, onLogout }) {
  const sidebarWidth = collapsed ? 60 : 250;

  return (
    <div style={{
      width: sidebarWidth,
      backgroundColor: '#191970',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.2s',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      zIndex: 99,
      borderRight: '8px solid #88888dff'
    }}>
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          padding: 16,
          alignSelf: collapsed ? 'center' : 'flex-end',
          fontSize: 22
        }}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <Link to="/" style={linkStyle(collapsed)}>
              <Home size={22} />
              {!collapsed && <span>Home</span>}
            </Link>
          </li>

          <li>
            <Link to="/quick-assign" style={linkStyle(collapsed)}>
              <Users size={22} />
              {!collapsed && <span>Quick Assign</span>}
            </Link>
          </li>

          <li>
            <Link to="/manage-assignments" style={linkStyle(collapsed)}>
              <Menu size={22} />
              {!collapsed && <span>Manage Student Assignments</span>}
            </Link>
          </li>

          <li>
            <Link to="/applications" style={linkStyle(collapsed)}>
              <Menu size={22} />
              {!collapsed && <span>Applications</span>}
            </Link>
          </li>

          <li>
            <Link to="/student-summary" style={linkStyle(collapsed)}>
              <Menu size={22} />
              {!collapsed && <span>Student Class Summary</span>}
            </Link>
          </li>

          <li>
            <Link to="/bulk-upload" style={linkStyle(collapsed)}>
              <Upload size={22} />
              {!collapsed && <span>Bulk Upload</span>}
            </Link>
          </li>

          <li>
            <Link to="/faculty-dashboard" style={linkStyle(collapsed)}>
              <LayoutDashboard size={22} />
              {!collapsed && <span>Faculty Dashboard</span>}
            </Link>
          </li>

          {!isAuthenticated ? (
            <li>
              <Link to="/login" style={linkStyle(collapsed)}>
                <LogIn size={22} />
                {!collapsed && <span>Login</span>}
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/dashboard" style={linkStyle(collapsed)}>
                  <LayoutDashboard size={22} />
                  {!collapsed && <span>Dashboard</span>}
                </Link>
              </li>
              <li>
                <button onClick={onLogout} style={{ ...linkStyle(collapsed), background: "none", border: "none" }}>
                  <LogOut size={22} />
                  {!collapsed && <span>Logout</span>}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

function linkStyle(collapsed) {
  return {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "14px 18px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: 16,
    transition: "background 0.1s",
    border: "none",
    background: "none",
    cursor: "pointer",
    justifyContent: collapsed ? "center" : "flex-start"
  };
}
