import React from 'react'

const Alert = ({type, alert}) => {
  return (
    <p className={`mb-2 p-1 ${type}`}>{alert}</p>
  )
}

export default Alert