import { RENDER_BASIC, FETCH_ONE_BASIC } from './types';
import axios from 'axios';


  export const renderBasic = ({limit, offset, Category_type}) => dispatch => {
    axios.get(`/api/basic/products?limit=${limit}&offset=${offset}&Category_type=${Category_type}`)
    .then( res => res.data )
    .then( products =>
      dispatch({
        type: RENDER_BASIC,
        payload: products
      })
    );
  };

  export const fetchOneBasic = id => dispatch => {
    axios.get(`/api/basic/product/`+id)
    .then( res => res.data )
    .then( product =>
      dispatch({
        type: FETCH_ONE_BASIC,
        payload: product
      })
    );
  };
