
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TicketsToolbar, TicketsTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Ticket = () => {
  const classes = useStyles();

  const [users] = useState(mockData);
  

  return (
    <div className={classes.root}>
      <TicketsToolbar />
      <div className={classes.content}>
        <TicketsTable users={users} />
      </div>
    </div>
  );
};

export default Ticket;
