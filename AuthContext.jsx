import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load from mock localStorage
        const storedUser = localStorage.getItem('harmoUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (username) => {
        // Check if user exists, else create new
        const existingDataStr = localStorage.getItem(`profile_${username}`);
        let profile = { username, onboardingComplete: false, coins: 0 };

        if (existingDataStr) {
            profile = JSON.parse(existingDataStr);
        } else {
            localStorage.setItem(`profile_${username}`, JSON.stringify(profile));
        }

        setUser(profile);
        localStorage.setItem('harmoUser', JSON.stringify(profile));
    };

    const signup = (userData) => {
        const profile = { ...userData, onboardingComplete: false, coins: 0 };
        setUser(profile);
        localStorage.setItem('harmoUser', JSON.stringify(profile));
        localStorage.setItem(`profile_${userData.username}`, JSON.stringify(profile));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('harmoUser');
    };

    const updateProfile = (updates) => {
        if (!user) return;
        const updated = { ...user, ...updates };
        setUser(updated);
        localStorage.setItem('harmoUser', JSON.stringify(updated));
        localStorage.setItem(`profile_${user.username}`, JSON.stringify(updated));
    };

    const addCoins = (amount) => {
        if (!user) return;
        updateProfile({ coins: (user.coins || 0) + amount });
    };

    const spendCoins = (amount) => {
        if (!user || user.coins < amount) return false;
        updateProfile({ coins: user.coins - amount });
        return true;
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, addCoins, spendCoins }}>
            {children}
        </AuthContext.Provider>
    );
};
