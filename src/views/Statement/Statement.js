import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { StatementTable } from './components';
import StatementToolbar from './components/StatementToolbar';
import { useAuth } from '../../context/Auth';

import { getOneUserStatements } from '../../services/api/statement';

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
  const { storageUserId } = useAuth();

  const [statement, setStatement] = useState([]);

  const handleGetStatement = async () => {
    setStatement(await getOneUserStatements(storageUserId));
  };

  useEffect(() => {
    handleGetStatement();
  }, []);

  return (
    <div className={classes.root}>
      <StatementToolbar />
      <div className={classes.content}>
        <StatementTable statement={statement} />
      </div>
    </div>
  );
};

export default Statement;
