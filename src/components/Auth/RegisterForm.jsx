import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { register } from "../../api/api";

export default function RegisterForm({ switchToLogin }) {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      enqueueSnackbar("Registration successful! Please login.", { variant: "success" });
      switchToLogin();
    } catch (e) {
      enqueueSnackbar(e.response?.data?.message || "Registration failed", { variant: "error" });
    }
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" textAlign="center">Register</Typography>
      <TextField label="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
      <TextField label="Password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
      <Button type="submit" variant="contained" color="success">Register</Button>
      <Button variant="text" onClick={switchToLogin}>Already have an account? Login</Button>
    </Box>
  );
}
