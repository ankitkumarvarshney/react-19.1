import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { login } from "../../api/api";
import useAuth from "../../hooks/useAuth";

export default function LoginForm({ switchToRegister }) {
  const { setToken } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      setToken(res.data.token);
      enqueueSnackbar("Logged in successfully!", { variant: "success" });
    } catch (e) {
      enqueueSnackbar(e.response?.data?.message || "Login failed", { variant: "error" });
    }
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" textAlign="center">Login</Typography>
      <TextField label="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
      <TextField label="Password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
      <Button type="submit" variant="contained">Login</Button>
      <Button variant="text" onClick={switchToRegister}>Don't have an account? Register</Button>
    </Box>
  );
}
