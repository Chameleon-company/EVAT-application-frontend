
import axios from 'axios';

// const API_BASE_URL = 'http://54.206.74.135:5000'; // Replace with your backend URL
const API_BASE_URL = 'http://54.206.74.135:8080'; // login register

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// register
export const userRegister = async (data) => {
  const response = await api.post('/api/auth/register', data);
  return response.data;
};
// login
export const userLogin = async (data) => {
  const response = await api.post('/api/auth/login', data);
  return response.data;
};


export const loginUser = async (username, password) => {
  const response = await api.get('/users', { username, password });
  return response.data;
};

export const createUser = async (username, password) => {
  const response = await api.post('/users', { username, password });
  return response.data;
};
