import { RENDER_ADMIN, FETCH_ONE_ADMIN } from '../actions/types';

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
     }
     case FETCH_ONE_ADMIN:
      return {
        state,
        product: action.payload
      }
    default:
      return state;
  }
};
