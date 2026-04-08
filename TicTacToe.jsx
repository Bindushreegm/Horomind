import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Coins, RotateCcw } from 'lucide-react';

const TicTacToe = () => {
    const { addCoins } = useAuth();
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board)) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const winner = calculateWinner(newBoard);
        if (winner) {
            setTimeout(() => {
                alert(`Player ${winner} won! You earned 10 Harmo Coins!`);
                addCoins(10);
            }, 300);
        } else if (!newBoard.includes(null)) {
            setTimeout(() => alert("It's a draw!"), 300);
        }
    };

    const winner = calculateWinner(board);

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ color: 'var(--sage-dark)', marginBottom: '1rem', fontSize: '1.8rem' }}>Tic Tac Toe</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>Win a match against a friend to earn 10 Coins.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 90px)', gap: '10px', marginBottom: '2rem' }}>
                {board.map((cell, index) => (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className="glass-card"
                        style={{
                            height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2.5rem', cursor: 'pointer', padding: 0,
                            color: cell === 'X' ? 'var(--sage-main)' : 'var(--sage-dark)'
                        }}
                    >
                        {cell}
                    </div>
                ))}
            </div>

            <div style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-dark)', fontWeight: '600' }}>
                {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
            </div>

            <button className="btn-secondary" onClick={() => setBoard(Array(9).fill(null))} style={{ maxWidth: '200px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
                <RotateCcw size={18} /> Restart Match
            </button>
        </div>
    );
};

export default TicTacToe;
