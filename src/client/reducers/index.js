import { ADD_ITEM, REMOVE_ITEM, INCREMENT_ITEM, DECREMENT_ITEM } from "../constants/actionTypes";
import _ from "lodash";

const initialState = {
    cart: []
};

const rootReducer = (state = initialState, action) => {
  console.log("[rootReducer] "+action.type+" called.");
  let newState = _.cloneDeep(state);

  switch (action.type) {
    
    case ADD_ITEM:  
        newState.cart.push(action.payload);
        console.log("Alleged new state", newState);

        return newState; 

    case REMOVE_ITEM:  
        newState.cart = newState.cart.slice(0).filter(item => item.id != action.payload.id) 
  
        return newState; 

    case INCREMENT_ITEM:  
        newState.cart.forEach(item => {
            if(item.id == e.detail.id) {
                item.quantity += 1;
            }
        }) 
        
        return newState; 

    case DECREMENT_ITEM:  
        newState.cart.forEach(item => {
            if(item.id == e.detail.id) {
                item.quantity -= 1;
            }
        }) 
        
        return newState; 

    default:
      return state;
  }
};

export default rootReducer;