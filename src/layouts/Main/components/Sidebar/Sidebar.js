import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import StoreIcon from '@material-ui/icons/Store';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ConfirmationNumberRoundedIcon from '@material-ui/icons/ConfirmationNumberRounded';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { Profile, SidebarNav } from './components';

import { useAuth } from '../../../../context/Auth';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.background,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const { signOut } = useAuth();

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Tickets',
      href: '/tickets',
      icon: <ConfirmationNumberRoundedIcon />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Store',
      href: '/store',
      icon: <StoreIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Statement',
      href: '/statement',
      icon: <AssignmentIcon />
    },
    {
      title: 'Logout',
      href: '/',
      icon: <ExitToAppOutlinedIcon />,
      onClick: () => signOut()
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} onClose={onClose} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
