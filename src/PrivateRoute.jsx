import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';

function PrivateRoute({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        authenticate();
    }, []);

    async function authenticate() {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken == null) {
            setIsAuthenticated(false);
            return;
        }
        const response = await fetch(
            "http://localhost:8080/web4_backend-1.0-SNAPSHOT/api/auth/check-token", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "HEAD"
            }
        );
        setIsAuthenticated(response.ok);
    }

    if(isAuthenticated !== null) return isAuthenticated ? children : <Navigate to="/sign-in"/>;
}

export default PrivateRoute;