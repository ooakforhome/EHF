import axios from "axios";

export default {
  loadLastImg: function(){
    return axios.get('/api/fileid')
  },

  searchBox: function({searchValue}){
    return axios.get(`/api/basic/products/search?search=${searchValue}`)
  },

  loadProducts: function({category_type}){
    return axios.get(`/api/basic/products?category_type=${category_type}`)
  }


};
