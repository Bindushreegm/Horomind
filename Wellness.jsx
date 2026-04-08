import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // New sign up fields
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.trim()) return;

        if (isLogin) {
            login(username);
        } else {
            signup({ username, age, weight, height });
        }

        // AuthContext and App.jsx routing will automatically redirect them
        // based on whether onboarding is complete or not.
        navigate('/dashboard');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
            <div className="glass-card animate-fade-in" style={{ width: '100%', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--sage-main)' }}>
                    <Leaf size={48} />
                </div>
                <h2 style={{ marginBottom: '0.5rem', color: 'var(--sage-dark)' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your personal wellness companion</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="input-base"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input-base"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {!isLogin && (
                        <>
                            <input
                                type="number"
                                placeholder="Age"
                                className="input-base"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="number"
                                    placeholder="Weight (kg)"
                                    className="input-base"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Height (cm)"
                                    className="input-base"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ color: 'var(--sage-main)', fontWeight: '600', cursor: 'pointer' }}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
