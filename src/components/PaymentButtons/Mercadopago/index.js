import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import handleMercadoPago from '../../../services/api/payment/mercadopago';

const useStyles = makeStyles(theme => ({
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 110
  }
}));

const Mercadopago = ({ box }) => {
  const classes = useStyles();

  const [code, setCode] = useState('');

  useEffect(() => {
    const buy = async () => {
      const mercadopago = await handleMercadoPago(box);
      setCode(mercadopago);
    };
    buy();
  }, [box]);

  return (
    <form action={code} method="POST" target="_blank">
      <input
        type="image"
        src="/images/logos/mercadopago.png"
        alt="Mercado Pago"
        name="submit"
        className={classes.image}
      />
    </form>
  );
};

export default Mercadopago;
