import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../useContext'
import ProductCart from '../components/ProductCart';
import { Link } from 'react-router-dom';

const Cart = () => {
    const {cart,auth} = useContext(AppContext);
    const [shipping, setShipping] = useState(0);
    const [taxes, setTaxes] = useState(0);

    //calculate total products 
    const countSubtotal = cart.reduce((acumulator, currenItem) => (currenItem.amount * currenItem.price + acumulator), 0);

    
    useEffect(() => {
        setTaxes(countSubtotal*0.08875.toFixed(2));
    }, [cart])


    function sum() {
        return ((parseFloat(countSubtotal)+ parseFloat(taxes) + shipping));
    }


    



  return (
    <main className='container'>
        <h2 className='sopping-title mb-2'>Shopping Cart</h2>

        {
            cart.length > 0 ? (
                <div className='cart-container'>
                    <ul className="cart-products">
                        {cart.map(product => <ProductCart key={product.id} product={product}/>)}
                    </ul>

                    <div className="cart-summary">
                        <div className="cart-totals">
                            <h2 className='cart-summ-title'>Cart Totals</h2>
                            <p className='flex align-center justify-between'>Subtotal <span>${countSubtotal}</span></p>
                            <p className='flex align-center justify-between'>Shipping <span>$0</span></p>
                            <p className='flex align-center justify-between'>Taxes <span>${taxes.toFixed(2)}</span></p>
                            <hr />
                            <h3 className='flex align-center justify-between pb-2'>Order Total <span>${sum().toFixed(2)}</span></h3>


                            {auth ? (
                                <Link className='btn btn-checkout' to ="/checkout">Check Out</Link>
                            ):(
                                <Link className='btn btn-checkout' to ="/auth/login">Login</Link>
                            )}



                        </div>


                    </div>
                </div>
                
            ):(
                <div className='empty-cart my-6'>
                    <p className='no-items text-center my-6'>No items yet</p>
                    <Link className='text-center' to="/shop">Return To Shop</Link>
                    <hr />
              </div>
            )
        }



       
    </main>
  )
}

export default Cart