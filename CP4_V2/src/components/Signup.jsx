import { auth, provider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Google sign-up
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { email, displayName, uid } = result.user;
      
      // After Google login, navigate to home page
      setUser(result.user);
      navigate("/home");
    } catch (error) {
      setError("Google signup failed. Please try again.");
      console.error("Google Signup Error: ", error.message);
    }
  };

  // Handle email/password sign-up
  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Send email verification
      await sendEmailVerification(user);

      // After signup, navigate to home
      setUser(user);
      navigate("/home");
      console.log("Account created successfully, verification email sent.");
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup Error: ", error.message);
    }
  };

  return (
    <div className="signup">
      <div className="signupForm">
        {!user ? (
          <div className="signupText">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <div className="error">{error}</div>}
              <button type="submit">Sign Up</button>
            </form>

            <button onClick={handleGoogleSignup}>
              <svg
                className="googleSvg"
                width="40px"
                height="40px"
                viewBox="-3 0 262 262"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid"
              >
                <path
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  fill="#4285F4"
                />
                <path
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  fill="#34A853"
                />
                <path
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                  fill="#FBBC05"
                />
                <path
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  fill="#EB4335"
                />
              </svg>
              Google
            </button>
          </div>
        ) : (
          <>
            <h2>Welcome, {user.displayName}</h2>
            <button onClick={() => setUser(null)}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
