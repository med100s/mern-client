
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useToggle from './customHooks/useToggle'

async function loginUser(credentials, isOn) {
 return fetch(`${window.env.SERVER_DOMAIN}/api/${isOn?'auth':'users'}`, {
    body: JSON.stringify(credentials),
    headers: {"Content-Type": "application/json" },
    method: "POST"
 })
    .then(data => data.json())
}


export default function Login({ setToken }) { 
  
  const [credentials, setCredentials] = useState();
  
  const [isOn, toggleIsOn] = useToggle();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(credentials, isOn);
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
            <p>name</p>
            <input type="text" id="name" 
              onChange={e => setCredentials(prev=>({...prev, "name": e.target.value}))} 
            />
        </label>
        <label>
            <p>email</p>
            <input type="text" id="email" 
              onChange={e => setCredentials(prev=>({...prev, "email": e.target.value}))} 
            />
        </label>
        <label>
            <p>password</p>
            <input type="password" id="password" 
              onChange={e => setCredentials(prev=>({...prev, "password": e.target.value}))} 
            />
            </label>
        <div>
            <button type="submit">Submit</button>
            
        </div>
      </form>
      <button onClick={toggleIsOn}>
       {isOn ? "login" : "register"}
      </button>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};