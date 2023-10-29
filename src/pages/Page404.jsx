import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <main className='contaier page404'>
      <h1>Page Not Found</h1>
      <Link to="/">Go Back</Link>
    </main>
  )
}

export default Page404