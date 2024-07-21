import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("https://avplayerserver.sathwik2625.workers.dev/api/v1/user/signup", {
        username,
        password,
        email,
        mobile,
      });
      console.log("Success:", result.data);
      setMessage(result.data.message);setSuccess(result.data.success);setUsername("");setPassword("");setEmail("");setMobile("");
    } catch (error) {
      console.error("Error:", error.response.data);
      setMessage(error.response.data.message);
      setSuccess(error.response.data.success);
    }
    setTimeout(() => {
      setMessage("");
      setSuccess(null);
    }, 4000);
  };

  return (
    <div>
      {message && <p>{message}{success}</p>}
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="abc@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="mobile">Mobile</label>
        <input
          type="text"
          placeholder="Enter mobile number"
          required
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
