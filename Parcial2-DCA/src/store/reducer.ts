import { Actions } from "../types/store";


export const reducer = (currentAction: any, currentState: any) => {
    const { action, payload } = currentAction;

    switch (action) {
        case Actions.ADD_TO_CART:
            return {
                ...currentState,
                cart: [...currentState.cart, payload],
            };

        case Actions.REMOVE_FROM_CART:
            const filteredCart = currentState.cart.filter((item: any) => item.uid !== payload); // Comparar directamente con el uid
            return {
                ...currentState,
                cart: filteredCart,
            };

        case Actions.GET_PRODUCTS:
            return {
                ...currentState,
                products: payload,
            };

        default:
            return currentState;
    }
};

