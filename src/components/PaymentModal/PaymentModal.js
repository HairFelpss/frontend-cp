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
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    border: '2px solid #000',
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function SimpleModal({ open, handleClose, box }) {
  const classes = useStyles();
  console.log('AQUI O ===> ', box);
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
          <div>
            <form
              action="https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html"
              method="get"
              target="_blank"
            >
              <input type="hidden" name="code" value={box} />
              <input type="hidden" name="iot" value="button" />
              <input
                type="image"
                src="https://stc.pagseguro.uol.com.br/public/img/botoes/pagamentos/99x61-comprar-azul-assina.gif"
                name="submit"
                alt="Pague com PagSeguro - é rápido, grátis e seguro!"
              />
            </form>
          </div>
          <div>ASDASDA</div>
          <div>PAGSEGURO</div>
          <div>PAGSEGURO</div>
        </div>
      </Fade>
    </Modal>
  );
}
