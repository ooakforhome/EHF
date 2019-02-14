import { RENDER_ADMIN, FETCH_ONE_ADMIN, NEW_PRODUCT_ADMIN, SEARCH_PRODUCTS_ADMIN } from '../actions/types';

const initState = {
  products: [],
  product: {}
};

export default function(state = initState, action){
  switch (action.type){
    case RENDER_ADMIN:
     return {
       ...state,
       products: action.payload
     };
     case FETCH_ONE_ADMIN:
      return {
        state,
        product: action.payload
      };
     case NEW_PRODUCT_ADMIN:
      return {
        state,
        product: action.payload
      };
     case SEARCH_PRODUCTS_ADMIN:
      return {
        state,
        products: action.payload
      };
    default:
      return state;
  }
};
