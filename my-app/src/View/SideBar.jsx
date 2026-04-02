import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useSidebar } from "../Hooks/useSidebar";

export default function Slide() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getSidebarItems } = useSidebar();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";
  const menuItems = getSidebarItems(location.pathname);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#fff",
          color: "#1976d2",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              color: "#1976d2",
            }}
            onClick={() => navigate("/my-project")}
          >
            TASK MANAGER
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            sx={{
              bgcolor: "#1976d2",
              cursor: "pointer",
              "&:hover": { opacity: 0.8 },
            }}
            onClick={() => navigate("/login")}
          >
            {userInitial}
          </Avatar>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: "10rem",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: "10rem",
            boxSizing: "border-box",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List dense sx={{ p: 0 }}>
            {menuItems.map(({ text, icon, path, active }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={active}
                  onClick={() => navigate(path)}
                  sx={{
                    px: 2,
                    py: 1.2,
                    backgroundColor: active ? "#e3f2fd" : "transparent",
                    "&.Mui-selected": {
                      backgroundColor: "#bbdefb",
                      "&:hover": {
                        backgroundColor: "#90caf9",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 30, mr: 1 }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{ fontSize: "0.9rem" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
