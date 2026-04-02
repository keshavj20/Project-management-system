import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default lightTheme;
