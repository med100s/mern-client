import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
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
        <Route path="/" element={<Contacts token={token}/>} />

      </Routes>
    </Router>
  );
}




export default App;
