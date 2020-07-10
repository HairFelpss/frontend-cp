import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { ExtractTable} from './components'
import mockData from './data';
import ExtractToolbar from './components/ExtractToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Extract = () => {
  const classes = useStyles();

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
        <ExtractToolbar />
      <div className={classes.content}>
        <ExtractTable users={users} />
      </div>
    </div>
  );
};

export default Extract;
