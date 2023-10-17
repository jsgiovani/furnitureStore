import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='container'>

        <div className="footer-container">

            <div className="footer-section">

                <h4>Customer Service</h4>
                
                <nav className='footer-nav flex'>
                    <Link to="#">Help & Contact Us</Link>
                    <Link to="#">Returns & Refunds</Link>
                    <Link to="#">Online Stores</Link>
                    <Link to="#">Terms & Conditions</Link>
                </nav>
            </div>

            <div className="footer-section">

                <h4>Company</h4>

                <nav className='footer-nav flex'>
                    <Link to="#">What We Do</Link>
                    <Link to="#">Available Services</Link>
                    <Link to="#">Latest Posts</Link>
                    <Link to="#">FAQs</Link>
                </nav>
            </div>


            <div className="footer-section">

                <h4>Social Media</h4>

                <nav className='footer-nav flex'>
                    <Link to="#">Twitter</Link>
                    <Link to="#">Instagram</Link>
                    <Link to="#">Printerest</Link>
                    <Link to="#">Facebook</Link>
                </nav>
            </div>


            <div className="footer-section">

                <h4>Profile</h4>

                <nav className='footer-nav flex'>
                    <Link to="#">My Account</Link>
                    <Link to="#">Checkout</Link>
                    <Link to="#">Order Tracking</Link>
                    <Link to="#">Help & Support</Link>
                </nav>
            </div>
        </div>

        <p className='mt-4'>© 2023 Furnit. All Rights Reserved.</p>

    </footer>
  )
}

export default Footer