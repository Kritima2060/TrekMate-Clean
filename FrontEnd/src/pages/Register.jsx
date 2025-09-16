import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import { useAuth } from "../store/auth";

const URL = "http://localhost:5555/api/auth/register";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Handle errors
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);



  const navigate = useNavigate();
   const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
  // Clear specific field error when user starts typing
  if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "" 
      }));
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // client-side validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
     return;
    }

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
        console.log("Registration successful:", responseData);

        //Save user token
        storeTokenInLS(responseData.token);
        // localStorage.setItem("token", responseData);
        
        // reset form
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // redirect to login
        navigate("/login");
      } else {
        console.error("Server responded with error:", responseData.extraDetails);
        // setError(responseData.extraDetails);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>

          <p className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
