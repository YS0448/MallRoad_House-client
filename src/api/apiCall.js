import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7000",
  withCredentials: true
});

const apiCall = async (method = 'GET', endpoint, payload = {}, extraConfig = {}) => {
  try {
    const headers = {};

    // Attach authToken if available
    // const authToken = localStorage.getItem('authToken');
    const authToken = JSON.parse(localStorage.getItem('user-cred'))?.token || '';
    console.log('authToken11111111111111:', authToken);
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (!(payload instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      method,
      url: endpoint,
      headers,
      ...extraConfig
    };

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
      config.data = payload;
    } else if (method.toUpperCase() === 'GET' && Object.keys(payload).length > 0) {
      config.params = payload;
    }

    const response = await api(config);
    return response;
  } catch (error) {
    console.log(`API Error [${method.toUpperCase()} ${endpoint}]:`, error);
    if(error.response?.data.message === "Unauthorized"){
      localStorage.removeItem('user-cred');
      window.location.href = '/login';
    }
    throw error.response?.data || error.message;
  }
};

export default apiCall;