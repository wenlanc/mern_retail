import React, {Fragment} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import withRouter from '../utils/withRouter';
import ProductList from './v/product/list';
import ProductCreate from './v/product/create';
import ProductEdit from './v/product/edit';
import CustomerList from './v/customer/list';
import CustomerCreate from './v/customer/create';
import CustomerEdit from './v/customer/edit';
import CustomerOrder from './v/customer/order';
import OrderList from './v/order/list';
import OrderCreate from './v/order/create';
import OrderEdit from './v/order/edit';
import Invite from './v/invite/invite';

const Main = () => {
  return (
    <div>
      <Fragment>
        <Routes>
          <Route exact path="/products" element={<ProductList />} />
          <Route exact path="/products/create" element={<ProductCreate />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />
          <Route exact path="/customers" element={<CustomerList />} />
          <Route exact path="/customers/create" element={<CustomerCreate />} />
          <Route path="/customers/edit/:id" element={<CustomerEdit />} />
          <Route path="/customers/order/:id" element={<CustomerOrder />} />
          <Route exact path="/orders" element={<OrderList />} />
          <Route exact path="/orders/create" element={<OrderCreate />} />
          <Route path="/orders/edit/:id" element={<OrderEdit />} />
          <Route exact path="/invite" element={<Invite />} />
          <Route path='*' element={<Navigate to="/products" />} />
        </Routes>
      </Fragment>
    </div>
  );
};

export default withRouter(connect()(Main));