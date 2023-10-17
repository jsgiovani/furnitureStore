import React, { useContext, useRef, useState } from 'react';
import { Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {

    const [alerts, setAlerts] = useState([]);

    const emailRef = useRef();
    const passwordRef = useRef();
    
    const {login} = useAuth({});

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const data = {
            email:emailRef.current.value,
            password:passwordRef.current.value,
        };


        login(data,setAlerts);

    };


  return (
    <div className="form-container">
        <form className='auth-form' onSubmit={(e)=>{handleSubmit(e)}}>
            
            <div className="auth-alerts">
                {alerts.length>0 &&(
                    alerts.map((alert, index) => <p className='mb-2 p-1' key={index}>{alert}</p>)
                )}
            </div>



            <input className='unset p-2' type="email" name="email" id="email" placeholder='E-mail Address' ref={emailRef} />
            <input className='unset p-2' type="password" name="password" id="password" placeholder='Password' ref={passwordRef} />
            <input className='unset p-2 cursor-pointer' type="submit" value="Login" />
        </form>

        <nav className='auth-nav mt-3 flex gap-1'>
            <Link  to="/auth/register">Dont have an account? <span>Register</span></Link>
        </nav>
    </div>

    
  )
}

export default Login