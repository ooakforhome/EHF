import React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './styles/styles.scss';

// Home page Link
import Home from './components/core/Home.js';

// component show products pages
import ProductsAll from './components/product/ProductsAll';
import Product from './components/product/Product';
import ProductsByCategory from './components/product/ProductsByCategory';
import NewProduct from './components/product/NewProduct';
//
// import SignupForm from './components/passport/sign-up';
// import Login from './components/passport/login-form';



const App = () =>
  <Router>
    <div>
        <Route exact path="/" component = { Home } />
        <Route path="/products" component = { ProductsAll } />
        <Route path="/products/by/category" component = { ProductsByCategory } />
        <Route exact path="/product/:id" component = { Product } />
        <Route exact path="/newproduct" component = { NewProduct } />
    </div>
  </Router>;

export default App;
