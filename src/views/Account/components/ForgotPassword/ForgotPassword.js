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
import Edit from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(theme => ({
  root: {},
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  saveBtn: {
    backgroundColor: theme.palette.primary.main
  },
  editBtn: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.white
  },
  endAdornment: {
    paddingRight: 0
  },
  passIcon: {
    color: 'black',
    opacity: 0.3
  }
}));

const ForgotPassword = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false
  });

  const [values, setValues] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdateUser = async () => {};

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader title="Mudar senha" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Digite sua senha atual"
                label="Old Password"
                margin="dense"
                name="oldPassword"
                onChange={handleChange}
                required
                value={values.oldPassword}
                variant="outlined"
                className={classes.input}
                type={showPassword.oldPassword ? 'text' : 'password'}
                disabled={!editMode}
                InputProps={{
                  className: classes.endAdornment,
                  endAdornment: (
                    <Button
                      className={
                        showPassword.oldPassword ? null : classes.passIcon
                      }
                      disabled={!editMode}
                      onClick={() =>
                        setShowPassword({
                          oldPassword: !showPassword.oldPassword
                        })
                      }
                    >
                      {showPassword.oldPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </Button>
                  )
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Digite sua nova senha"
                label="New Password"
                margin="dense"
                name="password"
                onChange={handleChange}
                required
                value={values.password}
                variant="outlined"
                type={showPassword.password ? 'text' : 'password'}
                disabled={!editMode}
                InputProps={{
                  className: classes.endAdornment,
                  endAdornment: (
                    <Button
                      className={
                        showPassword.password ? null : classes.passIcon
                      }
                      disabled={!editMode}
                      onClick={() =>
                        setShowPassword({
                          password: !showPassword.password
                        })
                      }
                    >
                      {showPassword.password ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </Button>
                  )
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                helperText="Confirme sua nova senha"
                margin="dense"
                name="confirmPassword"
                onChange={handleChange}
                required
                value={values.confirmPassword}
                variant="outlined"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                disabled={!editMode}
                InputProps={{
                  className: classes.endAdornment,
                  endAdornment: (
                    <Button
                      className={
                        showPassword.confirmPassword ? null : classes.passIcon
                      }
                      disabled={!editMode}
                      onClick={() =>
                        setShowPassword({
                          confirmPassword: !showPassword.confirmPassword
                        })
                      }
                    >
                      {showPassword.confirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </Button>
                  )
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions className={classes.actions}>
          <Button
            className={classes.saveBtn}
            color="primary"
            variant="contained"
            onClick={() => handleUpdateUser()}
          >
            <Save /> <p style={{ paddingLeft: 10 }}>Salvar Dados</p>
          </Button>
          <Button
            className={classes.editBtn}
            variant="contained"
            onClick={() => setEditMode(!editMode)}
          >
            <Edit />
            <p style={{ paddingLeft: 10 }}>
              {editMode ? 'Bloquear' : 'Editar'}
            </p>
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
