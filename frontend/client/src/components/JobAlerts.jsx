import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const JobAlerts = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/jobs/send-job-alerts', data, {
        headers: { 'x-auth-token': token }
      });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage('Error sending job alerts');
    }
  };

  return (
    <div>
      <h2>Send Job Alerts</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea placeholder="Candidate Emails (comma separated)" {...register('emails')} required></textarea>
        <textarea placeholder="Job Details" {...register('jobDetails')} required></textarea>
        <button type="submit">Send Alerts</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default JobAlerts;
