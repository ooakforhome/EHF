import { RENDER_BASIC, FETCH_ONE_BASIC } from '../actions/types';

const initState = {
  products: [],
  product: {}
};

export default function(state = initState, action){
  switch (action.type){
    case RENDER_BASIC:
     return {
       ...state,
       products: action.payload
     }
     case FETCH_ONE_BASIC:
      return {
        state,
        product: action.payload
      }
    default:
      return state;
  }
};
