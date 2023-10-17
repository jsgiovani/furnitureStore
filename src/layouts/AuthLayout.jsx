import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
      <header className='header-auth flex justify-center mt-2'>
        <Link className='logo' to="/">
            <h1 className='logo'>FURNIT<span className='dot'></span></h1>
        </Link>
      </header>

      <main className='auth-container'>
          <Outlet/>
      </main>
    </div>
  )
}

export default AuthLayout