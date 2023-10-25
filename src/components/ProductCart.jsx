import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { AppContext } from '../useContext';

const ProductCart = ({product}) => {
    const {removeProduct, handleCart} = useContext(AppContext);
    const {id, name, image, price, amount} = product;
    const [productAmount, setProductAmount] = useState(amount);


    function add() {
        setProductAmount(productAmount<10 ? productAmount+1:productAmount);
        handleCart({...product, amount:productAmount<10 ? productAmount+1:productAmount})
    }


    function rest() {
        setProductAmount(productAmount>1 ? productAmount-1:productAmount);
        handleCart({...product, amount:productAmount>1 ? productAmount-1:productAmount})
    }

  return (
    <li className='product-cart mb-4'>
        <img src={image} alt={name} />
        <h5>{name}</h5>
        <p>${price}</p>
        <div className="product-amout flex gap-3">
            <button 
                className='unset cursor-pointer'
                onClick={()=>{
                    rest()
                }}
            
            >
                <FontAwesomeIcon className='icon' icon={faMinus} />
            </button>

            <p className='amout'>{productAmount}</p>


            <button 
                className='unset cursor-pointer'
                onClick={()=>{
                    add();
                }}
            >
                <FontAwesomeIcon className='icon' icon={faPlus} />
            </button>
        </div>

        <p className='subtotal'>${price*productAmount}</p>

        <button 
            className='unset cursor-pointer btn-delete'
            onClick={()=>removeProduct(id)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </li>
  )
}

export default ProductCart