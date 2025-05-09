import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthCallback from './components/AuthCallback';
import ConferenceList from './components/ConferenceList';
//import {generatePKCECode} from './utils/pkce';

const clientId = 'client';
const redirectUri = 'http://localhost:3000/callback';
const authServerUrl = 'http://localhost:9000/oauth2/authorize';

const App = () => {
    useEffect(() => {
        //const codeChallenge = generatePKCECode();
        //window.location.href = `${authServerUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid&code_challenge=${codeChallenge}&code_challenge_method=S256`;

        const token = localStorage.getItem('access_token');
        if (!token) {
            // Перенаправляем на страницу авторизации без PKCE
            window.location.href =
                `${authServerUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid profile`;
        }

    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthCallback />} />
                <Route path="/conferences" element={<ConferenceList />} />
            </Routes>
        </Router>
    );
};

export default App;