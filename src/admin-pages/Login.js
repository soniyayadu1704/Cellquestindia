import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // simple navigation

  const handleLogin = () => {
    if (!email.includes("@")) {
      setError("Email must contain @");
      return;
    }
    if (!email.includes(".com")) {
      setError("Email must contain .com");
      return;
    }
    if (!password) {
      setError("Password cannot be empty");
      return;
    }

    setError("");
    navigate("/"); // only goes to / if all validation passes
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="error-msg">{error}</div>}

        <label>
          Email
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;