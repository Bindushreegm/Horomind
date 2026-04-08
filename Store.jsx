import React from 'react';
import { ShoppingBag, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Store = () => {
    const { user, spendCoins } = useAuth();

    const products = [
        { id: 1, name: 'Organic Cotton Pads (20pk)', price: 150, image: '🌿' },
        { id: 2, name: 'Reusable Menstrual Cup', price: 300, image: '🩸' },
        { id: 3, name: 'Heating Patch (5pk)', price: 100, image: '🔥' },
        { id: 4, name: 'Bamboo Pantyliners (30pk)', price: 120, image: '🍃' },
        { id: 5, name: 'Period Pain Relief Tea', price: 80, image: '🍵' },
        { id: 6, name: 'Harmo Self-care Box', price: 500, image: '🎁' },
        { id: 7, name: 'Lavender Sleep Spray', price: 200, image: '💤' },
        { id: 8, name: 'Choco-Cravings Kit', price: 180, image: '🍫' }
    ];

    const handlePurchase = (product) => {
        if (user.coins >= product.price) {
            if (spendCoins(product.price)) {
                alert(`Successfully purchased ${product.name}!`);
            }
        } else {
            alert(`Not enough coins. Keep logging symptoms and playing games!`);
        }
    };

    return (
        <div style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <ShoppingBag color="var(--sage-main)" size={28} />
                    <h1 style={{ color: 'var(--sage-dark)', fontSize: '1.8rem', fontWeight: '700' }}>Store</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'var(--sage-light)', padding: '0.5rem 0.8rem', borderRadius: '20px', color: 'var(--sage-dark)', fontWeight: '600' }}>
                    <Coins size={18} />
                    {user?.coins || 0}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {products.map(p => (
                    <div key={p.id} className="glass-card animate-fade-in" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', background: 'var(--mint-light)', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                            {p.image}
                        </div>
                        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-dark)', flex: 1 }}>{p.name}</h3>
                        <button
                            onClick={() => handlePurchase(p)}
                            className="btn-primary"
                            style={{ padding: '0.6rem', fontSize: '0.9rem', opacity: user?.coins >= p.price ? 1 : 0.5 }}
                        >
                            <Coins size={16} /> {p.price}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Store;
