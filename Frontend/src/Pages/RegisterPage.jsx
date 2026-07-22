import React, { useState } from "react";


const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://cine-vaultt-1.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful ✅");
        console.log("Token:", data.token);

        localStorage.setItem("token", data.token);
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

        <h1>Create Account</h1>

        <form className="login-form" onSubmit={handleRegister}>

          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>


          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>


          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          <button 
            type="submit"
            className="login-button"
          >
            Register
          </button>

        </form>


        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

      </div>

    </div>
  );
};

export default RegisterPage;