/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useToggle from './customHooks/useToggle'

async function loginUser(credentials, isOn) {
 return fetch(`http://localhost:4000/api/${isOn?'auth':'users'}`, {
    //  `{"name":"med100s","email":"aszxcdsd999@gmail.com","password":"32hoshfDSDFU"}`
    body: `{"name":"${credentials.username}",
            "email":"${credentials.email}",
            "password":"${credentials.password}"}`,
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
 })
   .then(data => data.json())
}


export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const [isOn, toggleIsOn] = useToggle();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      email,
      password
    },
      isOn  
    );
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
            <p>name</p>
            <input type="text" id="username" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
            <p>email</p>
            <input type="text" id="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
            <p>password</p>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
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