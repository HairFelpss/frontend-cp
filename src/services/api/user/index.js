import api from '../index';

const handleUser = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default handleUser;
