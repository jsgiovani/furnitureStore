import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../useContext'
import axiosConnection from '../config/axios';
import { useEffect } from 'react';

const Aside = ({filters, setFilters}) => {
    const {categories, setSearch, setIsSearchActive, products} = useContext(AppContext);
    const searchRef = useRef('');
    const [keyWordSearch, setKeyWordSearch] = useState('');
    const [companies, setCompanies] = useState([]);

    //searching data by keyword.
    const searchData = async () =>{
        
        try {
            const {data} = await axiosConnection.get(`api/search/${searchRef.current.value}`);
            setIsSearchActive(true);
            setSearch(data.data);
        } catch (error) {
            setIsSearchActive(false);
        }
    }


    const fetchCompanies = async ()=>{
        try {
            const {data} = await axiosConnection.get('api/companies');
            setCompanies(data.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (keyWordSearch==='') {
            setIsSearchActive(false);
        }
    }, [keyWordSearch])


    useEffect(() => {
        fetchCompanies();
    }, [])





  return (
    <aside className='aside'>

        <h2 className='mb-3'>Short by:</h2>

        <input  className='mb-2 unset' type="search" name="search" id="search" placeholder='Search product...' ref={searchRef} onChange={()=>{searchData(); setKeyWordSearch(searchRef.current.value)}}  />
        <section className='categories'>
            <h4 className='mb-1'>Categories</h4>
            <div className='btns-categories aside-section'>
                {categories.map((category) => {
                    const {id, name} = category;
                    return(
                        <button 
                            key={id}
                            className='unset cursor-pointer'
                            onClick={()=>{setFilters({...filters,...{categoryId:[id]}})}}
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
                            onClick={()=>{setFilters({...filters,...{companyId:[id]}})}}
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