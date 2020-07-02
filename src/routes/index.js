import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from '../components';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Ticket as TicketView
} from '../views';

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
        path="/products"
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
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
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
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
