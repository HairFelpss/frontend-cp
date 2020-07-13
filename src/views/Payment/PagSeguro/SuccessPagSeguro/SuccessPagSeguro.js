import React, { useState, useEffect } from 'react';
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
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 400
  }
}));

const SuccessPagSeguro = () => {
  const classes = useStyles();
  const [type, setType] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    const params = [];
    for (let value of urlParam.keys()) {
      params.push(value);
    }
    setType(params[0]);
    setCode(urlParam.get(params[0]));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">Compra realizada com sucesso!</Typography>
            <Typography variant="subtitle2">
              Parabéns! Assim que o pagamento for concluído seu baú estará
              fresquinho para você!
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/success-chest8.svg"
            />
            <a href="https://www.freepik.com/free-photos-vectors/business">
              Business vector created by freepik - www.freepik.com
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SuccessPagSeguro;
