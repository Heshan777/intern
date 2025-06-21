import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
//import './AuthForm.css'; // Optional: for styling

const CompanyLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Call the login function with 'companies' as the user type
      await login(email, password, 'companies');
      navigate('/company/dashboard'); // Redirect on success
    } catch (err) {
      setError(err.message);
      console.error("Company login failed:", err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Company Login 🏢</h2>
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
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Login</button>
        <p className="redirect-link">
          Need to register your company? <Link to="/company/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default CompanyLoginPage;