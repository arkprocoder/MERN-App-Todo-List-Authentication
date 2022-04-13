import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
function Navbar(props) {
  let navigate = useNavigate();

  const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('success');
    localStorage.removeItem('name');
    navigate("/login")

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-nav p-4">
    <div className="container-fluid">
    <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
      <Link className="navbar-brand" to="/">{props.title}</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/"><i className="fa-solid fa-house-user"></i> Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/about"> About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/contact"><i className="fa-solid fa-address-card"></i> Contact</Link>
          </li>
     
       
      
         
         
        </ul>

        {!localStorage.getItem('token')?<div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <Link className="btn btn-primary me-md-2" type="button" to="/login"><i className="fa-solid fa-user-check mx-2"></i>Login</Link>
  <Link className="btn btn-primary" to="/signup" type="button"><i className="fa-solid fa-user mx-1"></i>Signup</Link></div>:<div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <button className="btn btn-primary" onClick={logout}  role="button"><i className="fa-solid fa-user mx-1"></i>Logout</button> </div>}
     

        
      </div>
    </div>
  </nav>
  )
}

export default Navbar