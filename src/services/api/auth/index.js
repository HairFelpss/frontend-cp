import api from '../index';

const handleAuth = async payload => {
  try {
    payload.passwd = payload.password;
    const response = await api.post('sessions', payload);
    const { token, user } = response.data;
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    return { user, token };
  } catch (err) {
    throw err;
  }
};

export default handleAuth;
