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
  TextField,
} from '@material-ui/core';
import Save from '@material-ui/icons/Save';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    Name: 'Lucas Souza Mendes',
    Login: 'Luquinha',
    email: 'lucassouze@gmail.com',
    C_email: 'lucassouze@gmail.com'
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
        <CardHeader subheader="Atualize suas informações" title="Dados" />
        <Divider />
        <CardContent>
          
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome"
                margin="dense"
                name="Name"
                onChange={handleChange}
                required
                value={values.Name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Login"
                margin="dense"
                name="Login"
                onChange={handleChange}
                required
                value={values.Login}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Endereço de Email"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Confirmação Email"
                margin="dense"
                name="C_email"
                onChange={handleChange}
                required
                value={values.C_email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>   
            <TextField
                fullWidth
                label="Pergunta de verificação"
                margin="dense"
                name="Pergunta"
                onChange={handleChange}
                required
                value="Qual o nome do seu pet?"
                variant="outlined"
                disabled
              /> 
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                className={classes.textField}
                fullWidth
                margin="dense"
                label="Resposta"
                name="Resposta"
                onChange={handleChange}
                required
                type="text"
                variant="outlined"
              /> 
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            <Save /> <p style={{ paddingLeft: 10 }}>Salvar Dados</p>
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
