import { FETCH_PRODUCTS, FETCH_ONE, NEW_PRODUCT, UPDATE_PRODUCT, FETCH_CATEGORY, SEARCH_SKU, SEARCH_PRODUCT } from '../actions/types'

const initialState = {
  products: [],
  product: {},
  offset: 0,
  limit: 20
};

export default function(state = initialState, action){
  switch(action.type){
    case SEARCH_SKU:
      return {
        state,
        product: action.payload
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        products: action.payload
      };
    case FETCH_ONE:
      return {
        state,
        product: action.payload
      };
    case NEW_PRODUCT:
      return {
        state,
        product: action.payload
      };
    case UPDATE_PRODUCT:
      return {
        state,
        product: action.payload
      }
    default:
      return state;
  }
}
