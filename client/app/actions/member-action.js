import { RENDER_MEMBER, FETCH_ONE_MEMBER, SEARCH_PRODUCTS_MEMBER } from './types';
import axios from 'axios';
import _ from 'lodash';

  export const renderMember = ({limit, offset, Category_type}) => dispatch => {
    axios.get(`/api/member/products?limit=${limit}&offset=${offset}&Category_type=${Category_type}`)
    .then( res => res.data )
    .then( products =>
      dispatch({
        type: RENDER_MEMBER,
        payload: products
      })
    );
  };

  export const fetchOneMember = id => dispatch => {
    axios.get(`/api/member/product/`+id)
    .then( res => res.data )
    .then( product =>
      dispatch({
        type: FETCH_ONE_MEMBER,
        payload: product
      })
    );
  };

  export const searchBoxMember = searchValue => dispatch => {
    axios.get(`/api/member/products/search?search=${searchValue}`)
      .then( res => res.data )
        .then( products => dispatch({
          type: SEARCH_PRODUCTS_MEMBER,
          payload: products
        })
      );
  };
