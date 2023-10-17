import React, { useRef, useState } from 'react'
import axiosConnection from '../config/axios';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {

    const [alerts, setAlerts] = useState([]);
    
    const {register} = useAuth({middleware:'guest', url:'/'});

    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const password_confirmationRef = useRef('');





    const handleSubmit = async (e)=>{
        e.preventDefault();

        const data = {
            name:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
            password_confirmation:password_confirmationRef.current.value,
        };

        register(data, setAlerts);

    };

  return (

    <div className="form-container">
        <form className='auth-form' onSubmit={(e)=>{handleSubmit(e)}}>
            
            <div className="auth-alerts">
                {alerts.length>0 &&(
                    alerts.map((alert, index) => <p className='mb-2 p-1' key={index}>{alert}</p>)
                )}
            </div>

            <input className='unset p-2' type="text" name="name" id="name" placeholder='Full Name' ref={nameRef} />
            <input className='unset p-2' type="email" name="email" id="email" placeholder='E-mail Address' ref={emailRef} />
            <input className='unset p-2' type="password" name="password" id="password" placeholder='Password' ref={passwordRef} />
            <input className='unset p-2' type="password" name="passowrd_confirmation" id="password_confirmation" placeholder='Confirm your Password' ref={password_confirmationRef} />
            <input className='unset p-2 cursor-pointer' type="submit" value="Register" />
        </form>

        <nav className='auth-nav mt-3 flex gap-1'>
            <Link to="/auth/login">Already have an account? <span>Login</span></Link>
        </nav>

    </div>

  )
}

export default Register