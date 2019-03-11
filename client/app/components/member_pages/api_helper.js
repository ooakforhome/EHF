import axios from 'axios';


export default {

  //----begin---------- new memberProducts api -----------------
  getAllProducts: function(token, limit, offset, Category_type){
    return axios.get(`/api/member/products?token=${token}&limit=${limit}&offset=${offset}&Category_type=${Category_type}`)
  },

  findSingleProductById: function(token, productID){
    return axios.get(`/api/member/product/${productID}?token=${token}`)
  },
  addToCart: function(product_Data){
    return axios.post(`/api/cart/addtocart`, product_Data)
  },

  //----end------------ new memberProducts api -----------------
  loadUserIdByToken: function(token){
    return axios.get(`/api/user/findidbytoken?_id=${token}`)
  },

  loadUserByToken: function(token){
    return axios.get(`/api/user/findbytoken?_id=${token}`)
  },

  userLimitedInfo: function(token){
    return axios.get(`/api/user/userlimitedinfo?_id=${token}`)
  },

  memberLogout: function(token){
    return axios.get(`/api/user/logout?token=${token}`)
  },

  findMemberInfo: function(memberID){
    return axios.get(`/api/user/findoneuser?_id=${memberID}`)
  },

  memberSearchProduct: function(search){
    return axios.get(`/api/member/products/search?search=${search}`)
  },

  updateUserInfo: function(userid, userData){
    return axios.post(`/api/user/userupdate?_id=${userid}`, userData)
  },

  showUserCart: (token)=>{
    return axios.get(`/api/user/useraddtocart?_id=${token}`)
  }

};
