import { FETCH_PRODUCTS, FETCH_ONE, NEW_PRODUCT, UPDATE_PRODUCT, FETCH_CATEGORY, SEARCH_SKU, RENDER_PRODUCTS } from './types';
import axios from 'axios';
import _ from 'lodash';

export const searchProducts = (...criteria) => dispatch =>
  SearchProductsProxy(...criteria)
    .then((products = []) =>
      dispatch({ type: SEARCH_PRODUCT, payload: products})
);

const SearchProductsProxy = (criteria, offset, limit) => {
  const product = ("/api/allproducts", (_.omit(criteria, 'sort'), criteria.sort, offset, limit));
  if(!product || !product.then){
    return new Promise(()=>{});
  }
  return product;
};

const refreshSearch = (dispatch, getState) => {
  const { products: { offset, limit }} = getState();
  const criteria = getState().form.filters.values;

  dispatch(searchProducts({Product_Name: '', ...criteria }, offset, limit))
}

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
};
