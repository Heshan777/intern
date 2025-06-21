import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
//import './AuthForm.css'; // Optional: for styling

const CompanySignupPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Additional user data for the company
      const userData = { companyName, role: 'company' }; // You can add role here too
      // Call signup with 'companies' as the user type
      await signup(email, password, userData, 'companies');
      navigate('/company/dashboard'); // Redirect on success
    } catch (err) {
      setError(err.message);
      console.error("Company signup failed:", err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register Your Company 🌟</h2>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Innovate Inc."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Company Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contact@company.com"
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
        <button type="submit" className="submit-button">Register</button>
        <p className="redirect-link">
          Already registered? <Link to="/company/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default CompanySignupPage;