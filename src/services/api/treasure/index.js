import api from '../index';

export async function getTreasures() {
  try {
    const response = await api.get('/treasures');
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getOneTreasure(userId) {
  try {
    const response = await api.get(`/treasures/${userId}}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function postTreasure(payload) {
  try {
    const response = await api.post('/treasures', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}
export async function updateTreasure(id, payload) {
  try {
    const response = await api.put(`/treasures/${id}`, payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteTreasure(id) {
  try {
    const response = await api.delete(`/treasures/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
