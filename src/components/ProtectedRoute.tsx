import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            // Redirect to login if not authenticated
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    // Only render children if authenticated
    if (!isAuthenticated()) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
