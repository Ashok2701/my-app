import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';
import Logo from './logo.png';
import { useStateContext } from '../../contexts/ContextProvider';
import { Navigate } from 'react-router-dom';

const Login = () => {

  const { login } = useStateContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage , setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const success =   await login(username, password);
    if(success) {
      Navigate('/dashboard')
    }
    else {

      setErrorMessage('Invalid Username and Password');
      setUsername('');
      setPassword('');

    }
  } catch(error) {
    setErrorMessage('Something went wrong. Please try again');
  }
  };


  return (
   <div className='login-background'>
    <div className='wrapper'>
      <div className='form-box login'>
        <form onSubmit={handleLogin}>
            <div className='flex flex-col items-center  gap-3 '>
             
            <img className='flex justify-center' src={Logo} width="50px" height="25px"/>
            <div>
            <h2 className='flex justify-center text-2xl font-bold'>Field Service Management</h2>
            <h6 className='flex justify-center text-sm'>TMSDEVN</h6>
            </div>
            </div>
            <div className="input-box">
                <input type="text" placeholder='Username'   value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state
              required />
                <FaUser className='icon' />
            </div>

            <div className='input-box'>
                <input type="password" placeholder='password'  value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
               required />
                <FaLock className='icon' />
            </div>

          <button type="submit">Login</button>  
          
          <div className='mt-8  flex justify-center'> 
          {errorMessage && <p className='error-message'>{errorMessage}</p>} {/* Error message */}
          </div>


        </form>

      </div>
      
    </div>
    </div>
  )
}

export default Login
