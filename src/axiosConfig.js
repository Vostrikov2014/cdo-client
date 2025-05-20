import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        //const username = localStorage.getItem('username'); //'vd'; //process.env.REACT_APP_API_USERNAME;
        const payload = JSON.parse(atob(localStorage.getItem('access_token').split('.')[1]));
        const username = payload.preferred_username || payload.username || payload.sub;
        const password = '111'; //localStorage.getItem('password'); //'111'; //process.env.REACT_APP_API_PASSWORD;
        if (username && password) {
            config.auth = {
                username,
                password
            }
        }
        return config;
    },
    (err) => Promise.reject(err)
);

export default axiosInstance;