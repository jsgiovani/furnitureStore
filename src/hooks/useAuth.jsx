import { useNavigate } from 'react-router-dom';
import axiosConnection from '../config/axios';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../useContext';

const useAuth = ({middleware, url}) => {
    
    const {setAuth, setUser} = useContext(AppContext);
    
    const navegate = useNavigate();
    const getUser = async ()=>{

        try {
            const {data} = await axiosConnection.get('/api/user',{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAuth(true);
            setUser(data.data);
        } catch (error) {
            setAuth(false);
            setUser({});
        }
    };


    //login user
    const login = async (dta, setAlerts)=>{

        try {
            const request = await axiosConnection.post('api/login', dta);

            const {data} = await axiosConnection.get('/api/user',{
                headers:{
                    Authorization: `Bearer ${request.data.token}`
                }
            });
            
            localStorage.setItem('token', request.data.token);

            setAuth(true);
            setUser(data.data);
            setAlerts([]);
            navegate('/');
        } catch (error) {
            console.log(error);
            setAlerts(Object.values(error.response.data.errors));
        }

    }


    const register = async (dt, setAlerts) =>{
        try {
            const request = await axiosConnection.post('api/register', dt);
            console.log(request);

            const {data} = await axiosConnection.get('/api/user',{
                headers:{
                    Authorization: `Bearer ${request.data.token}`
                }
            });
            
            localStorage.setItem('token', request.data.token);
            setAuth(true);
            setUser(data.data);
            setAlerts([]);
            navegate('/');

        } catch (error) {
            setAlerts(Object.values(error.response.data.errors));
        }
    }


    const logout = async () => {

        try {            
            await axiosConnection.post('api/logout',{},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            setAuth(false);
            setUser({});
            navegate('/');
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    
  return {login, register, logout};
};

export default useAuth;