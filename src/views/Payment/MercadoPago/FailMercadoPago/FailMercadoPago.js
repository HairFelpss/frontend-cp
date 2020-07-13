import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 50,
    textAlign: 'center'
  },
  image: {
    color: 'white',
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 300
  }
}));

const FailMercadoPago = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">Vixe!</Typography>
            <Typography variant="subtitle2">
              Algo deu errado! Esperamos que tente novamente no futuro!
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/wait.svg"
              ð
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FailMercadoPago;
