import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import PostJob from './components/PostJob.jsx';
import JobAlerts from './components/JobAlerts.jsx';
import { Navigate } from 'react-router-dom';
import VerifyEmail from './components/VerifyEmail.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to Login if user visits "/" */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job-alerts" element={<JobAlerts />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
