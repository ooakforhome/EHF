import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import productReducer from './product-reducer';
import renderReducer from './render-reducer';

const rootReducer = combineReducers({
  newproducts: productReducer,
  renderproducts: renderReducer,
  form: formReducer,
});

export default rootReducer;
