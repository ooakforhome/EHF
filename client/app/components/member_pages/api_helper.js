import axios from 'axios';


export default {

  loadUserIdByToken: function(token){
    return axios.get(`/api/user/findidbytoken?_id=${token}`)
  },

  loadUserByToken: function(token){
    return axios.get(`/api/user/findbytoken?_id=${token}`)
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
