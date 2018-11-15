import { RENDER_COUNT } from '../actions/types';

const initState = {
  products: [],
  product: {}
};

export default function(state = initState, action){
  switch (action.type){
    case RENDER_COUNT:
     return {
       state,
       products: action.payload
     }
    default:
      return state;
  }
};
