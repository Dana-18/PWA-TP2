import { createContext, useEffect, useState } from "react";

const AUTH_STORAGE_KEY = "authUser";
const AUTH_API_URL = "https://tp-express.vercel.app/auth";

export const AuthContext = createContext({
    user: null,
    loadingAuth: false,
    authModalVisible: false,
    authMode: "login",
    error: null,
    openAuthModal: () => {},
    closeAuthModal: () => {},
    login: async () => {},
    register: async () => {},
    logout: () => {},
    setAuthMode: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem(AUTH_STORAGE_KEY);
            }
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    }, [user]);

    const openAuthModal = (mode = "login") => {
        setAuthMode(mode);
        setError(null);
        setAuthModalVisible(true);
    };

    const closeAuthModal = () => {
        setAuthModalVisible(false);
        setError(null);
    };

    const logout = () => {
        setUser(null);
        closeAuthModal();
    };

    const authRequest = async (email, password, action) => {
        setLoadingAuth(true);
        setError(null);

        try {
            const response = await fetch(`${AUTH_API_URL}/${action}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(result?.message || `Error ${response.status}`);
            }

            const authUser = {
                email: result?.email || email,
                token: result?.token || result?.accessToken || null,
            };

            setUser(authUser);
            closeAuthModal();
            return { success: true, user: authUser };
        } catch (authError) {
            const message = authError?.message || "Error de red al autenticarse";
            setError(message);
            return { success: false, message };
        } finally {
            setLoadingAuth(false);
        }
    };

    const login = async (email, password) => authRequest(email, password, "login");
    const register = async (email, password) => authRequest(email, password, "register");

    return (
        <AuthContext.Provider
            value={{
                user,
                loadingAuth,
                authModalVisible,
                authMode,
                error,
                openAuthModal,
                closeAuthModal,
                login,
                register,
                logout,
                setAuthMode,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
