import React, { useState, useContext } from "react";
import "./loginPage.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { login } = useContext(AuthContext);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });


      const data = await response.json();


      if (response.ok) {

        login(data.token);

        setMessage("Login successful ✅");

      } else {

        setMessage(data.message);

      }


    } catch (error) {

      console.log(error);
      setMessage("Something went wrong");

    }
  };


  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Login</h1>


        <form 
          className="login-form" 
          onSubmit={handleLogin}
        >

          <div>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>



          <div>

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>



          <button 
            type="submit"
            className="login-button"
          >
            Login
          </button>


        </form>



        {message && (
          <p className="login-message">
            {message}
          </p>
        )}



        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">
            Create here
          </Link>
        </p>


      </div>

    </div>
  );
};


export default LoginPages;