import React from "react";
// import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './styles/styles.scss';

// Home page Link
  import Home from './components/core/Home';
  import Login from './components/core/UserLogin';
  import Header from './components/core/Header';

// component show products pages
  import ProductsAll from './components/product/ProductsAll';
  import Product from './components/product/Product';
  import ProductsByCategory from './components/product/ProductsByCategory';

  import UserLogin from './components/core/UserLogin';
  import AdminLogin from './components/core/AdminLogin';

// Basic Pages
  import BasicProductsAll from './components/basic_pages/BasicProductsAll';
  import BasicProduct from './components/basic_pages/BasicProduct';
  import BasicCartPage from './components/basic_pages/cart/basicCartPage';
  import BasicCheckout from './components/basic_pages/cart/paypal/BasicPaypalCheckout';

// Admin Pages
  import AdminHome from './components/admin_pages/AdminHome';
  import AdminMembersPage from './components/admin_pages/admin_members/AdminMembersPage';
  import AdminOrders from './components/admin_pages/admin_orders/AdminOrdersPage';
  import AdminProductsAll from './components/admin_pages/admin_products/AdminAllProducts';
  import AdminProduct from './components/admin_pages/admin_products/AdminProduct';
  import NewProduct from './components/admin_pages/admin_products/NewProduct';


// Member Pages
  import MemberProductsAll from './components/member_pages/MemberProducts';
  import MemberProduct from './components/member_pages/MemberProduct';

  import CartPage from './components/member_pages/cart/cartPage';
  import Checkout from './components/member_pages/cart/paypal/PaypalCheckout';
  import Receipt from './components/member_pages/cart/purchaseReceipt'
  // import Addaddress from './components/cart/addAddress'
  // import Checkout from './components/cart/checkout.js'
        // <Route exact path="/base/cart" component = { BasicCartPage } />

const App = () =>
  <Router>
    <div>
        <Route exact path="/" component = { Home } />
        <Route exact path="/user_login" component = { UserLogin } />
        <Route exact path="/admin_login" component = { AdminLogin } />

        <Route exact path="/products" component = { BasicProductsAll } />
        <Route exact path="/product/:id" component = { BasicProduct } />
        <Route exact path="/base/cart" component = { BasicCartPage } />
        <Route exact path="/base/cart/checkout/:id" component = { BasicCheckout } />

        <Route exact path="/adminhome/:id" component = { AdminHome } />
        <Route exact path="/admin/orders" component = { AdminOrders } />
        <Route exact path="/admin/members" component = { AdminMembersPage } />
        <Route exact path="/admin/products" component = { AdminProductsAll } />
        <Route exact path="/admin/products/:id" component = { AdminProduct } />
        <Route exact path="/admin/newproduct" component = { NewProduct } />

        <Route exact path="/auth/products/" component = { MemberProductsAll } />
        <Route exact path="/auth/product/:id" component = { MemberProduct } />
        <Route exact path="/cart" component = { CartPage } />
        <Route exact path="/checkout/:id" component = { Checkout } />
        <Route exact path="/receipt/:id" component = { Receipt } />

    </div>
  </Router>;

export default App;
