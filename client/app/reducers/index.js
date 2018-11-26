import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import productReducer from './product-reducer';
import basicReducer from './basic-reducer';
import memberReducer from './member-reducer';

const rootReducer = combineReducers({
  newproducts: productReducer,
  memberproducts: memberReducer,
  basicproducts: basicReducer,
  form: formReducer,
});

export default rootReducer;
