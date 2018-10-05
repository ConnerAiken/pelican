import { ORDER_SUBMITTED, ADD_ITEM, REMOVE_ITEM, INCREMENT_ITEM, DECREMENT_ITEM, CLEAR_CART, SELECT_STORE, TOGGLE_SIDEBAR, TOGGLE_DRIVER_STATUS } from "./../constants/actionTypes";

export const orderSubmitted = (items) => {
    return { type: ORDER_SUBMITTED, payload: items };
};

export const toggleDriverStatus = () => { 
    return { type: TOGGLE_DRIVER_STATUS, payload: {} };
};

export const toggleSidebar = () => { 
    return { type: TOGGLE_SIDEBAR, payload: {} };
};

export const selectStore = item => { 
    return { type: SELECT_STORE, payload: item };
};

export const clearCart = () => { 
    return { type: CLEAR_CART, payload: {} };
};

export const addCartItem = item => { 
    return { type: ADD_ITEM, payload: item };
};

export const removeCartItem = item => { 
    return { type: REMOVE_ITEM, payload: item };
};

export const incrementCartItem = item => { 
    return { type: INCREMENT_ITEM, payload: item };
};

export const decrementCartItem = item => { 
    return { type: DECREMENT_ITEM, payload: item };
};