import api from '../index';

export async function getMessages() {
  try {
    const response = await api.get(`/messages/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function postMessage(payload) {
  try {
    const response = await api.post('/messages', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}
export async function deleteMessage() {
  try {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteOneMessage(id) {
  try {
    const response = await api.delete(`/messages/deleteMessage/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
