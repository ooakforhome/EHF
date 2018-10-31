import { FETCH_PRODUCTS, FETCH_ONE, NEW_PRODUCT, UPDATE_PRODUCT, FETCH_CATEGORY, SEARCH_SKU, RENDER_PRODUCTS } from './types';
import axios from 'axios';

export const searchSku = (sku) => dispatch => {
  axios.get(`/api/products?SKU=${sku}`)
    .then( res=> res.data )
    .then( products =>
      dispatch({
        type: SEARCH_SKU,
        payload: product
      })
    );
};

export const renderProducts = (limit, offset) => dispatch => {
  axios.get(`/api/allproducts`)
  .then( res => res.data )
  .then( products =>
    dispatch({
      type: RENDER_PRODUCTS,
      payload: products
    })
  );
};


export const fetchProducts = ({limit, offset}) => dispatch => {
  axios.get(`/api/products?limit=${limit}&offset=${offset}`)
  .then( res => res.data )
  .then( products =>
    dispatch({
      type: FETCH_PRODUCTS,
      payload: products
    })
  );
};


export const fetchCategory = (category) => dispatch => {
  axios.get('/api/products/' + category)
  .then( res => res.data )
  .then( products =>
    dispatch({
      type: FETCH_CATEGORY,
      payload: products
    })
  );
};

export const fetchOne = id => dispatch => {
  axios.get('/api/product/' + id)
  .then( res => res.data )
  .then( product =>
    dispatch({
      type: FETCH_ONE,
      payload: product
    })
  );
};

export const createProduct = productData => dispatch => {
  axios.post('/api/products', productData)
    .then( res => res.data )
    .then( product =>
      dispatch ({
        type: NEW_PRODUCT,
        payload: product
      })
    )
  return window.location = '/products/all'
};

export const updateProduct = (id, data) => dispatch => {
  axios.put(`/api/product/${id}`, data)
    .then( res => res.data )
    .then( product =>
      dispatch ({
        type: UPDATE_PRODUCT,
        payload: product
      })
    )
}
