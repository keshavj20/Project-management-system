import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Box,  } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

import darkTheme from "./theme/darkMode";

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import lightTheme from "./theme/lightMode";
function App() {
  const [mode, setMode] = useState("light");

  // Toggle between light and dark
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Pick theme based on mode
  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      
      <Box sx={{  height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      
     
          {/* <SidebarProvider> */}
            <RouterProvider router={router}></RouterProvider>
          {/* </SidebarProvider> */}
      </Box>

      
    </ThemeProvider>
  );
}

export default App;
