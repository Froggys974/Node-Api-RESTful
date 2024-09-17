import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../view/login/loginView';
// import RegisterPage from '../view/RegisterView';

const AuthRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/register" element={<RegisterPage />} /> */}
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
};

export default AuthRoutes;
