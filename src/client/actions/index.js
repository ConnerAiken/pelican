import { ADD_ITEM, REMOVE_ITEM, INCREMENT_ITEM, DECREMENT_ITEM } from "./../constants/actionTypes";

export const addToCart = item => {
    console.log("[addToCart] Action called", item);
    return { type: ADD_ITEM, payload: item };
};

export const removeFromCart = item => {
    console.log("[removeFromCart] Action called", item);
    return { type: REMOVE_ITEM, payload: item };
};

export const incrementCartItem = item => {
    console.log("[incrementCartItem] Action called", item);
    return { type: INCREMENT_ITEM, payload: item };
};

export const decrementCartItem = item => {
    console.log("[decrementCartItem] Action called", item);
    return { type: DECREMENT_ITEM, payload: item };
};