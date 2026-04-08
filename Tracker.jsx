import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../context/AuthContext';
import { Calendar as CalendarIcon, Info } from 'lucide-react';

const Tracker = () => {
    const { user, updateProfile } = useAuth();
    const [date, setDate] = useState(new Date());

    // Simple prediction: last period + cycle length
    const nextPeriod = new Date(user?.lastPeriod || new Date());
    nextPeriod.setDate(nextPeriod.getDate() + parseInt(user?.cycleLength || 28));

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const predictionText = nextPeriod.toLocaleDateString(undefined, options);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const logPeriod = () => {
        const formatted = date.toISOString().split('T')[0];
        updateProfile({ lastPeriod: formatted });
        alert(`Period logged for ${formatted}`);
    };

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                <CalendarIcon color="var(--sage-main)" size={28} />
                <h1 style={{ color: 'var(--sage-dark)', fontSize: '1.8rem', fontWeight: '700' }}>Cycle Tracker</h1>
            </div>

            <div className="glass-card animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="custom-calendar"
                />
            </div>

            <div className="glass-card animate-fade-in" style={{ animationDelay: '0.1s', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Info size={20} color="var(--sage-main)" />
                    <h3 style={{ color: 'var(--sage-dark)' }}>Prediction</h3>
                </div>
                <div style={{ padding: '1rem', background: 'var(--mint-light)', borderRadius: '12px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Next expected period</p>
                    <p style={{ color: 'var(--sage-dark)', fontSize: '1.2rem', fontWeight: '600' }}>{predictionText}</p>
                </div>

                <button onClick={logPeriod} className="btn-primary" style={{ marginTop: '0.5rem' }}>
                    Log Period on Selected Date
                </button>
            </div>

        </div>
    );
};

export default Tracker;
