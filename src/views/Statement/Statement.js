import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { StatementTable } from './components';
import StatementToolbar from './components/StatementToolbar';

import { getStatements } from '../../services/api/statement';

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

  const [statement, setStatement] = useState([]);

  const handleGetStatement = async () => {
    setStatement(await getStatements());
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
