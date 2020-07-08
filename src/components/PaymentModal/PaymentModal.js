import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: theme.palette.background.default,
    border: '0.5px solid #2196f3',
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 0),
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '60%'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: '50%'
    }
  }
}));

export default function SimpleModal({ open, handleClose, children }) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {children.map((child, index) => (
            <div className={classes.logos} key={index}>
              {child}
            </div>
          ))}
        </div>
      </Fade>
    </Modal>
  );
}
