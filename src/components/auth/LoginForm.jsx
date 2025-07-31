import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Container, Alert, Link
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      console.log('API URL login:', process.env.REACT_APP_API_URL);
      const response = await axios.post('/api/auth/signin', {
        username,
        password,
      });

      const token = response.data.jwtToken;
      if (token) {
        localStorage.setItem('token', token);
        setSuccessMsg('Đăng nhập thành công!');
        if (onLogin) onLogin(); // cập nhật login state
        navigate('/home');      // chuyển về màn home
      } else {
        setErrorMsg('Không nhận được token từ máy chủ!');
      }
    } catch (error) {
      console.error(error);
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
