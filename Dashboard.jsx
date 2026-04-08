import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Coins, Brain, Calendar as CalendarIcon, Info } from 'lucide-react';

const Dashboard = () => {
    const { user, updateProfile } = useAuth();
    const [date, setDate] = useState(new Date());

    const aiInsights = useMemo(() => {
        let insights = [];
        if (user?.diagnoses?.includes('PCOS')) {
            insights.push("Since you're managing PCOS, focusing on blood-sugar balancing foods today might help stabilize your energy.");
        }
        if (insights.length === 0) {
            insights.push("Based on your logs, you may feel a slight dip in energy over the next two days. Prioritize rest!");
        }
        return insights;
    }, [user]);

    let cycLen = 28;
    if (user?.cycleLength === 'Shorter (Under 24 days)') cycLen = 23;
    if (user?.cycleLength === 'Longer (31+ days)') cycLen = 32;

    // Next month prediction
    const nextPeriod = new Date(user?.lastPeriod || new Date());
    nextPeriod.setDate(nextPeriod.getDate() + cycLen);

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const predictionText = nextPeriod.toLocaleDateString(undefined, options);

    const logPeriod = () => {
        const formatted = date.toISOString().split('T')[0];
        updateProfile({ lastPeriod: formatted });
        alert(`Period safely logged for ${formatted}! Predictions updated.`);
    };

    return (
        <div style={{ padding: '1.5rem' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome back,</p>
                    <h1 style={{ color: 'var(--sage-dark)', fontSize: '1.8rem', fontWeight: '700' }}>{user?.username}</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--sage-light)', padding: '0.5rem 0.8rem', borderRadius: '20px', color: 'var(--sage-dark)', fontWeight: '600' }}>
                    <Coins size={18} />
                    {user?.coins || 0}
                </div>
            </div>

            {/* Calendar Section */}
            <div className="glass-card animate-fade-in" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <CalendarIcon color="var(--sage-main)" size={20} />
                    <h3 style={{ color: 'var(--sage-dark)' }}>My Calendar</h3>
                </div>
                <Calendar
                    onChange={setDate}
                    value={date}
                    className="custom-calendar flex-centered"
                />

                <div style={{ padding: '1rem', background: 'var(--mint-light)', borderRadius: '12px', marginTop: '1rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Predicted Next Cycle</p>
                    <p style={{ color: 'var(--sage-dark)', fontSize: '1.2rem', fontWeight: '600' }}>{predictionText}</p>
                </div>

                <button onClick={logPeriod} className="btn-secondary" style={{ marginTop: '1rem' }}>
                    Log starting date on {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </button>
            </div>

            {/* AI Insights */}
            <div className="glass-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Sparkles color="var(--sage-main)" size={20} />
                    <h3 style={{ color: 'var(--sage-dark)' }}>My Insights</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {aiInsights.map((insight, idx) => (
                        <div key={idx} style={{ padding: '1rem', background: 'var(--mint-light)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <Brain size={20} color="var(--sage-main)" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: 'var(--text-dark)' }}>{insight}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
