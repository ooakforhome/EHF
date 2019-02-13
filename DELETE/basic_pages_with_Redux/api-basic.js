import axios from "axios";

export default {
  loadLastImg: function(){
    return axios.get('/api/fileid')
  }
};
