import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import CONFIG from "./Reducer/reducer";

const store = createStore(CONFIG, composeWithDevTools());
export default store;
