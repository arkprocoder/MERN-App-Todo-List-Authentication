import React, { useState } from 'react'
import Contact from "./components/Contact";
import Navbar from './components/Navbar';
import About from "./components/About";
import Home from './components/Home';
import Login from './components/Login';
import Alert  from './components/Alert';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoState from './context/todoState';

function App() {
  const [alert,setAlert] =useState(null)
  const showAlert =(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })

    setTimeout(()=>{
      setAlert(null);
    },2000)
  }
  return (
   <>
 <TodoState showAlert={showAlert}>
   <Router>
        <Navbar 
        title="ARK-PRO-CODER"
        showAlert={showAlert}
        />
       <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/> } />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />


        </Routes>
    
        </Router>
      </TodoState>
   </>
  );
}

export default App;
