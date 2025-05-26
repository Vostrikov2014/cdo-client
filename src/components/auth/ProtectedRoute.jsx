import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }) => {
    useEffect(() => {
        if (!isAuthenticated) {
            const clientId = 'client';
            const redirectUri = 'http://localhost:3000/callback';
            const authServerUrl = 'http://localhost:9000/oauth2/authorize';

            window.location.href =
                `${authServerUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile`;
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;