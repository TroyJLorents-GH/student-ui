import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu, ChevronLeft, ChevronRight, Home, Users, LogIn, LogOut, Upload, LayoutDashboard } from "lucide-react";

export default function Navbar({ collapsed, setCollapsed, isAuthenticated, onLogout }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed ? 60 : 250;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { to: '/', icon: <Home size={22} />, label: 'Home' },
    { to: '/quick-assign', icon: <Users size={22} />, label: 'Quick Assign' },
    { to: '/manage-assignments', icon: <Menu size={22} />, label: 'Manage Student Assignments' },
    { to: '/applications', icon: <Menu size={22} />, label: 'Applications' },
    { to: '/student-summary', icon: <Menu size={22} />, label: 'Student Class Summary' },
    { to: '/bulk-upload', icon: <Upload size={22} />, label: 'Bulk Upload' },
    { to: '/faculty-dashboard', icon: <LayoutDashboard size={22} />, label: 'Faculty Dashboard' },
  ];

  const authItems = !isAuthenticated
    ? [{ to: '/login', icon: <LogIn size={22} />, label: 'Login' }]
    : [
        { to: '/dashboard', icon: <LayoutDashboard size={22} />, label: 'Dashboard' },
        { to: null, icon: <LogOut size={22} />, label: 'Logout', onClick: onLogout },
      ];

  const getItemSx = (isActive) => ({
    color: '#fff',
    padding: '14px 18px',
    justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
    borderLeft: isActive ? '4px solid #fff' : '4px solid transparent',
    fontWeight: isActive ? 900 : 'bold',
    '&:hover': {
      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
    },
  });

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#191970',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!isMobile && (
        <IconButton
          onClick={() => setCollapsed((prev) => !prev)}
          sx={{
            color: '#fff',
            alignSelf: collapsed ? 'center' : 'flex-end',
            padding: 2,
          }}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      )}

      <List sx={{ flex: 1, padding: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.to}
              end={item.to === '/'}
              onClick={isMobile ? handleDrawerToggle : undefined}
              sx={({ isActive }) => getItemSx(isActive)}
            >
              <ListItemIcon sx={{ color: '#fff', minWidth: collapsed && !isMobile ? 'auto' : 40 }}>
                {item.icon}
              </ListItemIcon>
              {(!collapsed || isMobile) && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: 'inherit',
                      fontSize: 16
                    }
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}

        {authItems.map((item, index) => (
          <ListItem key={item.to || `auth-${index}`} disablePadding>
            <ListItemButton
              component={item.to ? NavLink : 'button'}
              to={item.to}
              onClick={item.onClick ? item.onClick : isMobile ? handleDrawerToggle : undefined}
              sx={item.to
                ? ({ isActive }) => ({ ...getItemSx(isActive), width: '100%', textAlign: 'left' })
                : { ...getItemSx(false), width: '100%', textAlign: 'left' }
              }
            >
              <ListItemIcon sx={{ color: '#fff', minWidth: collapsed && !isMobile ? 'auto' : 40 }}>
                {item.icon}
              </ListItemIcon>
              {(!collapsed || isMobile) && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: 'inherit',
                      fontSize: 16
                    }
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 8,
            left: 8,
            zIndex: 1300,
            backgroundColor: '#191970',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#0a0558ff',
            },
          }}
        >
          <Menu />
        </IconButton>
      )}

      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
              borderRight: '8px solid #88888dff',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: sidebarWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: sidebarWidth,
              boxSizing: 'border-box',
              transition: 'width 0.2s',
              borderRight: '8px solid #FAFAFA',
              overflowX: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
