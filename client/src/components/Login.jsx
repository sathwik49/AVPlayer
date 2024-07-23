import React, { useState } from 'react'
import axios from 'axios'
import request from '../api/request';

const Login = () => {
  const [ username,setUserName ] = useState("");
  const [ password,setPassword ] = useState("");
  const [ message,setMessage ] = useState("");
  const [ success,setSuccess ] = useState(null);
  const [ isLoading,setIsLoading ] = useState(false);

  const handleLogin = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post(`${request.baseUrlDev}/api/v1/user/login`,{
        username,
        password
      })
      console.log(result);
      setMessage(result.data.message);setSuccess(result.data.success);setUserName("");setPassword("");
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message)
      setSuccess(error.response.data.success)
    } finally{
      setIsLoading(false);
    }
    setTimeout(() => {
      setMessage("");setSuccess("");
    }, 4000);
  }

  return (
    <div>
      { message ? <p>{message}</p> : null }
      <h1>Login</h1>
      <form onSubmit={handleLogin} >
      <input 
        type="text" 
        placeholder='username'
        required='required'
        value={username}
        onChange= { (e) => setUserName(e.target.value)}
      />
      <input 
        type="text" 
        placeholder='password'
        required='required'
        value={password}
        onChange= { (e) => setPassword(e.target.value)}
      />
      <button type='submit' >Login</button>
      </form>
      { isLoading ? <p>Loading...</p> : null }
    </div>
  )
}

export default Login