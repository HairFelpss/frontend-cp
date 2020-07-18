import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import Dialog from '@material-ui/core/Dialog';
import { useUser } from '../../context/User';

import  Modal  from '../../components/FormModal';

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
  const {
    contextGetUsers,
    contextUpdateUser,
    contextDeleteUser,
    users,
    contextGetOneUser
  } = useUser();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetUsers = async () => {
    await contextGetUsers();
  };
    

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <div className={classes.root}>
      <UsersToolbar
        selectedUsers={selectedUsers}
        contextGetOneUser={contextGetOneUser}
        handleOpen={handleOpen}
        setUser={setUser}
        contextDeleteUser={contextDeleteUser}
        contextGetUsers={contextGetUsers}
        setSelectedUsers={setSelectedUsers}
      />
      <div className={classes.content}>
        <UsersTable
          users={users}
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
      </div>
      <Dialog  open={open} handleClose={handleClose}>
        <Modal   open={open} user={user} handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default UserList;
