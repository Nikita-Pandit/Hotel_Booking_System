import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"

import Login from './components/Login';
import SignUp from "./components/SignUp"
import Rooms from "./components/Rooms"
import ResetPassword from "./components/ResetPassword"
import Navbar from "./pages/Navbar";
import Dashboard from "./components/Dashboard";
import Protected from "./pages/Protected";
function App() {
  return (
    <Router>
         <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
  
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/Home' element={<Home/>} />

        <Route path="/protected" element={<Protected/>}/>
        <Route path="/Resetpassword/:token" element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App
