import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const AUTH_STORAGE_KEY = 'constructionPortalAuth';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  const auth = getStoredAuth();

  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

export const getStoredAuth = () => {
  const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedAuth) {
    return null;
  }

  try {
    return JSON.parse(storedAuth);
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const storeAuth = (auth) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const authLogin = (data) => client.post('/auth/login', data);
export const fetchProjects = () => client.get('/projects');
export const fetchProject = (id) => client.get(`/projects/${id}`);
export const fetchTasks = (projectId) => client.get('/tasks', { params: { projectId } });
export const fetchProcurement = (projectId) => client.get('/procurement', { params: { projectId } });
export const fetchBudget = (projectId) => client.get('/finance/budget', { params: { projectId } });
export const fetchPayments = (projectId) => client.get('/finance/payments', { params: { projectId } });
export const fetchReports = (projectId) => client.get('/reports', { params: { projectId } });
export const generateReport = (payload) => client.post('/reports/generate', payload);
