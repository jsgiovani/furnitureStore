import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../useContext'
import axiosConnection from '../config/axios';
import { useEffect } from 'react';

const Aside = ({setSearchParams, searchParams,fetchProducts}) => {
    const {categories, products} = useContext(AppContext);
    const searchRef = useRef('');
    const [companies, setCompanies] = useState([]);
  
  


    //fetch companies
    const fetchCompanies = async ()=>{
        try {
            const {data} = await axiosConnection.get('api/companies');
            setCompanies(data.data);
        } catch (error) {
            
        }
    }


    //watch for every change is made in input search, if something is typed in the input send api request to find matched requests 
    useEffect(() => {

        if (searchRef.current.value !=='') {
            searchParams.set('search', searchRef.current.value);
            setSearchParams(searchParams);
        }else{
            searchParams.delete('search');
            setSearchParams(searchParams);
        }
    }, [searchRef.current.value])

    


    useEffect(() => {
        fetchCompanies();
    }, [])


  return (
    <aside className='aside'>

        <h2 className='mb-3'>Short by:</h2>

        <input  className='mb-2 unset' type="search" name="search" id="search" placeholder='Search product...' ref={searchRef} onChange={()=>{fetchProducts()}}  />
        <section className='categories'>
            <h4 className='mb-1'>Categories</h4>
            <div className='btns-categories aside-section'>
                {categories.map((category) => {
                    const {id, name} = category;
                    return(
                        <button 
                            key={id}
                            className='unset cursor-pointer'
                            onClick={()=>{searchParams.set('category', id); setSearchParams(searchParams)}}
                        >
                            { ` ${name} (${products.filter(product => product.categoryId===id).length})` }
                        </button>
                    );
                })}

            </div>
        </section>


        <section className='aside-section'>
            <h4 className='my-1'>Company</h4>
            <div className='btns-categories aside-section'>
                {companies.map((category) => {
                    const {id, name} = category;
                    return(
                        <button 
                            key={id}
                            className='unset cursor-pointer'
                            onClick={()=>{searchParams.set('company', id); setSearchParams(searchParams)}}
                        >
                            { ` ${name} (${products.filter(product => product.companyId===id).length})`}
                        </button>
                    );
                })}

            </div>

        </section>
    </aside>
  )
}

export default Aside