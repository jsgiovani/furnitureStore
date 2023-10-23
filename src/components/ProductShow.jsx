import React, { useContext, useEffect, useState } from 'react'
import axiosConnection from '../config/axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../useContext';
import Spinner from './Spinner';
import Page_404 from '../pages/page_404';

const ProductShow = () => {
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);
  const [isInCart, setIsInCart] = useState(false)
  let { slug } = useParams();
  const {handleCart, cart} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isFound, setIsFound] = useState(false);



  //fetch product
  const fetchProduct = async () =>{
    try {
      const request = await axiosConnection(`api/products/${slug}?relations=company`);
      const {data} = await request.data;
      setProduct(data);
      setIsLoading(false);
      setIsFound(true);
    } catch (error) {
      setIsLoading(false);
      setProduct({});
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])


  //verify if this current porduct is added or not in the carrt
  const isProductAddedToCart = ()=>{
      //verify if element exists in cart
      const isInCart = (cart.some(item => item.id ===product.id));

      //if is in cart, update amount
      if (isInCart) {
        const item = cart.filter(item => item.id === product.id);
        setAmount(item[0].amount);
        setIsInCart(true);
      }

  }


  useEffect(() => {
    isProductAddedToCart()
  }, [product])



  useEffect(() => {
    setIsInCart(cart.some(item => item.id ===product.id));
  }, [cart])

  if (isLoading) return <Spinner/>

  return (
    <main className='container'>

      {isFound ? (
        <div className="product-container">
          <div className="product-img">
              <img className='img-product' src={product.image} alt={product.name} />
              <div className="more-image mt-2">
                  <img src="../img/extra1.jpg" alt="extra 1" />
                  <img src="../img/extra2.jpg" alt="extra 2" />
                  <img src="../img/extra3.jpg" alt="extra 3" />
                  <img src="../img/extra4.jpg" alt="extra 4" />
                  <img src="../img/extra5.jpg" alt="extra 5" />
              </div>
          </div>

          <div className="product-info">
            <h1 className='product-name'>{product.name}</h1>

              <p className='product-price'>${product.price}</p>

            <div className="stars">
                  <FontAwesomeIcon className='icon icon-review' icon={faStar} />
                  <FontAwesomeIcon className='icon icon-review' icon={faStar} />
                  <FontAwesomeIcon className='icon icon-review' icon={faStar} />
                  <FontAwesomeIcon className='icon icon-review' icon={faStar} />
                  <FontAwesomeIcon className='icon icon-review' icon={faStar} />
                  <span> (Customers review)</span>
              </div>


              <p className='my-4 product-description'>{product.description}</p>


              <ul className='extra-product-info'>
                  <li className='flex align-center gap-4'>
                      <p>Available: </p>
                      <small>In Stock</small>
                  </li>


                  <li className='flex align-center gap-4'>
                      <p>Brand: </p>
                      <small>{product.company.name}</small>
                  </li>

              </ul>


              <div className="cart-options flex gap-4 align-center mt-2">
                  <button 
                      className='unset cursor-pointer'
                      onClick={()=>{setAmount(amount>1?amount-1:amount)}}
                  
                  >
                      <FontAwesomeIcon className='icon' icon={faMinus} />
                  </button>

                  <p className='amout'>{amount}</p>


                  <button 
                      className='unset cursor-pointer'
                      onClick={()=>{setAmount(amount<10?amount+1:amount)}}
                  >
                      <FontAwesomeIcon className='icon' icon={faPlus} />
                  </button>

              </div>

              <button 
                className='unset btn btn-cart mt-4'
                onClick={()=>{handleCart({...product, amount:amount})}}
              >
                  {isInCart?'Update':'Add to cart'}

              </button>



          </div>

        </div>
       
      ):(
        <Page_404/>
      )}

      
    </main>
  )
}

export default ProductShow