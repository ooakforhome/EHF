import React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './styles/styles.scss';

// Home page Link
import Home from './components/core/Home.js';

// component show products pages
import ProductsAll from './components/product/ProductsAll';
import ProductsByCategory from './components/product/ProductsByCategory';
import Product from './components/product/Product';
import NewProduct from './components/product/NewProduct';

import SignupForm from './components/passport/sign-up';
import Login from './components/passport/login-form';



render((
  <Router>
    <div>
        <Route exact path="/" component = { Home } />
        <Route path="/products/all" component = { ProductsAll } />
        <Route path="/products/all?limit=" component = { ProductsAll } />
        <Route exact path="/product/:id" component = { Product } />
        <Route exact path="/newproduct" component = { NewProduct } />
        <Route exact path="/signup" component = { SignupForm } />
        <Route exact path="/login" component = { Login } />
    </div>
  </Router>
), document.getElementById('react-container'));
