import { RENDER_PRODUCTS } from '../actions/types';

const initState = {
  all: [],
  offset: 0,
  limit: 12
};

export default ( state = initState, action) => {
  switch (action.type){
    case RENDER_PRODUCTS:
      return {
        ...state,
        all: action.payload};
    default:
      return state;
  }
};
