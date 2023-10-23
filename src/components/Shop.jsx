import React, { useEffect, useState } from 'react'
import Aside from './Aside';
import Product from './Product';
import axiosConnection from '../config/axios';
import Spinner from './Spinner';
import { useLocation, useSearchParams } from 'react-router-dom';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Shop = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();  
    const {search} = useLocation();


  //fetch products
  const fetchProducts = async ()=>{
    try {
      const {data} = await axiosConnection.get(`api/products${search}`);
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      setProducts([]);
    }

  }


  //when component is fully loaded, fetch all products
  useEffect(() => {
    fetchProducts();
  }, [])


  useEffect(() => {
    fetchProducts();
  }, [searchParams])




  //show spinner if products are still loading...
  if (loading) return <Spinner/>


  return (
    <main className='container shop'>

      <Aside setSearchParams= {setSearchParams} searchParams = {searchParams} setProducts = {setProducts} fetchProducts = {fetchProducts}/>
      <div className="products-container">


        <div>
            <p className='mb-2'>{products.length>0 ? products.length : 'No'} product(s) found</p>

        </div>

        {search.length>0 &&(
            <div className="filters flex gap-2 align-center">
            <p className='filter-title'>Active Filters</p>

            {searchParams.get('search') && (
                <div className='flex filter gap-2'>
                    <p>Search: {searchParams.get('search')}</p>
                    <button onClick={()=>{searchParams.delete('search'); setSearchParams(searchParams)}}  className='unset cursor-pointer'><FontAwesomeIcon icon={faCircleXmark} /></button>
                </div>
            )}

            {searchParams.get('category') && (
                <div className='flex filter gap-2'>
                    <p>Category</p>
                    <button onClick={()=>{searchParams.delete('category'); setSearchParams(searchParams)}}  className='unset cursor-pointer'><FontAwesomeIcon icon={faCircleXmark} /></button>
                </div>
            )}

            {searchParams.get('company') && (
                 <div className='flex filter gap-2'>
                    <p>Company</p>
                    <button onClick={()=>{searchParams.delete('company'); setSearchParams(searchParams)}}  className='unset cursor-pointer'><FontAwesomeIcon icon={faCircleXmark} /></button>
                </div>
            )}

            
            </div>
        )}

        <div className="products">
            {
                products.length > 0 ? (
                    products.map(product => <Product key={product.id} product ={product} />)
                ): (
                    <p>No products found</p>
                )
            }
          
        </div>
      </div>
    
    </main>
  )
}

export default Shop