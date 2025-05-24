import React, { useState } from 'react';
import CheckIn from '../components/CkeckIn/CkeckIn';
import CheckOut from '../components/CheckOut/CheckOut';
import './Check.css';

export const Check: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');

    return (
        <div className="check-container">
            <div className="check-navbarspace" />

            <div className="check-tab-wrapper">
                <div className="check-tabs">
                    <button
                        className={`check-tab-button ${activeTab === 'checkin' ? 'check-active' : ''}`}
                        onClick={() => setActiveTab('checkin')}
                    >
                        Check-In
                    </button>
                    <button
                        className={`check-tab-button ${activeTab === 'checkout' ? 'check-active' : ''}`}
                        onClick={() => setActiveTab('checkout')}
                    >
                        Check-Out
                    </button>
                </div>

                <div className="check-tab-content">
                    {activeTab === 'checkin' ? <CheckIn /> : <CheckOut />}
                </div>
            </div>

            <footer className="check-footer">
                <p>© 2025 Hotel Management System</p>
            </footer>
        </div>
    );
};
