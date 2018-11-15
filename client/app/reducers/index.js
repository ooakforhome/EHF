import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import productReducer from './product-reducer';
import renderCount from './render-reducer';

const rootReducer = combineReducers({
  newproducts: productReducer,
  rendercount: renderCount,
  form: formReducer,
});

export default rootReducer;
