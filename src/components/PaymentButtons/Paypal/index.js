import React from 'react';
import { makeStyles } from '@material-ui/styles';
import handlePaypal from '../../../services/api/payment/paypal';

const useStyles = makeStyles(theme => ({
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 100
  }
}));

const Paypal = ({ treasure, handleClose }) => {
  const classes = useStyles();

  const buy = async () => {
    window.open(await handlePaypal(treasure), '_blank');
  };

  return (
    <img
      onClick={buy}
      type="image"
      className={classes.image}
      src="/images/logos/paypal2.svg"
      alt="Pague com Paypal!"
    />
  );
};

export default Paypal;
