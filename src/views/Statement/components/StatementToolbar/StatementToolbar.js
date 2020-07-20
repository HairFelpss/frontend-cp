import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { SearchInput } from 'components';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '42px',
    marginTop: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const StatementToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <Typography variant="h3">Statement</Typography>
        <SearchInput className={classes.searchInput} placeholder="Search" />
      </div>
    </div>
  );
};

StatementToolbar.propTypes = {
  className: PropTypes.string
};

export default StatementToolbar;
