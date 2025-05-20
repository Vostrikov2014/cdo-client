import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8090',
    //timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерсептор для добавления токена в каждый запрос
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4g
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;