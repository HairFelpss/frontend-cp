import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  deleteButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.error.main
  },
  editButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.success.main
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const UsersToolbar = props => {
  const {
    className,
    contextUpdateUser,
    contextGetUsers,
    selectedUsers,
    contextGetOneUser,
    handleOpen,
    contextDeleteUser,
    setSelectedUsers,
    setUser,
    handleSearchUsers,
    ...rest
  } = props;

  const classes = useStyles();

  const handleOpenUpdateUserModal = async title => {
    if (selectedUsers.length === 0 || selectedUsers.length > 1) return;

    const response = await contextGetOneUser(selectedUsers);
    setUser(response);
    handleOpen('Atualizar Usuário');
  };

  const handleOpenCreateUserModal = async () => {
    handleOpen('Criar Usuário');
  };

  const handleDeleteUser = async () => {
    if (selectedUsers.length === 0 || selectedUsers.length > 1) return;

    await contextDeleteUser(selectedUsers);
    await contextGetUsers();
    setSelectedUsers([]);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          className={classes.deleteButton}
          onClick={() => handleDeleteUser()}
        >
          DELETE
        </Button>
        <Button
          className={classes.editButton}
          onClick={() => handleOpenUpdateUserModal()}
        >
          EDIT
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleOpenCreateUserModal()}
        >
          Add user
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
          onChange={event => handleSearchUsers(event.target.value)}
        />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
