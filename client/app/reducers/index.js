import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import productReducer from './product-reducer';


const rootReducer = combineReducers({
  newproducts: productReducer,
  form: formReducer,
});

export default rootReducer;
