import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../useContext'
import { Link } from 'react-router-dom';

const Home = () => {
  const {categories, currentCategory, setCurrentCategory, products } = useContext(AppContext);

  const filteredProducts = products.filter(item => (item.categoryId === currentCategory.id ));

  const handleCategory = (category) =>{
    setCurrentCategory(category)
  }

  return (
    <main className='main container'>
        <div className="home_bg">

            <div className="bg-home-info">
                <h2 className='bg-home-text'>Premium products</h2>
                <p>Premium products sit amet consectetur adipisicing elit. Qui sed non, deleniti praesentium</p>
            </div>

            
            
        </div>

        <div className="filters-home my-4 flex gap-2 wrap justify-center">
            {categories.map((category) =>{
                const {id,name} = category;
                return(
                    <button onClick={()=>{handleCategory(category)}} className={`unset ${currentCategory.id == id ? 'active': ''}`} key={id}>{name}</button>
                );
            })}

        </div>

        <section className='home-products'>

            <div className='flex justify-between align-center'>
                <h2 className='my-4'>Top 10 Products</h2>
                <Link to="/shop">See More</Link>
            </div>

            <div className="products">
                {filteredProducts.map(product => {
                    const {name, image, price, slug} = product;
                    return(
                        <div className='product' key={product.id}>
                            <Link to ={`/products/${slug}`}>
                                <img src={image} alt={name} />
                            </Link>

                            <div className="product-info mt-1 text-center flex justify-between px-1">
                                <h3>{name}</h3>
                                <p>${price}</p>
                            </div>

                        </div>
                    );
                })}
            </div>
        </section>
      
    </main>
  )
}

export default Home