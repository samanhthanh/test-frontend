// src/components/SignupForm.jsx
import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Container, Alert, Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', formData);
      console.log(response.data);
      setSuccessMsg('Đăng ký thành công! Hãy đăng nhập.');
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      setErrorMsg('Đăng ký thất bại. Kiểm tra lại thông tin.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Đăng ký
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Tên đăng nhập"
            name="username"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Mật khẩu"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Đăng ký
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Đã có tài khoản?{" "}
            <Link component={RouterLink} to="/">
              Đăng nhập
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
