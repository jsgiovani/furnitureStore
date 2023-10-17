import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../useContext';
import Aside from './Aside';
import Product from './Product';

const Shop = () => {
  const {categories,products, search, isSearchActive} = useContext(AppContext);
  const [filters, setFilters] = useState({});


  const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value);

  function filterPlainArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores an empty filter
        if (!filters[key].length) return true;
        return filters[key].find(filter => getValue(filter) === getValue(item[key]));
      });
    });
  }

  const listedFilters = {
    categoryId: 'Category',
    companyId: 'Company'
  }

  const getFilters = item => {
    let content = [];
    for (let idx in item) {
      const item = item[idx];
      content.push(<li key={item.id}>{item.animal}</li>);
    }
    return content;
  };


  let productsToShow = filterPlainArray(products,filters);

  //filter products by product category

  useEffect(() => {
    console.log(filters);
  }, [filters])





  return (
    <main className='container shop'>

      <Aside filters = {filters} setFilters = {setFilters}/>
      <div className="products-container">
        <div>
            <p className='mb-2'>Showing   { isSearchActive ? search.length : productsToShow.length} products</p>

        </div>
        <div className="filters flex gap-1">
            <ul>{getFilters(filters)}</ul>
        </div>

        <div className="products">
            {isSearchActive ? (
                search.length > 0 ? (
                    search.map(product => <Product key={product.id} product ={product} />)
                ): (
                    <p>No products found</p>
                )

            ):(
                productsToShow.length > 0 ? (
                    productsToShow.map(product => <Product key={product.id} product ={product} />)
                ): (
                    <p>No products found</p>
                )
                
            )}
          
        </div>
      </div>
    


     
    </main>
  )
}

export default Shop