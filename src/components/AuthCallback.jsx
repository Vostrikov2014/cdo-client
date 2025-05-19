import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

const tokenUrl = 'http://localhost:9000/oauth2/token';
const clientId = 'client';
const clientSecret = 'secret'; // Указываем client_secret
const redirectUri = 'http://localhost:3000/callback';

const AuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Проверка наличия токена в localStorage
        const token = localStorage.getItem('access_token');
        console.log('Token in localStorage:', token); // Для отладки
        if (token) {
            navigate('/conferences');
            return;
        }

        // Получаем код авторизации из URL
        const code = new URLSearchParams(window.location.search).get('code');
        //const codeVerifier = localStorage.getItem('pkce_code_verifier');

        //.if (code && codeVerifier) {
        if (code) {
            console.log('Получен код авторизации, попытка обмена токена.');
            const data = qs.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret, // Передаем client_secret
                //code_verifier: codeVerifier,
            });

            axios.post(tokenUrl, data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                           'Authorization': 'Basic ' + btoa('client:secret'),
                },
            })
                .then(response => {
                    const { access_token } = response.data;
                    console.log("Access Token:", access_token);

                    if (access_token) {
                        localStorage.setItem('access_token', access_token);
                        console.log("Access Token:", access_token);
                        navigate('/conferences');
                    } else {
                        console.error('No access token received');
                        navigate('/login'); // Или обработайте ошибку по мере необходимости
                    }
                })
                .catch(error => {
                    console.error('Ошибка обмена токена', error);
                    navigate('/login'); // Или обработайте ошибку по мере необходимости
                });
        } else {
            // Если код или code_verifier нет, можно редиректить на страницу логина
            console.error("Code or code_verifier is missing");
            navigate('/login');
        }
    }, [navigate]);

    return <div>Logging in...</div>;
};

export default AuthCallback;