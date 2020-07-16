import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ForgotPassword, AccountDetails } from './components';
import { useAuth } from '../../context/Auth';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();
  const { userStorageAuth } = useAuth();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails userStorage={userStorageAuth} />
        </Grid>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <ForgotPassword userStorage={userStorageAuth} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
