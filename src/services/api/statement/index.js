import api from '../index';

export async function getStatements() {
  try {
    const response = await api.get('/statements');
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getOneStatement(id) {
  try {
    const response = await api.get(`/statements/${id}}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function postStatement(payload) {
  try {
    const response = await api.post('/statements', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}
export async function updateStatement(id, payload) {
  try {
    const response = await api.put(`/statements/${id}`, payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteStatement(id) {
  try {
    const response = await api.delete(`/statements/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
