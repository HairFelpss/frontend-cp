import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import handlePagSeguro from '../../../services/api/payment/pagseguro';

const useStyles = makeStyles(theme => ({
  image: {
    display: 'inline-block',
    maxWidth: '100%',
    width: 110
  }
}));

const Pagseguro = ({ treasure }) => {
  const classes = useStyles();

  const [code, setCode] = useState('');
  useEffect(() => {
    const buy = async () => {
      const pagseguro = await handlePagSeguro(treasure);
      setCode(pagseguro.boxInfo.code);
    };
    buy();
  }, [treasure]);

  return (
    <form
      action="https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html"
      method="get"
      target="_blank"
    >
      <input type="hidden" name="code" value={code} />
      <input type="hidden" name="iot" value="button" />
      <input
        className={classes.image}
        type="image"
        src="https://stc.pagseguro.uol.com.br/public/img/botoes/pagamentos/99x61-comprar-azul-assina.gif"
        name="submit"
        alt="Pague com PagSeguro - é rápido, grátis e seguro!"
      />
    </form>
  );
};

export default Pagseguro;
