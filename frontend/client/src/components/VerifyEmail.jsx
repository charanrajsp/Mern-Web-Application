import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { token } = useParams(); // Get token from URL
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/company/verify-email/${token}`);
        setMessage(res.data.msg);
        navigate('/login');
      } catch (err) {
        setMessage(err.response.data.msg || 'Error verifying email.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
