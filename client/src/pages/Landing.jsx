import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div>
        <h1>Welcome to AVPlayer.com -- Your customised Audio Video Player</h1>
        <span>Add your files to a cloud service/github and connect them with AVPlayer to use.</span>
        <div>
        <Link to='/signup'>Go to Signup Page</Link>
        </div>
    </div>
  )
}

export default Landing