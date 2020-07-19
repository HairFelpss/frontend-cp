import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import uuid from 'uuid/v1';

import { useUser } from '../../context/User';

import questions from '../../common/verificationQuestion';

const schema = {
  name: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  login: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  confirm_email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    },
    equality: {
      attribute: 'email',
      message: '^The emails does not match'
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  confirm_password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    },
    equality: {
      attribute: 'password',
      message: '^The passwords does not match'
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: { height: '100%' },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  contentBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formControl: {
    marginTop: theme.spacing(1.5),
    minWidth: 240
  },
  form: {
    paddingLeft: 16,
    paddingRight: 16,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();
  const { contextPostUser } = useUser();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = async event => {
    event.preventDefault();
    const response = await contextPostUser(formState.values);
    history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div {...props} className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.content} item lg={12} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignUp}>
                <Typography className={classes.title} variant="h2">
                  Criar nova conta
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Utilize seu email para criar uma nova conta
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('login')}
                  fullWidth
                  label="Login"
                  name="login"
                  onChange={handleChange}
                  required
                  value={formState.values.login || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('name')}
                  fullWidth
                  label="Nome"
                  name="name"
                  onChange={handleChange}
                  required
                  value={formState.values.name || ''}
                  variant="outlined"
                />
                <Grid container spacing={1}>
                  <Grid item md={6} xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('email')}
                      fullWidth
                      label="Email"
                      name="email"
                      helperText={
                        hasError('email') ? formState.errors.email[0] : null
                      }
                      onChange={handleChange}
                      required
                      type="text"
                      variant="outlined"
                      value={formState.values.email || ''}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('confirm_email')}
                      fullWidth
                      label="Confirme o Email"
                      name="confirm_email"
                      helperText={
                        hasError('confirm_email')
                          ? formState.errors.confirm_email[0]
                          : null
                      }
                      onChange={handleChange}
                      required
                      type="text"
                      variant="outlined"
                      value={formState.values.confirm_email || ''}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('password')}
                      fullWidth
                      label="Senha"
                      name="password"
                      helperText={
                        hasError('password')
                          ? formState.errors.password[0]
                          : null
                      }
                      onChange={handleChange}
                      required
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      className={classes.textField}
                      error={hasError('confirm_password')}
                      fullWidth
                      label="Confirme a Senha"
                      name="confirm_password"
                      helperText={
                        hasError('confirm_password')
                          ? formState.errors.confirm_password[0]
                          : null
                      }
                      onChange={handleChange}
                      required
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Pergunta de Verificação
                      </InputLabel>
                      <Select
                        id="demo-simple-select-outlined"
                        value={formState.values.question || ''}
                        onChange={handleChange}
                        label="Pergunta"
                        name="question"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {questions.map(question => (
                          <MenuItem key={uuid()} value={question}>
                            {question}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      className={classes.textField}
                      fullWidth
                      label="Resposta"
                      name="answer"
                      onChange={handleChange}
                      value={formState.values.answer || ''}
                      required
                      type="text"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </div>
                {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{' '}
                  <Link component={RouterLink} to="/" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
