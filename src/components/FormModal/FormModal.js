import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Grid,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Dialog
} from '@material-ui/core';
import validate from 'validate.js';
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
  modalCreate: {
    height: '444px',
    width: '600px'
  },
  title: {
    padding: theme.spacing(3)
  },
  formControl: {
    width: '50%'
  }
}));

const FormModal = props => {
  const {
    specificObj,
    handleClose,
    getFunction,
    updateFunction,
    selectedObj,
    open,
    ...rest
  } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const keys = Object.keys(specificObj);
    const values = Object.values(specificObj);
    const result = keys.reduce(
      (obj, key, index) => ({ ...obj, [key]: values[index] }),
      {}
    );

    setFormState(formState => ({
      ...formState,
      values: result
    }));
  }, [specificObj]);

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
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleUpdateUser = async () => {
    if (selectedObj.length === 0 || selectedObj.length > 1) return;
    formState.values.truename = formState.values.login;
    await updateFunction(selectedObj[0], formState.values);
    await getFunction();
    handleClose();
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <Dialog {...rest} open={open} onClose={handleClose}>
      <DialogContent className={classes.modalCreate}>
        <Typography className={classes.title} variant="h2">
          Edit User
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              className={classes.textField}
              error={hasError('login')}
              fullWidth
              label="Login"
              name="truename"
              onChange={handleChange}
              required
              value={formState.values.truename || ''}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} sm={12}>
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
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              className={classes.textField}
              error={hasError('email')}
              fullWidth
              label="Email"
              name="email"
              helperText={hasError('email') ? formState.errors.email[0] : null}
              onChange={handleChange}
              required
              type="text"
              variant="outlined"
              value={formState.values.email || ''}
            />
          </Grid>
          <Grid item md={6} xs={12}>
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
          <Grid item md={6} xs={12}>
            <TextField
              className={classes.textField}
              error={hasError('password')}
              fullWidth
              label="Senha"
              name="password"
              helperText={
                hasError('password') ? formState.errors.password[0] : null
              }
              onChange={handleChange}
              required
              type="password"
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
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
          <Grid item md={6} xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                {formState.values.Prompt || ''}
              </InputLabel>
              <Select
                id="demo-simple-select-outlined"
                value={formState.values.Prompt || ''}
                onChange={handleChange}
                label="Pergunta"
                name="question"
              >
                <MenuItem value={formState.values.Prompt || ''}>
                  {formState.values.Prompt || ''}
                </MenuItem>
                {questions.map(question => (
                  <MenuItem key={uuid()} value={question}>
                    {question}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              className={classes.textField}
              fullWidth
              label="Resposta"
              name="answer"
              value={formState.values.answer || ''}
              onChange={handleChange}
              required
              type="text"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Button
        className={classes.btn}
        color="primary"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={() => handleUpdateUser()}
      >
        Save User
      </Button>
    </Dialog>
  );
};

export default FormModal;
