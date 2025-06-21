import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import StudentDashboard from './pages/student/StudentDashboard'; 
import CompanyDashboard from './pages/company/CompanyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import FindInternships from './pages/student/FindInternships';
import MyApplications from './pages/student/MyApplications';
import PostInternship from './pages/company/PostInternship';
import NotFoundPage from './pages/NotFoundPage';

import StudentLoginPage from './pages/student/auth/StudentLoginPage';
import CompanyLoginPage from './pages/company/auth/CompanyLoginPage';
import StudentSignupPage from './pages/student/auth/StudentSignupPage';
import CompanySignupPage from './pages/company/auth/CompanySignupPage';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/find-internships" element={<FindInternships />} />

              
              <Route path="/my-applications" element={<ProtectedRoute allowedRoles={['student']}><MyApplications /></ProtectedRoute>} />

              <Route path="/company-dashboard" element={<ProtectedRoute allowedRoles={['company']}><CompanyDashboard /></ProtectedRoute>} />
              <Route path="/post-internship" element={<ProtectedRoute allowedRoles={['company']}><PostInternship /></ProtectedRoute>} />

              <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="*" element={<NotFoundPage />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/login" element={<StudentLoginPage />} />
        <Route path="/student/signup" element={<StudentSignupPage />} />
        <Route path="/company/login" element={<CompanyLoginPage />} />
        <Route path="/company/signup" element={<CompanySignupPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;