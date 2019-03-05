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

// Admin Pages
  import AdminProductsAll from './components/admin_pages/AdminProducts';
  import AdminProduct from './components/admin_pages/AdminProduct';
  import NewProduct from './components/admin_pages/NewProduct';

// Member Pages
  import MemberProductsAll from './components/member_pages/MemberProducts';
  import MemberProduct from './components/member_pages/MemberProduct';

  import CartPage from './components/member_pages/cart/cartPage';
  import Checkout from './components/member_pages/cart/paypal/PaypalCheckout';
  import Receipt from './components/member_pages/cart/purchaseReceipt'
  // import Addaddress from './components/cart/addAddress'
  // import Checkout from './components/cart/checkout.js'


const App = () =>
  <Router>
    <div>
        <Route exact path="/" component = { Home } />
        <Route exact path="/user_login" component = { UserLogin } />
        <Route exact path="/admin_login" component = { AdminLogin } />

        <Route exact path="/products" component = { BasicProductsAll } />
        <Route exact path="/product/:id" component = { BasicProduct } />

        <Route exact path="/admin/products" component = { AdminProductsAll } />
        <Route exact path="/admin/product/:id" component = { AdminProduct } />
        <Route exact path="/newproduct/:token" component = { NewProduct } />

        <Route exact path="/auth/products/" component = { MemberProductsAll } />
        <Route exact path="/auth/product/:id" component = { MemberProduct } />
        <Route exact path="/cart" component = { CartPage } />
        <Route exact path="/checkout/:id" component = { Checkout } />
        <Route exact path="/receipt/:id" component = { Receipt } />
    </div>
  </Router>;

export default App;
        // <Route exact path="/products" component = { BasicProductsAll } />
