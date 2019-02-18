import { RENDER_ADMIN, FETCH_ONE_ADMIN, NEW_PRODUCT_ADMIN, SEARCH_PRODUCTS_ADMIN } from './types';
import axios from 'axios';

  export const renderAdmin = ({token, limit, offset, Category_type}) => dispatch => {
    axios.get(`/api/admin/products?token=${token}&limit=${limit}&offset=${offset}&Category_type=${Category_type}`)
    .then( res => res.data )
    .then( products =>
      dispatch({
        type: RENDER_ADMIN,
        payload: products
      })
    );
  };

  export const fetchOneAdmin = ({token, id}) => dispatch => {
    axios.get(`/api/admin/product/${id}?token=${token}`)
    .then( res => res.data )
    .then( product =>
      dispatch({
        type: FETCH_ONE_ADMIN,
        payload: product
      })
    );
  };


  export const createProduct = productData => dispatch => {
    axios.post('/api/admin/products', productData)
      .then( res => res.data )
        .then( product =>
          dispatch ({
            type: NEW_PRODUCT_ADMIN,
            payload: product
          })
        )
  };

  export const searchBoxAdmin = ({token, searchValue}) => dispatch => {
    axios.get(`/api/admin/products/search?search=${searchValue}&token=${token}`)
      .then( res => res.data )
        .then( products => dispatch({
          type: SEARCH_PRODUCTS_ADMIN,
          payload: products
        })
      );
  };
