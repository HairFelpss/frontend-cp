import api from '../index';

export async function getTickets() {
  try {
    const response = await api.get('/tickets');
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getSearchTickets(payload) {
  try {
    if (payload.length === 0) return await getTickets();
    const response = await api.get(`/tickets/search/${payload}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getSolvedTickets() {
  try {
    const response = await api.get('/tickets/solved');
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function postFilterTickets(payload) {
  try {
    const response = await api.post('/tickets/filter', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function postTicket(payload) {
  try {
    const response = await api.post('/tickets', payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}
export async function updateTickets(id, payload) {
  try {
    const response = await api.put(`/tickets/${id}`, payload);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteTickets(id) {
  try {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}
