import { createContext, useContext, useEffect, useState } from 'react';
import axiosConnection from './config/axios';

const AppContext = createContext();

const AppProvider = ({children}) =>{
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentCategory, setCurrentCategory] = useState({});
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});

    //check local storage, if not empty set cart with local storage value else empty cart
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []);
    



    //fetch categories
    async function fetchCategories() {

        try {
            const response = await axiosConnection.get('api/categories');
            const categories = response.data.data;
            setCategories(categories);
            setCurrentCategory(categories[0])
        } catch (error) {
            console.log(error);
            
        }

    }


    //fetch productos
    const fetchProducts = async () =>{
        try {
            const request = await axiosConnection.get('api/products');
            const {data} = await request.data;
            setProducts(data);
        } catch (error) {
            console.log(error);
        }

    }


    //add new elemento cart
    const handleCart = (element)=>{

        //verify if element to add is added or not
        const isElementAdded = cart.some(item => item.id === element.id);
    
        if (isElementAdded) {
            //update element
            const tempElement = cart.map(item => {
                if (item.id ===element.id) {
                    item.amount = element.amount;
                }
                return item;
            })
            setCart(tempElement);

        }else{
            //add element
            setCart([...cart, element]);
        }

    } 

    //remove item from cart
    const removeProduct = (productId) => {
        setCart(cart.filter(item => item.id !== productId))
    };





    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [])


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    return(
        <AppContext.Provider value={{
            categories,
            products,
            currentCategory,
            setCurrentCategory,
            handleCart,
            cart,
            setCart,
            removeProduct,
            auth,
            setAuth,
            setUser,
            user
         }}>
            {children}
        </AppContext.Provider>
    );
}


export {AppContext, AppProvider}