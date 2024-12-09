import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, addDoc, collection} from 'firebase/firestore';
import { NavLink } from "react-router-dom";


/**
 * Login component provides functionality for users to log in via Google authentication,
 * log out, and add items to their cart in Firestore.
 *
 * @component
 * @returns {JSX.Element} The rendered Login component.
 */
const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { email, displayName, uid } = result.user;

      // Save user details in Firestore
      const userRef = doc(db, "users", uid); // Use Firestore instance
      // const docRef = await addDoc(collection(db, "users"), {email, displayName, uid});
      // await setDoc(userRef, { email, displayName }, { merge: true });

      setUser(result.user);

      // Navigate to home
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error); // Check the error if it persists
    }
  };

  /**
   * Handles user login via Google authentication.
   * Upon success, the user's details are saved in Firestore, and the user is navigated to the home page.
   *
   * @async
   * @function
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /**
   * Adds an item to the user's cart in Firestore.
   * If the cart doesn't exist, a new cart document is created.
   *
   * @async
   * @function
   * @param {Object} item - The item to add to the cart.
   * @param {string} item.id - The unique identifier for the item.
   * @param {string} item.name - The name of the item.
   */
  const addToCart = async (item) => {
    if (!user) {
      console.error("User must be logged in to add items to cart");
      return;
    }
    const cartRef = doc(db, "carts", user.uid);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      // Merge new item into existing cart
      const currentCart = cartDoc.data().items || [];
      await setDoc(cartRef, { items: [...currentCart, item] }, { merge: true });
    } else {
      // Create a new cart document
      await setDoc(cartRef, { items: [item] });
    }
  };

  return (

    <div className="signup">
      <div className="login">
        {!user ? (
          <div className="loginText">
            <h2>Log In</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <div className="options">
            <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "active" : "")}
          > Sign up
          </NavLink>
            </div>
            <button onClick={handleLogin}>
              <svg className="googleSvg"
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
            <button onClick={handleLogout}>Logout</button>
            <button
              onClick={() => addToCart({ id: "item1", name: "Sample Item" })}
            >
              Add Sample Item to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
