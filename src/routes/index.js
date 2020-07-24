import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from '../components';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Ticket as TicketView,
  Statement as StatementView,
  Chat as ChatView
} from '../views';

import {
  SuccessMercadoPago as SuccessMercadoPagoView,
  SuccessPagSeguro as SuccessPagSeguroView,
  SuccessPayPal as SuccessPayPalView,
  SuccessPicPay as SuccessPicPayView,
  FailMercadoPago as FailMercadoPagoView,
  FailPagSeguro as FailPagSeguroView,
  FailPayPal as FailPayPalView,
  FailPicPay as FailPicPayView
} from '../views/Payment';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={TicketView}
        exact
        layout={MainLayout}
        path="/tickets"
        isPrivate
      />
      <RouteWithLayout
        component={ChatView}
        exact
        layout={MainLayout}
        path="/chat"
        isPrivate
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
        isPrivate
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
        isPrivate
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/store"
        isPrivate
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
        isPrivate
      />
      <RouteWithLayout
        component={StatementView}
        exact
        layout={MainLayout}
        path="/statement"
        isPrivate
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={SuccessMercadoPagoView}
        exact
        layout={MinimalLayout}
        path="/success/mercadopago"
        isPrivate
      />
      <RouteWithLayout
        component={SuccessPagSeguroView}
        exact
        layout={MinimalLayout}
        path="/success/pagseguro"
        isPrivate
      />
      <RouteWithLayout
        component={SuccessPayPalView}
        exact
        layout={MinimalLayout}
        path="/success/paypal"
        isPrivate
      />
      <RouteWithLayout
        component={SuccessPicPayView}
        exact
        layout={MinimalLayout}
        path="/success/picpay"
        isPrivate
      />
      <RouteWithLayout
        component={FailMercadoPagoView}
        exact
        layout={MinimalLayout}
        path="/fail/mercadopago"
        isPrivate
      />
      <RouteWithLayout
        component={FailPagSeguroView}
        exact
        layout={MinimalLayout}
        path="/fail/pagseguro"
        isPrivate
      />
      <RouteWithLayout
        component={FailPayPalView}
        exact
        layout={MinimalLayout}
        path="/fail/paypal"
        isPrivate
      />
      <RouteWithLayout
        component={FailPicPayView}
        exact
        layout={MinimalLayout}
        path="/fail/picpay"
        isPrivate
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
