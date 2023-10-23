import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import { AppContext } from '../useContext';

const CheckOut = () => {

    const {cart} = useContext(AppContext);


    const [shipping, setShipping] = useState(0);
    const [taxes, setTaxes] = useState(0);

    //calculate total products 
    const countSubtotal = cart.reduce((acumulator, currenItem) => (currenItem.amount * currenItem.price + acumulator), 0);


    function sum() {
        return ((parseFloat(countSubtotal)+ parseFloat(taxes) + shipping));
    }


    const nameRef = useRef();
    const addressRef = useRef();

    const [alerts, setAlerts] = useState([]);
    
  return (
    <main className='container'>
        <h1>Place your order</h1>
        <hr />

        <div className="shipping-container grid grid-cols-2 gap-4 mt-4">
            <div className="shiping-information">
                <h3>Shipping Information</h3>

                <form className='auth-form' onSubmit={(e)=>{handleSubmit(e)}}>
            
                    <div className="auth-alerts">
                        {alerts.length>0 &&(
                            alerts.map((alert, index) => <p className='mb-2 p-1' key={index}>{alert}</p>)
                        )}
                    </div>

                    <input className='unset p-2' type="text" name="name" id="name" placeholder='Full Name' ref={nameRef} />
                    <input className='unset p-2' type="text" name="address" id="address" placeholder='Address' ref={addressRef} />
                    <input className='unset p-2 cursor-pointer' type="submit" value="Place your order" />
                </form>
                
            </div>

            <div className="cart-totals">
                <h2 className='cart-summ-title'>Cart Totals</h2>
                <p className='flex align-center justify-between'>Subtotal <span>${countSubtotal}</span></p>
                <p className='flex align-center justify-between'>Shipping <span>$0</span></p>
                <p className='flex align-center justify-between'>Taxes <span>${taxes.toFixed(2)}</span></p>
                <hr />
                <h3 className='flex align-center justify-between'>Order Total <span>${sum().toFixed(2)}</span></h3>
            </div>

            

        </div>

    </main>
  )
}

export default CheckOut