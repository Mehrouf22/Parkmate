import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ role }) => {
    const { user, owner, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (role === 'owner') {
        return owner ? <Outlet /> : <Navigate to="/owner/login" replace />;
    }

    if (role === 'user') {
        return user ? <Outlet /> : <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
