import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../Hooks/useApi";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Box,
  Paper,
  MenuItem,
} from "@mui/material";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"user",
  });

  const { fetchData: registerUser } = useApi(
    "/api/user",
    "post",
    false,
    formData,
    (res,err) => {
      if (res?.message) {
        alert('registation successfull')
        navigate("/login");
      } else{
        alert("User already exist")
      }
    }
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Create an Account ✨
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mb={3}>
          Join us by filling the information below
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              size="small"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              size="small"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              fullWidth
              size="small"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
  select
  label="Role"
  name="role"
  value={formData.role}
  onChange={handleChange}
  fullWidth
  size="small"
  required
>
  <MenuItem value="admin">Admin</MenuItem>
  <MenuItem value="manager">Manager</MenuItem>
  <MenuItem value="user">User</MenuItem>
</TextField>

            <Button  variant="contained" type="submit" fullWidth size="large">
              Sign Up
            </Button>
            <Button
              onClick={() => navigate("/login")}
              fullWidth
              variant="text"
              size="small"
            >
              Already have an account? <strong>&nbsp;Login</strong>
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
