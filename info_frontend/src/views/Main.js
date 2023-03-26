import React, {Fragment} from 'react';
import AddItem from './AddItem';
import Home from './Home';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Cart';
import Orders from './Order';
import withRouter from '../utils/withRouter';
import CatergoryGrid from './v/store/store-category-grid';
import Contact from './v/contact';
import About from './v/about';
import ApplyWholesale from './v/auth/apply-wholesale';
import SignIn from './v/auth/sign-in';
import SignUp from './v/auth/sign-up';
import ProductDetail from './v/store/product-detail';

const Main = () => {
  return (
    <div>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/addItem" element={<AddItem />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/store" element={<CatergoryGrid />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/product-detail/:id" element={<ProductDetail />} />
          <Route exact path="/wholesale_apply" element={<ApplyWholesale />} />
          <Route exact path="/wholesale_login" element={<SignIn />} />
          <Route exact path="/wholesale_signup" element={<SignUp />} />
          <Route path='*' element={<Navigate to="/store" />} />
        </Routes>
      </Fragment>
    </div>
  );
};

export default withRouter(connect()(Main));