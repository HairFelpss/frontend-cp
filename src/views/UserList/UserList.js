import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import { useUser } from '../../context/User';

import Modal from '../../components/FormModal';

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
    contextGetOneUser,
    contextGetSearchUsers
  } = useUser();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleOpen = title => {
    setModalTitle(title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetUsers = async () => {
    await contextGetUsers();
  };

  const handleSearchUsers = async payload => {
    await contextGetSearchUsers(payload);
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
        handleSearchUsers={handleSearchUsers}
      />
      <div className={classes.content}>
        <UsersTable
          users={users}
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
      </div>
      <Modal
        open={open}
        title={modalTitle}
        specificObj={user}
        handleClose={handleClose}
        getFunction={contextGetUsers}
        updateFunction={contextUpdateUser}
        selectedObj={selectedUsers}
      />
    </div>
  );
};

export default UserList;
