import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from '../useContext';
import useAuth from '../hooks/useAuth'


const Header = () => {

    const [navAuth, setNavAuth] = useState(false);
    const {cart,  auth, user} = useContext(AppContext);
    const {logout} = useAuth({});
    //get current url info
    const location = useLocation();

    let url = location.pathname.split('/')[1];

    //is current url empty? if so, current url is equals to 'home'
    url = url !=='' ? url: 'home'

   
    
    function active(page) {
        if (page === url) {
            return 'active'
        }else{
            return null
        }
    }


    function salir() {
        logout();
    }

    //total elements in cart
    const cartItems = cart.reduce((acumulator, currentItem ) => currentItem.amount + acumulator, 0 );


  return (
    <header className='container flex justify-between align-center header mt-2'>

        <Link className='logo' to="/">
            <h1 className='logo'>FURNIT<span className='dot'></span></h1>
        </Link>

        <nav className='navbar flex align-center gap-4'>
            <Link className={`icon ${active('home')}`} to="/">Home</Link>
            <Link className={`icon ${active('shop')}`} to="/shop">Shop</Link>
        </nav>

        <div className="user-info icons flex gap-4 align-center">
            <Link to ='/cart'   className={`unset icon-cart ${active('cart')}`}>
                <FontAwesomeIcon className='icon cursor-pointer' icon={faCartShopping} />
                <span>{cartItems}</span>
            </Link>

            <button className='unset' onMouseOver={()=>{{ setNavAuth(true) }} }>
                <FontAwesomeIcon className='icon cursor-pointer' icon={faUser} />
            </button>
        </div>


        {auth ? (
            <nav className={`nav-auth flex gap-1 ${navAuth ? 'active':''}`} onMouseOver={()=>{{ setNavAuth(true) }} } onMouseLeave={()=> {setNavAuth(false)}} >
                <Link to="/auth/account">My Account</Link>
                <button className='unset cursor-pointer' onClick={()=>{salir()}}> Logout</button>
            </nav>
        ):(
            <nav className={`nav-auth flex gap-1 ${navAuth ? 'active':''}`} onMouseOver={()=>{{ setNavAuth(true) }} } onMouseLeave={()=> {setNavAuth(false)}} >
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/login">Register</Link>
            </nav>
        )}

    </header>
  )
}

export default Header