import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/Auth';

const RouteWithLayout = props => {
  const {
    layout: Layout,
    isPrivate = false,
    component: Component,
    path,
    ...rest
  } = props;

  const { signed } = useAuth();

  if (!signed && isPrivate) return <Redirect to="/" />;

  if (signed && !isPrivate) return <Redirect to="/dashboard" />;

  const chatRedirect =
    localStorage.getItem('chatId') === 'undefined' ||
    !localStorage.getItem('chatId')
      ? false
      : true;

  if (!chatRedirect === true && path === '/chat') {
    return <Redirect to="/tickets" />;
  }
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  chatRedirect: PropTypes.bool
};

RouteWithLayout.defaultProps = {
  isPrivate: false
};

export default RouteWithLayout;
