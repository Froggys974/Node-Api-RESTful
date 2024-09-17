import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import './loginView.css';


const LoginView = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (formValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      onLoginSuccess(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
  ];

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <Form onSubmit={handleLogin} fields={fields} buttonText="Login" />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LoginView;
