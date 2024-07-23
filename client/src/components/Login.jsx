import React,{useState} from 'react'
import axios from 'axios';
import request from '../api/request';

const Login = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [ isLoading,setIsLoading ] = useState(false);

  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
        setIsLoading(true)
        const result = await axios.post(`${request.baseUrl}/api/v1/user/login`,{
            username:username,
            password:password
        })
        setMessage(result.data.message);setSuccess(result.data.success);setUsername("");setPassword("");
    } catch (error) {
      setMessage(error.response.data.message);
      setSuccess(error.response.data.success);
    }finally{
        setIsLoading(false)
      }
      setTimeout(() => {
        setMessage("");
        setSuccess(null);
      }, 4000);
  }
  return (
    <div>
        <div>{message ? <p>{message}</p> : null}</div>
        <h1>Login</h1>
        <form onSubmit={(e)=>handleLogin(e)} >
            <label>Username</label>
            <input 
              type="text" 
              placeholder="username" 
              value={username} 
              required="required"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <label>Password</label>
            <input 
               type="password" 
               placeholder="password" 
               required='required'
               value={password} 
               onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button type="submit">Login</button>
        </form>
        <div> {isLoading ? "Loading....." : null} </div>
    </div>
  )
}

export default Login