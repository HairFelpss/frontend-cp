import api from '../index';

const handleAuth = async payload => {
  try {
    const response = await api.post('pagseguro/pay', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default handleAuth;
