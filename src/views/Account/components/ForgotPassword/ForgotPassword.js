import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import Save from '@material-ui/icons/Save';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ForgotPassword = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    password: 'Lucas',
    confirmPassword: 'Lucas'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader title="Mudar senha" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Digite sua senha atual"
                label="Password"
                margin="dense"
                name="password"
                onChange={handleChange}
                required
                value={values.password}
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                margin="dense"
                name="confirmPassword"
                onChange={handleChange}
                required
                value={values.confirmPassword}
                variant="outlined"
                type="password"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            <Save /> <p style={{ paddingLeft: 10 }}>Atualizar Senha</p>
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ForgotPassword.propTypes = {
  className: PropTypes.string
};

export default ForgotPassword;
