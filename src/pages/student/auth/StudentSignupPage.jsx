import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
//import './AuthForm.css'; // Optional: for styling

const StudentSignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Additional user data to be saved in Firestore
      const userData = { fullName };
      // Call signup with 'students' as the user type
      await signup(email, password, userData, 'students');
      navigate('/student/dashboard'); // Redirect on success
    } catch (err) {
      setError(err.message);
      console.error("Student signup failed:", err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Create Student Account 🚀</h2>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Sign Up</button>
        <p className="redirect-link">
          Already have an account? <Link to="/student/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default StudentSignupPage;