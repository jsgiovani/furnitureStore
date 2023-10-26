import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import { AppContext } from '../useContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axiosConnection from '../config/axios';
import Alert from '../components/Alert';

const CheckOut = () => {
    const {cart, setCart} = useContext(AppContext);
    const [shipping, setShipping] = useState(0);
    const [taxes, setTaxes] = useState(0);
    
    const navegate = useNavigate();
    
    const nameRef = useRef();
    const addressRef = useRef();
    
    //calculate total products 
    const countSubtotal = cart.reduce((acumulator, currenItem) => (currenItem.amount * currenItem.price + acumulator), 0);
    
    //count total items in cart
    const totalItems = cart.reduce((acumulator, currenItem) => currenItem.amount + acumulator, 0)
    
    

    function sum() {
        return ((parseFloat(countSubtotal)+ parseFloat(taxes) + shipping));
    }

    
    
    useEffect(() => {
        setTaxes(countSubtotal*0.08875.toFixed(2));
    }, [])



    const [alerts, setAlerts] = useState([]);


    const handleSubmit = async (e)=>{
        e.preventDefault();

        const data = {
            user_name: nameRef.current.value,
            address: addressRef.current.value,
            products: totalItems,
            price: sum().toFixed(2) 
        }



        try {
            await axiosConnection.post('api/orders', data, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            setAlerts([]);
            
            Swal.fire(
                'Order Created Successfully!',
                'Please Check you email for more confirmation!',
                'success'
                ).then(result => {               
                setCart([]);
                navegate('/orders');
            })

            //clean cart
        } catch (error) {
            setAlerts(Object.values(error?.response?.data?.errors));
        }                
    }
    
  return (
    <main className='container checkout'>
        <h1>Place your order</h1>

        {cart.length>0 ? (
            <div className="shipping-container">

                
                <div className="shiping-information">
                    <h3 className='shipping-subtitle'>Shipping Information</h3>

                    <form className='auth-form' onSubmit={(e)=>{handleSubmit(e)}}>
                
                        <div className="alerts">
                            {alerts.length>0 &&(
                                alerts.map((alert, index) => <Alert key = {index} type = 'danger' alert = {alert}/>)
                            )}
                        </div>

                        <input className='unset p-2' type="text" name="name" id="name" placeholder='Full Name' ref={nameRef} />
                        <input className='unset p-2' type="text" name="address" id="address" placeholder='Delivery address' ref={addressRef} />
                        <input className='unset p-2 cursor-pointer btn-checkout' type="submit" value="Place your order" />
                    </form>
                    
                </div>
        

                <div className="order-summary">
                    <h2 className='cart-summ-title'>Order summary</h2>
                    <p className='flex align-center justify-between'>Subtotal <span>${countSubtotal}</span></p>
                    <p className='flex align-center justify-between'>Shipping <span>$0</span></p>
                    <p className='flex align-center justify-between'>Taxes <span>${taxes.toFixed(2)}</span></p>
                    <hr />
                    <h3 className='flex align-center justify-between'>Order Total <span>${sum().toFixed(2)}</span></h3>
                </div>



                


            </div>
        ):(
            <div className='empty-cart my-6 checkout'>
                <p className='no-items text-center my-6'>No items yet</p>
                <Link className='text-center mb-4' to="/shop">Return To Shop</Link>
                <hr />
            </div>
        )}

    </main>
  )
}

export default CheckOut