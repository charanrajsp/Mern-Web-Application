import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const PostJob = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/jobs/post', data, {
        headers: { 'x-auth-token': token }
      });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage('Error posting job');
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Job Title" {...register('title')} required />
        <input type="text" placeholder="Description" {...register('description')} required />
        <input type="text" placeholder="Experience Level" {...register('experienceLevel')} required />
        <input type="date" {...register('endDate')} required />
        <button type="submit">Post Job</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PostJob;
