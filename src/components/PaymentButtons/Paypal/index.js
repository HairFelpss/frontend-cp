import React from 'react';
import handlePaypal from '../../../services/api/paypal';

const Paypal = ({ box, handleClose }) => {
  const buy = async () => {
    window.open(await handlePaypal(box), '_blank');
  };

  return (
    <img
      onClick={buy}
      type="image"
      src="/images/logos/logo--white.svg"
      alt="Pague com Paypal!"
    />
  );
};

export default Paypal;
