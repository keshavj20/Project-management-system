import React from "react";
import { Button, Typography, Stack, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #3f51b5, #5a55ae)",
        color: "#fff",
        textAlign: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Task Manager
        </Typography>
        <Typography variant="h6" gutterBottom>
          Organize, Track, and Manage your tasks efficiently.
        </Typography>

        <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ backgroundColor: "#fff", color: "#3f51b5", fontWeight: "bold" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#fff",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3f51b5",
              },
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default LandingPage;
