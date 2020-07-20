import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { StatementTable } from './components';
import mockData from './data';
import StatementToolbar from './components/StatementToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Statement = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <StatementToolbar />
      <div className={classes.content}>
        <StatementTable users={users} />
      </div>
    </div>
  );
};

export default Statement;
