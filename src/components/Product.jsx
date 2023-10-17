import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';

const Product = ({product}) => {
    const { slug, price, image, name } = product;
  return (
    <div className='product'>
        <Link to ={`/products/${slug}`}>
            <img src={image} alt={name} />
        </Link>

        <div className="product-info mt-2 text-center">
            <h3>{name}</h3>
            <div className="stars">
                <FontAwesomeIcon className='icon icon-review' icon={faStar} />
                <FontAwesomeIcon className='icon icon-review' icon={faStar} />
                <FontAwesomeIcon className='icon icon-review' icon={faStar} />
                <FontAwesomeIcon className='icon icon-review' icon={faStar} />
                <FontAwesomeIcon className='icon icon-review' icon={faStar} />
            </div>
            <p>${price}</p>
        </div>

    </div>
  )
}

export default Product