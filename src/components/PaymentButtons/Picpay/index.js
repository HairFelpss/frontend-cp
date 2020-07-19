import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 110
  }
}));

const Picpay = ({ treasure }) => {
  const classes = useStyles();

  return (
    <img
      src="/images/logos/picpay-logo.svg"
      alt="PicPay"
      className={classes.image}
    />
  );
};

export default Picpay;
