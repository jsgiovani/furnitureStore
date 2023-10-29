import React, { useEffect, useState } from 'react'
import axiosConnection from '../config/axios'
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

  //fetch orders from api
  const fetchOrders = async()=>{
    try {
        const {data} = await axiosConnection.get('api/orders',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        setOrders(data.data)
        setIsLoading(false);
        
    } catch (error) {
        console.log(error);

    }

  }


  useEffect(() => {
    fetchOrders();
  }, [])


  if (isLoading) return <Spinner/>

  return (
    <main className='container'>
        <h1>Your Orders</h1>
        <hr />
        {orders.length > 0 ? (
            <table className='table'>
                <thead className='thead'>
                    <tr className='tr'>
                        <th className='th'>Name</th>
                        <th className='th'>Address</th>
                        <th className='th'>Products</th>
                        <th className='th'>Cost</th>
                        <th className='th'>Date</th>
                    </tr>
                </thead>

                <tbody className='tb'>
                    {orders.map((item) =>{
                        const {id, userName, address, products, price,date} = item
                        return(
                            <tr className='tr' key={item.id}>
                                <td data-title='Name' className='td'>{userName}</td>
                                <td data-title ='Address' className='td'>{address}</td>
                                <td data-title ='Products'  className='td'>{products}</td>
                                <td data-title ='Price' className='td'>${price}</td>
                                <td data-title ='Date' className='td'>{date}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
            
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