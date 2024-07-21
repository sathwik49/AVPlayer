import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [mobile,setMobile] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const result = await axios.post("https://avplayerserver.sathwik2625.workers.dev/api/v1/user/signup",
            {
                username:username,
                password:password,
                email:email,
                mobile:mobile,
            }
        )
        console.log("res:"+result);
        console.log(result.data);
        setUsername("");
        setPassword("");
        setEmail("");
        setMobile("");
    }

  return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={(e)=>handleSubmit(e)} >
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              placeholder='Enter username'
              required="required"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              placeholder='Enter password'
              required="required"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              placeholder='abc@gmail.com'
              required="required"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
            <label htmlFor="mobile">Mobile</label>
            <input 
              type="text"
              placeholder='Enter mobile number'
              required="required"
              value={mobile}
              onChange={(e)=> setMobile(e.target.value)}
            />
            <button type="submit">Sign up</button>
        </form>
    </div>
  )
}

export default Signup