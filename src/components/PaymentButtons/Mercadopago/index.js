import React, { useState, useEffect } from 'react';
import handleMercadoPago from '../../../services/api/mercadopago';

const Mercadopago = ({ box }) => {
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
        style={{ maxWidth: 100 }}
      />
    </form>
  );
};

export default Mercadopago;
