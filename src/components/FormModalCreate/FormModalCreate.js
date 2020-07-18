import React, { useState } from 'react';
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
    Typography
} from '@material-ui/core';
import uuid from 'uuid/v1';
import questions from '../../common/verificationQuestion';
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
}))

const FormModalCreate = props => {
    const {className, 
           onChange,
           user,
           handleClose,
           contextUpdateUser,
            ...rest} = props

const classes = useStyles();


return (

    <div>                
        <DialogContent className={classes.modalCreate}>
        <Typography className={classes.title} variant="h2">
            Sign in
          </Typography>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Login"
                margin="dense"
                name="login"
                variant="outlined"
                value={user.name}                
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome"
                margin="dense"
                name="nome"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Endereço de Email"
                margin="dense"
                name="email"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Confirmação Email"
                margin="dense"
                name="C_email"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Senha"
                margin="dense"
                name="senha"     
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Confirmar Senha"
                margin="dense"
                name="C_senha"     
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Pergunta de Verificação
                </InputLabel>
                <Select
                  id="demo-simple-select-outlined"
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
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Resposta"
                margin="dense"
                name="answer"     
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
                  onClick={handleClose}
                >
                  Create
        </Button>
    </div>
  );
}



export default FormModalCreate;