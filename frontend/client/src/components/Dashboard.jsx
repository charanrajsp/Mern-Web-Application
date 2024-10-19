import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Company Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <ul>
        <li><Link to="/post-job">Post a Job</Link></li>
        <li><Link to="/job-alerts">Send Job Alerts</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
