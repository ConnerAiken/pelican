import _ from "lodash";
import UserService from "./../services/User";
import { 
    ORDER_SUBMITTED,
    ADD_ITEM, 
    REMOVE_ITEM, 
    INCREMENT_ITEM, 
    DECREMENT_ITEM, 
    CLEAR_CART,
    SELECT_STORE,
    TOGGLE_SIDEBAR,
    TOGGLE_DRIVER_STATUS
} from "../constants/actionTypes"; 

import {
    initialState
} from "../constants/state";

const rootReducer = (state = initialState, action) => {
  console.log("[rootReducer] "+action.type+" called.", state);
  let newState = _.cloneDeep(state);
  let userApi = new UserService();

  switch (action.type) {

    case ORDER_SUBMITTED:
        newState.cart = action.payload;
        return newState;

    case TOGGLE_DRIVER_STATUS:
        newState.isAcceptingOrders = state.isAcceptingOrders == 1 ? 0 : 1;  
        userApi.toggleAcceptingOrders(newState);
        return newState;

    case TOGGLE_SIDEBAR:  
        newState.sidebar.collapsed = !state.sidebar.collapsed;
        return newState; 

    case SELECT_STORE:  
        newState.cart.length = 0; 
        newState.store = action.payload;

        return newState; 
    
    case CLEAR_CART:  
        newState.cart.length = 0; 
        return newState; 
    
    case ADD_ITEM:  
        newState.cart.push(action.payload); 
        return newState; 

    case REMOVE_ITEM:  
        newState.cart = newState.cart.slice(0).filter(item => item.id != action.payload.id)  
        return newState; 

    case INCREMENT_ITEM:  
        newState.cart.forEach(item => {
            if(item.id == action.payload.id) {
                item.quantity += 1;
            }
        }); 
        return newState; 

    case DECREMENT_ITEM:  
        newState.cart.forEach(item => {
            if(item.id == action.payload.id) {
                item.quantity -= 1;
            }
        });
        return newState; 

    default:
      return state;
  }
};

export default rootReducer;