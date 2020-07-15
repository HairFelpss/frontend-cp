import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';

import { useUser } from '../../context/User';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();
  const { getUsers } = useUser();
  const [users, setUsers] = useState([]);

  const handleGetUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
