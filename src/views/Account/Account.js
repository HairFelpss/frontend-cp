import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { ForgotPassword, AccountDetails } from './components';
import { useAuth } from '../../context/Auth';
import { useUser } from '../../context/User';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();
  const { storageUserId } = useAuth();
  const { contextGetOneUser, contextUpdateUser } = useUser();

  const [values, setValues] = useState({
    name: '',
    truename: '',
    email: '',
    question: '',
    answer: ''
  });

  const handleUpdateUser = async user => {
    await contextUpdateUser(storageUserId, user);
    handleUserInfo();
  };

  const handleUserInfo = async () => {
    const response = await contextGetOneUser(storageUserId);
    const { name, truename, email, Prompt } = response;
    setValues({ name, truename, email, question: Prompt, answer: '' });
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails
            values={values}
            setValues={setValues}
            handleUpdateUser={handleUpdateUser}
          />
        </Grid>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <ForgotPassword values={values} handleUpdateUser={handleUpdateUser} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
