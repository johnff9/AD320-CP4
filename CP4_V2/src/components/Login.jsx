import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      // After successful login, navigate to the home page
      navigate('/home'); // Redirect to /home
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      {!user ? (
        <>
          <h2>Login</h2>
          <button onClick={handleLogin}>Login with Google</button>
        </>
      ) : (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Login;
