import api from '../index';

const handlePaypal = async payload => {
  try {
    const response = await api.post('paypal/pay', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default handlePaypal;
