import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Home from './components/Home';
import ProductForm from './components/products/ProductForm';
import ProductList from './components/products/ProductList';
import AgeCalculator from './components/guest/AgeCalculator';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Theo dõi khi token thay đổi (sau login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginForm onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/add-product" element={isLoggedIn ? <ProductForm /> : <Navigate to="/" />} />
        <Route path="/products" element={isLoggedIn ? <ProductList /> : <Navigate to="/" />} />
        <Route path="/home" element={isLoggedIn ? <Home onLogout={() => setIsLoggedIn(false)} /> : <Navigate to="/" />} />
        <Route path="/calculator" element={<AgeCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
