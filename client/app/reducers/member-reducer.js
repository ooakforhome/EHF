import { RENDER_MEMBER, FETCH_ONE_MEMBER, SEARCH_PRODUCTS_MEMBER } from '../actions/types';

const initState = {
  products: [],
  product: {}
};

export default function(state = initState, action){
  switch (action.type){
    case RENDER_MEMBER:
     return {
       ...state,
       products: action.payload
     }
     case FETCH_ONE_MEMBER:
      return {
        state,
        product: action.payload
     }
     case SEARCH_PRODUCTS_MEMBER:
      return {
        state,
        products: action.payload
      }
    default:
      return state;
  }
};
