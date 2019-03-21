import axios from 'axios';

const cart = {
  userId(cb) {
    if(localStorage.getItem('the_main_app')){
      const token = JSON.parse(localStorage.getItem('the_main_app')).token;
      axios.get(`/api/user/findidbytoken?_id=${token}`)
        .then(cb)
    }
  },

  getCart(cb) {
    if(localStorage.getItem('the_main_app')){
      const token = JSON.parse(localStorage.the_main_app).token;
      axios.get(`/api/user/useraddtocart?_id=${token}`)
        .then(cb)
    }
  },


  getUserAddress(cb){
    if(localStorage.getItem('the_main_app')){
      const token = JSON.parse(localStorage.getItem('the_main_app')).token;
      axios.get(`/api/user/findidbytoken?_id=${token}`)
        .then(newID => {
          axios.get(`/api/user/finduseraddress?userID=${newID.data}`)
            .then(cb)
        })
        .catch(err => console.log(err))
    }
  },

  modifyUserInfoForCart(datainfo){
    if(localStorage.getItem('the_main_app')){
      const token = JSON.parse(localStorage.getItem('the_main_app')).token;
      axios.get(`/api/user/findidbytoken?_id=${token}`)
        .then(newID =>{
          axios.post(`/api/user/userupdate?_id=${newID.data}`, datainfo)
        })
        .catch(err=> console.log("User info modify error"))
    }
  },

  updateCart(id, num){
    axios.put(`/api/cart/updateqtyincart?_id=${id}`, {quantity: num})
  },

  calculateCartTotal(cb){
    if(localStorage.getItem('the_main_app')){
      const token = JSON.parse(localStorage.getItem('the_main_app')).token;
      let gTotal = 0;
      axios.get(`/api/user/useraddtocart?_id=${token}`)
        .then(items => {
          if(items.data.length){
            const subTotal = [];
            items.data.forEach(function(item){
              const newTotal = item.purchase_price * item.quantity;
              subTotal.push(newTotal)
              })
              gTotal = subTotal.reduce((a,b)=>{
                return a + b
              })
              return gTotal
            }
          })
          .then(cb)
    }
  },

  removeItem(itemIndex) {
    // console.log("itemIndex: "+itemIndex)
    axios.delete(`/api/cart/removeacartitem`, {data: {cartID: itemIndex}})
      .then(rs=> {
        console.log(rs.data.succssful)
        // if(rs.data.succssful === false){
        //   console.log("Not Deleted!!")
        // } else {
        //   console.log("Item Deleted")
        // }
      })
  },

  emptyCart(_id, cb) {
    axios.post(`/api/user/emptyusercart/?_id=${_id}`)
      .then(cb)

    // ==> console.log data info to make sure it pass
      // .then(info => {
      //     console.log("====== cart is empty ======")
      //     console.log( info );
      //     console.log("===e== cart is empty ==e===")
      // })
  },


  memberPlaceOrder(id, payment){
    axios.put(`/api/placeorder`, id, payment)
  }


}

export default cart;
