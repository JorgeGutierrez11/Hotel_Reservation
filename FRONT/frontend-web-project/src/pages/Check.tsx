import React, { useState } from 'react';
import CheckIn from '../components/CkeckIn/CkeckIn';
import CheckOut from '../components/CheckOut/CheckOut';
import './Check.css'; // si tienes estilos para tabs y layout

export const Check: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');

    return (
        <div className="check-container">
            <div className="navbarspace">

            </div>

            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'checkin' ? 'active' : ''}`}
                    onClick={() => setActiveTab('checkin')}
                >
                    Check-In
                </button>
                <button
                    className={`tab-button ${activeTab === 'checkout' ? 'active' : ''}`}
                    onClick={() => setActiveTab('checkout')}
                >
                    Check-Out
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 'checkin' ? <CheckIn /> : <CheckOut />}
            </div>

            <footer className="footer">
                <p>© 2025 Hotel Management System</p>
            </footer>
        </div>
    );
};

