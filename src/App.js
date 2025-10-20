import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { LicenseInfo } from '@mui/x-license';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import QuickAssign from './pages/QuickAssign';
import ApplicationList from './pages/ApplicationList';
import Login from './pages/Login';
import MasterDashboard from './pages/MasterDashboard';
import BulkUploadAssignments from './pages/BulkUploadAssignments';
import ManageStudentAssignments from './pages/ManageStudentAssignments';
import StudentSummaryPage from './pages/StudentSummaryPage';
import StudentAssignmentDashboard from './pages/StudentAssignmentDashboard';

// Set MUI X Pro License Key
LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_LICENSE_KEY);

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Mobile < 900px

  const sidebarWidth = collapsed ? 60 : 150;

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      {/* Sidebar */}
      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
          transition: 'margin-left 0.2s',
          padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding: 16px mobile, 24px tablet, 32px desktop
          paddingTop: isMobile ? 8 : { xs: 2, sm: 3, md: 4 }, // Extra top padding on mobile for hamburger button
          backgroundColor: '#FAFAFA',
          minHeight: '100vh',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quick-assign" element={<QuickAssign />} />
          <Route path="/applications" element={<ApplicationList />} />
          <Route path="/bulk-upload" element={<BulkUploadAssignments />} />
          <Route path="/student-summary" element={<StudentSummaryPage />} />
          <Route path="/manage-assignments" element={<ManageStudentAssignments />} />
          <Route path="/faculty-dashboard" element={<StudentAssignmentDashboard />} />

          <Route
            path="/login"
            element={
              isAuthenticated
                ? <Navigate to="/dashboard" replace />
                : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated
                ? <MasterDashboard />
                : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
