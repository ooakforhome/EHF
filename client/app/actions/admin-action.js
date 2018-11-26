import { RENDER_ADMIN, FETCH_ONE_ADMIN } from './types';
import axios from 'axios';
import _ from 'lodash';

  export const renderAdmin = ({limit, offset, Category_type}) => dispatch => {
    axios.get(`/api/admin/products?limit=${limit}&offset=${offset}&Category_type=${Category_type}`)
    .then( res => res.data )
    .then( products =>
      dispatch({
        type: RENDER_ADMIN,
        payload: products
      })
    );
  };

  export const fetchOneAdmin = id => dispatch => {
    axios.get(`/api/admin/product/`+id)
    .then( res => res.data )
    .then( product =>
      dispatch({
        type: FETCH_ONE_ADMIN,
        payload: product
      })
    );
  };
