import React, { useState } from 'react'
import Alert from './Alert';
import { useNavigate  } from 'react-router-dom'

function Login(props) {
  const [credentials, setCredentials] = useState({email: "", password: ""}) 
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {

      const response = await fetch("http://localhost:5000/api/auth/loginUser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
      // console.log(json);

        if(json.success) {
          localStorage.setItem('token', json.authToken);  
          localStorage.setItem('name', json.name);  
          localStorage.setItem('success', json.success);  
          props.showAlert("Login Success","success");
          navigate("/");
          
        } else {
          props.showAlert("Invalid Credentials","warning");
         
        }
        
      } catch (error) {
        props.showAlert(`db not connected ${error}`, "warning");
      }
     

  }

  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className="container">

        <div className="row">
          <div className="col-md-4">

          </div>
          <div className="col-md-4">

          <div className="display-4 text-center">Login</div>
          <Alert alert={alert} />
            <br />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label"><i className="fa-solid fa-envelope-circle-check"></i> Email address</label>
                <input type="email" value={credentials.email}  onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
               
              </div>
              <div className="mb-3">
                <label htmlFor="password" value={credentials.password} onChange={onChange}  className="form-label"><i className="fa-solid fa-key"></i> Password</label>
                <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange} minLength={5} required />
              </div>
             
              <div className="d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
        
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
   </>
  )
}

export default Login