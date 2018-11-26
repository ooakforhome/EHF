import axios from "axios";

export default {
// Deletes the product with the given id
  // deleteProduct: function(id) {
  //   return axios.delete("/api/product/" + id);
  // },
  // Load Last Image
  loadLastImg: function(){
    return axios.get('/api/fileid')
  }
};
