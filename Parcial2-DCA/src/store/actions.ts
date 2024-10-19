import { Actions } from './../types/store';
import { getProducts } from '../services/getProducts';
import { Product } from '../types/products';


export const addToCart = (payload: Product) => {
    return {
        
        action: Actions.ADD_TO_CART,
        
        payload: payload,
    };
};

export const removeFromCart = (payload: number) => {
    return {
        action: Actions.REMOVE_FROM_CART,
        payload: payload, 
    };
};


export const getProductsState = async () => {
    const data = await getProducts()
    return {
        action: Actions.GET_PRODUCTS,
        payload: data,
    };
};
