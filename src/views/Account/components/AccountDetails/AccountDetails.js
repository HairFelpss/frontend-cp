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
  Select,
  FormControl,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import Edit from '@material-ui/icons/Edit';
import uuid from 'uuid/v1';

import questions from '../../../../common/verificationQuestion';
const useStyles = makeStyles(theme => ({
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
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 240
  },
  select: {
    color: '#000000',
    opacity: 0.3
  }
}));

const AccountDetails = props => {
  const {
    className,
    values,
    setValues,
    handleUserInfo,
    handleUpdateUser,
    ...rest
  } = props;

  const classes = useStyles();

  const [defaultQuestion, setDefaultQuestion] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleChange = event => {
    setDefaultQuestion(event.target.value);
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
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
                disabled={!editMode}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nick"
                margin="dense"
                name="nick"
                onChange={handleChange}
                required
                value={values.truename}
                variant="outlined"
                disabled={!editMode}
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
                disabled={!editMode}
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
                value={values.email}
                variant="outlined"
                disabled={!editMode}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                  id="demo-simple-select-outlined-label"
                  className={editMode ? null : classes.select}
                >
                  Pergunta de Verificação
                </InputLabel>
                <Select
                  id="demo-simple-select-outlined"
                  value={defaultQuestion}
                  onChange={handleChange}
                  label="Pergunta"
                  name="question"
                  disabled={!editMode}
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Resposta"
                margin="dense"
                name="answer"
                onChange={handleChange}
                required
                value={values.answer}
                variant="outlined"
                className={classes.textField}
                disabled={!editMode}
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
            onClick={() => handleUpdateUser(values)}
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

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
