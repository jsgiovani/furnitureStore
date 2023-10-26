import React, { useEffect, useState } from 'react'
import axiosConnection from '../config/axios'
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);

  //fetch orders from api
  const fetchOrders = async()=>{
    try {
        const {data} = await axiosConnection.get('api/orders',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        setOrders(data.data)
        console.log(data.data);
        
    } catch (error) {
        console.log(error);

    }

  }


  useEffect(() => {
    fetchOrders();
  }, [])


  return (
    <main className='container'>
        <h1>Your Orders</h1>
        {orders.length > 0 ? (
            <div className="orders">
                {orders.map((order) => {
                    const {id, userName, products, price} = order;
                    return(
                        <div key={id}>
                            <p>{userName}</p>
                        </div>
                    );
                })}
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

export default Orders