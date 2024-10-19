import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/company/register', data);
      setMessage(res.data.msg);
      navigate(`/verify-email/${res.data.token}`);
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Register Company</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...register('name')} required />
        <input type="email" placeholder="Email" {...register('email')} required />
        <input type="password" placeholder="Password" {...register('password')} required />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>
        After registration, please check your email for a verification link.
      </p>
    </div>
  );
};

export default Register;
