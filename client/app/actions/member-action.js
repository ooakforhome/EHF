import { RENDER_MEMBER, FETCH_ONE_MEMBER, SEARCH_PRODUCTS_MEMBER } from './types';
import axios from 'axios';


  export const renderMember = ({token, limit, offset, Category_type}) => dispatch => {
    axios.get(`/api/member/products?token=${token}&limit=${limit}&offset=${offset}&Category_type=${Category_type}`)
    .then( res => res.data )
    .then( products =>
      dispatch({
        type: RENDER_MEMBER,
        payload: products
      })
    );
  };

  export const fetchOneMember = ({token, id}) => dispatch => {
    axios.get(`/api/member/product/${id}?token=${token}`)
    .then( res => res.data )
    .then( product =>
      dispatch({
        type: FETCH_ONE_MEMBER,
        payload: product
      })
    );
  };

  export const searchBoxMember = ({token, searchValue}) => dispatch => {
    axios.get(`/api/member/products/search?search=${searchValue}&token=${token}`)
      .then( res => res.data )
        .then( products => dispatch({
          type: SEARCH_PRODUCTS_MEMBER,
          payload: products
        })
      );
  };
