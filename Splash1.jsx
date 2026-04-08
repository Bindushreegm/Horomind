import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'var(--sage-main)',
            color: 'white'
        }}>
            <div className="animate-fade-in" style={{ animation: 'pulse 2s infinite, fadeIn 1s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Leaf size={64} style={{ marginBottom: '1rem' }} />
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', letterSpacing: '2px' }}>Harmo Mind</h1>
                <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>Wellness, balanced.</p>
            </div>
        </div>
    );
};

export default Splash;
