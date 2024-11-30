import axios from 'axios';

const API_BASE_URL = 'http://54.206.74.135:5000'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (username, password) => {
  const response = await api.get('/users', { username, password });
  return response.data;
};

export const createUser = async (username, password) => {
  const response = await api.post('/users', { username, password });
  return response.data;
};
