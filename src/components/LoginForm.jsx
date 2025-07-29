// src/components/LoginForm.jsx
import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Container, Alert, Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username,
        password,
      });
      console.log(response.data);
      setSuccessMsg('Đăng nhập thành công!');
      // Lưu token nếu cần
    } catch (error) {
      setErrorMsg('Sai tài khoản hoặc mật khẩu!');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Đăng nhập
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Tên đăng nhập"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Đăng nhập
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Chưa có tài khoản?{" "}
            <Link component={RouterLink} to="/signup">
              Đăng ký
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
