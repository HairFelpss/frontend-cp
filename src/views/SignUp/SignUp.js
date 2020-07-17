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
  c_email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  c_password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 240
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
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
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 125,
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

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [defaultQuestion, setDefaultQuestion] = useState('');
  console.log(formState);
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
    setDefaultQuestion(event.target.value);

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

  const handleSignUp = event => {
    if (formState.values.email === formState.values.c_email) {
      alert('emailconfere');
    } else {
      alert('verificar email');
    }

    event.preventDefault();
    history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
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
                      error={hasError('c_email')}
                      fullWidth
                      label="Confirme o Email"
                      name="c_email"
                      helperText={
                        hasError('c_email') ? formState.errors.c_email[0] : null
                      }
                      onChange={handleChange}
                      required
                      type="text"
                      variant="outlined"
                      value={formState.values.c_email || ''}
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
                      error={hasError('c_password')}
                      fullWidth
                      label="Confirme a Senha"
                      name="c_password"
                      helperText={
                        hasError('c_password')
                          ? formState.errors.c_password[0]
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
                        value={defaultQuestion}
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
                  <Link component={RouterLink} to="/sign-in" variant="h6">
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
