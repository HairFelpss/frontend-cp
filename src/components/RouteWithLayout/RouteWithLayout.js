import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/Auth';

const RouteWithLayout = props => {
  const {
    layout: Layout,
    isPrivate = false,
    component: Component,
    ...rest
  } = props;

  const { signed } = useAuth();

  if (!signed && isPrivate) return <Redirect to="/" />;

  if (signed && !isPrivate) return <Redirect to="/dashboard" />;

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
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  isPrivate: PropTypes.bool
};

RouteWithLayout.defaultProps = {
  isPrivate: false
};

export default RouteWithLayout;
