import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [owner, setOwner] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved sessions on load
        const savedUser = localStorage.getItem('parkmate_user_session');
        const savedOwner = localStorage.getItem('parkmate_owner_session');
        const savedAdmin = localStorage.getItem('parkmate_admin_session');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        if (savedOwner) {
            setOwner(JSON.parse(savedOwner));
        }

        if (savedAdmin) {
            setAdmin(JSON.parse(savedAdmin));
        }

        setLoading(false);
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem('parkmate_user_session', JSON.stringify(userData));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('parkmate_user_session');
    };

    const loginOwner = (ownerData) => {
        setOwner(ownerData);
        localStorage.setItem('parkmate_owner_session', JSON.stringify(ownerData));
    };

    const logoutOwner = () => {
        setOwner(null);
        localStorage.removeItem('parkmate_owner_session');
    };

    const loginAdmin = (adminData) => {
        setAdmin(adminData);
        localStorage.setItem('parkmate_admin_session', JSON.stringify(adminData));
    };

    const logoutAdmin = () => {
        setAdmin(null);
        localStorage.removeItem('parkmate_admin_session');
    };

    const value = {
        user,
        owner,
        admin,
        loginUser,
        logoutUser,
        loginOwner,
        logoutOwner,
        loginAdmin,
        logoutAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
