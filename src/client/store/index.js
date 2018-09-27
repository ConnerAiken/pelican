import { createStore } from "redux";
import rootReducer from "./../reducers/index";
import { initialState } from "./../constants/state.js";
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : initialState;

console.log("Persisted State", persistedState);

const store = createStore(
    rootReducer,
    persistedState
    );

store.subscribe(()=>{
    console.log("Saving state", store.getState());
    localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
 
export default store;