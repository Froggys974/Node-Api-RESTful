import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthRoutes from './routes/authRoutes';

const App = () => {
  return (
    <Router>
      <AuthRoutes />
    </Router>
  );
};

export default App;
