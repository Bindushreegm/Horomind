import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, MonitorPlay, MessageCircle, Store, Settings } from 'lucide-react';

const BottomNav = () => {
    const navItems = [
        { name: 'Calendar', path: '/dashboard', icon: <Home size={24} /> },
        { name: 'Games', path: '/games', icon: <Gamepad2 size={24} /> },
        { name: 'Videos', path: '/videos', icon: <MonitorPlay size={24} /> },
        { name: 'Store', path: '/store', icon: <Store size={24} /> },
        { name: 'Menu', path: '/settings', icon: <Settings size={24} /> }
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'var(--card-bg)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '0.8rem 0',
            paddingBottom: 'calc(0.8rem + env(safe-area-inset-bottom))',
            zIndex: 1000,
            boxShadow: '0 -4px 10px rgba(0,0,0,0.03)'
        }}>
            {navItems.map(item => (
                <NavLink
                    key={item.name}
                    to={item.path}
                    style={({ isActive }) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.3rem',
                        textDecoration: 'none',
                        color: isActive ? 'var(--sage-main)' : 'var(--text-muted)',
                        transition: 'color 0.2s',
                    })}
                >
                    {item.icon}
                    <span style={{ fontSize: '0.7rem', fontWeight: '500' }}>{item.name}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default BottomNav;
