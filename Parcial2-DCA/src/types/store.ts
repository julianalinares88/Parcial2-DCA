import { CartItem, Product } from "./products";


//estoy tipando el appstate
export type AppState = {
    screen: string,
    cart: CartItem[];
    products: Product[];
};

export type Observer = { render: () => void } & HTMLElement;

export enum Actions {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    GET_PRODUCTS = 'GET_PRODUCTS',
};