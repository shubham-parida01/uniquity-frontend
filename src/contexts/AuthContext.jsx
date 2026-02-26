import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const USER_STORAGE_KEY = 'uniquity.user';

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function setGoogleUser(user) {
        setCurrentUser(user);
        try {
            if (user) {
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
            } else {
                localStorage.removeItem(USER_STORAGE_KEY);
            }
        } catch {
            // ignore storage failures
        }
    }

    async function logout() {
        setGoogleUser(null);
    }

    useEffect(() => {
        try {
            const raw = localStorage.getItem(USER_STORAGE_KEY);
            if (raw) {
                setCurrentUser(JSON.parse(raw));
            }
        } catch {
            // ignore parse/storage errors
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        currentUser,
        setGoogleUser,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
