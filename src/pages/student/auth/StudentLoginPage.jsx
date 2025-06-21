import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth'; // Ensure path is correct
import { useNavigate } from 'react-router-dom';

const StudentLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call login with 'students' as the userType
      await login(email, password, 'students');
      navigate('/student/dashboard'); // Redirect to student dashboard on success
    } catch (error) {
      console.error("Student login failed:", error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Student Login 🎓</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default StudentLoginPage;