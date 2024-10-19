import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from './api.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/company/login', data);
      setAuthToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Login Company</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" {...register('email')} required />
        <input type="password" placeholder="Password" {...register('password')} required />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
