import axios from 'axios';

const cart = {
  userId(cb) {
    const token = JSON.parse(localStorage.getItem('the_main_app')).token;
    axios.get(`/api/user/findidbytoken?_id=${token}`)
      .then(cb)
  },
  getCart(cb) {
    const token = JSON.parse(localStorage.getItem('the_main_app')).token;
    axios.get(`/api/user/useraddtocart?_id=${token}`)
      .then(cb)
  },
  updateCart(id, num){
    axios.put(`/api/cart/updateqtyincart?_id=${id}`, {quantity: num})
  },
  calculateCartTotal(cb){
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
  // updateCart(itemIndex, quantity) {
  //   let cart = []
  //   if (typeof window !== "undefined") {
  //     if (localStorage.getItem('cart')) {
  //       cart = JSON.parse(localStorage.getItem('cart'))
  //     }
  //     cart[itemIndex].quantity = quantity
  //     localStorage.setItem('cart', JSON.stringify(cart))
  //   }
  // },
// ==== replace following =====
  itemTotal() {
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        return JSON.parse(localStorage.getItem('cart')).length
      }
    }
    return 0
  },
  addItem(item, cb) {
    let cart = []
    if (typeof window !== "undefined") {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.push({
        product: item,
        _id: item._id,
        retail: item.Retail,
        quantity: 1
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      cb()
    }
  },

  // removeItem(itemIndex) {
  //   let cart = [];
  //   const token = JSON.parse(localStorage.getItem('the_main_app')).token;
  //   axios.get(`/api/user/useraddtocart?_id=${token}`)
  //     .then(cb => {
  //       console.log("========cart.removeItem========")
  //       console.log(cb.data)
  //       console.log("=====end===cart.removeItem====end====")
  //       cart = cb.data;
  //       return cart;
  //     })
  //     .then(newcb => {
  //
  //       newcb.splice(itemIndex,1)
  //       console.log("========newcb========")
  //       console.log(newcb)
  //       console.log("=====end===newcb====end====")
  //     })
  //   // let cart = []
  //   // cart =
  // },
  // aremoveItem(itemIndex) {
  //   let cart = []
  //   if (typeof window !== "undefined") {
  //     if (localStorage.getItem('cart')) {
  //       cart = JSON.parse(localStorage.getItem('cart'))
  //     }
  //     cart.splice(itemIndex, 1)
  //     localStorage.setItem('cart', JSON.stringify(cart))
  //   }
  //   return cart
  // },
  // updateCart(itemIndex, quantity) {
  //   let cart = []
  //   if (typeof window !== "undefined") {
  //     if (localStorage.getItem('cart')) {
  //       cart = JSON.parse(localStorage.getItem('cart'))
  //     }
  //     cart[itemIndex].quantity = quantity
  //     localStorage.setItem('cart', JSON.stringify(cart))
  //   }
  // },
  // getCart() {
  //   if (typeof window !== "undefined") {
  //     if (localStorage.getItem('cart')) {
  //       return JSON.parse(localStorage.getItem('cart'))
  //     }
  //   }
  //   return []
  // },
  // removeItem(itemIndex) {
  //   let cart = []
  //   if (typeof window !== "undefined") {
  //     if (localStorage.getItem('cart')) {
  //       cart = JSON.parse(localStorage.getItem('cart'))
  //     }
  //     cart.splice(itemIndex, 1)
  //     localStorage.setItem('cart', JSON.stringify(cart))
  //   }
  //   return cart
  // },
  emptyCart(cb) {
    if (typeof window !== "undefined") {
      localStorage.removeItem('cart')
      cb()
    }
  }

}

export default cart;
