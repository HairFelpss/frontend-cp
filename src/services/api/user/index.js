import api from '../index';

export async function getUsers() {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getManagers() {
  try {
    const response = await api.get('/users/managers');
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getNumberOfAccounts() {
  try {
    const response = await api.get('/users/count');
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getSearchUsers(payload) {
  try {
    if (payload.length === 0) return await getUsers();
    const response = await api.get(`/users/search/${payload}`);
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
