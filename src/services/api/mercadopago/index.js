import api from '../index';

const handleMercadoPago = async payload => {
  try {
    const response = await api.post('mercadopago/pay', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default handleMercadoPago;
