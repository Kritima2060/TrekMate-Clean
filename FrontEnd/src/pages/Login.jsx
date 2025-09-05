import { Link } from "react-router-dom";
import "../App.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to TrekMate</h2>
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />

          <button type="submit">Login</button>

          <p className="register-text">
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
