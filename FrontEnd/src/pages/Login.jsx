import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import { useAuth } from "../store/auth";

const URL = "http://localhost:5555/api/auth/login";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("After login:", responseData);

        // Save user info + token
        storeTokenInLS(responseData.token);

        localStorage.setItem("user", JSON.stringify(responseData.user));
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("loggedIn", true);

        // Clear form
        setFormData({ email: "", password: "" });

        // Redirect to home page
        navigate("/");
      } else {
        setError(responseData.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to TrekMate</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit">Login</button>

          <p className="register-text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
