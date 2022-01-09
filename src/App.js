import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
import useToken from './components/customHooks/useToken';

import Contacts from "./components/Contacts";
import Login from "./components/Login";

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts token={token}/>} />

        <Route path="/learn" element={<Learn />}/>
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Hello there, lets discover endpoints</h1>
      <a href="/contacts">contactx</a>
    </div>
  );
}


function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link className="btn btn-success" to="/learn/courses">
        courses
      </Link>
      |
      <Link className="btn btn-primary" to="/learn/bundles">
        bundle
      </Link>
      <Outlet />
    </div>
  );
}



export default App;
