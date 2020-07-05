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
  },
  logos: {
    maxHeight: 80
  }
}));

export default function SimpleModal({ open, handleClose, box }) {
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
          <div className={classes.field}>
            <form
              action="https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html"
              method="get"
              target="_blank"
            >
              <input type="hidden" name="code" value={box.pagseguro} />
              <input type="hidden" name="iot" value="button" />
              <input
                type="image"
                src="https://stc.pagseguro.uol.com.br/public/img/botoes/pagamentos/99x61-comprar-azul-assina.gif"
                name="submit"
                alt="Pague com PagSeguro - é rápido, grátis e seguro!"
              />
            </form>
          </div>
          <div className={classes.field}>
            <form action={box.mercadopago} method="POST" target="_blank">
              <input
                type="image"
                src="/images/logos/mercadopago.png"
                alt="Mercado Pago"
                name="submit"
              />
            </form>
          </div>
          <div className={classes.field}>
            <img
              src="/images/logos/picpay-logo.svg"
              alt="PicPay"
              className={classes.logos}
            />
          </div>
          <img
            src="/images/logos/paypal.svg"
            alt="PicPay"
            className={classes.logos}
          />
        </div>
      </Fade>
    </Modal>
  );
}
