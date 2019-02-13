import axios from "axios";

export default {
  loadLastImg: function(){
    return axios.get('/api/fileid')
  },

  searchBox: function({searchValue, offset=0, limit=10}){
    return axios.get(`/api/basic/products/search?search=${searchValue}&offset=${offset}&limit=${limit}`)
  },

  loadProducts: function({category_type, limit, offset}){
    return axios.get(`/api/basic/products?category_type=${category_type}&limit=${limit}&offset=${offset}`)
  }


};
