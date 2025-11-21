import React from 'react'

const OwnerDashboard = () => {
    return (
        <div className="owner-dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>Welcome back, Owner</h1>
                    <p className="subtitle">Here's what's happening with your lots today.</p>
                </div>
                <div className="date-badge">{new Date().toLocaleDateString()}</div>
            </header>

            <div className="bento-grid">
                <div className="bento-card revenue">
                    <div className="card-icon">💰</div>
                    <h3>Total Revenue</h3>
                    <div className="value">₹12,450</div>
                    <div className="trend positive">+12% from last week</div>
                </div>

                <div className="bento-card bookings">
                    <div className="card-icon">🎟️</div>
                    <h3>Active Bookings</h3>
                    <div className="value">8</div>
                    <div className="sub-text">3 pending approval</div>
                </div>

                <div className="bento-card occupancy">
                    <div className="card-icon">🚗</div>
                    <h3>Total Occupancy</h3>
                    <div className="value">75%</div>
                    <div className="progress-bar"><div className="fill" style={{ width: '75%' }}></div></div>
                </div>

                <div className="bento-card quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                        <button className="action-btn">Add New Slot</button>
                        <button className="action-btn">Manage Services</button>
                        <button className="action-btn">View Reports</button>
                    </div>
                </div>

                <div className="bento-card recent-activity">
                    <h3>Recent Activity</h3>
                    <ul className="activity-list">
                        <li>
                            <span className="dot green"></span>
                            <span className="text">Booking #123 approved for Lot 1</span>
                            <span className="time">2m ago</span>
                        </li>
                        <li>
                            <span className="dot yellow"></span>
                            <span className="text">New booking request from Client A</span>
                            <span className="time">15m ago</span>
                        </li>
                        <li>
                            <span className="dot blue"></span>
                            <span className="text">Slot #5 released in Lot 2</span>
                            <span className="time">1h ago</span>
                        </li>
                    </ul>
                </div>

                <div className="bento-card profile-summary">
                    <h3>Profile Status</h3>
                    <div className="profile-info">
                        <div className="avatar">OP</div>
                        <div>
                            <div className="name">Owner Profile</div>
                            <div className="status">Verified</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerDashboard
