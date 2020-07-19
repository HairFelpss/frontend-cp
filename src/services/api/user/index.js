import api from '../index';

export async function getUsers() {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getOneUser(payload) {
  try {
    const response = await api.get(`/users/${payload}}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function postUser(payload) {
  try {
    const response = await api.post('/users', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}
export async function updateUser(id, payload) {
  try {
    const response = await api.put(`/users/${id}`, payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteUser(id) {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
