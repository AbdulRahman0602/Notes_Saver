import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const handleSubmit = async (e) => {
    e.preventDefault()
    //const {name,email,password}=credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json)

    if (json.success) {
      localStorage.setItem("token", json.authtoken)
      navigate("/")
    }
    else {
      alert("Invalid Credentials")
    }

  }
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name"name="name" aria-describedby="emailHelp" value={credentials.name} onChange={onchange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onchange}  />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Conform Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onchange}  minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
