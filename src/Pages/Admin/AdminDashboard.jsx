import React from 'react'

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>Admin Overview</h1>
                    <p className="subtitle">System-wide metrics and management.</p>
                </div>
                <div className="date-badge">{new Date().toLocaleDateString()}</div>
            </header>

            <div className="bento-grid">
                <div className="bento-card revenue">
                    <div className="card-icon">💰</div>
                    <h3>Total Platform Revenue</h3>
                    <div className="value">₹1,24,500</div>
                    <div className="trend positive">+15% from last month</div>
                </div>

                <div className="bento-card bookings">
                    <div className="card-icon">👥</div>
                    <h3>Total Users</h3>
                    <div className="value">1,234</div>
                    <div className="sub-text">45 new this week</div>
                </div>

                <div className="bento-card occupancy">
                    <div className="card-icon">🏢</div>
                    <h3>Registered Owners</h3>
                    <div className="value">56</div>
                    <div className="sub-text">2 pending approval</div>
                </div>

                <div className="bento-card quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                        <button className="action-btn">Approve New Owners</button>
                        <button className="action-btn">Manage Employees</button>
                        <button className="action-btn">System Reports</button>
                    </div>
                </div>

                <div className="bento-card recent-activity">
                    <h3>Recent System Activity</h3>
                    <ul className="activity-list">
                        <li>
                            <span className="dot green"></span>
                            <span className="text">New Owner Registration: Park Plaza</span>
                            <span className="time">5m ago</span>
                        </li>
                        <li>
                            <span className="dot blue"></span>
                            <span className="text">User #8822 booked Lot #12</span>
                            <span className="time">12m ago</span>
                        </li>
                        <li>
                            <span className="dot yellow"></span>
                            <span className="text">Support ticket #401 opened</span>
                            <span className="time">1h ago</span>
                        </li>
                    </ul>
                </div>

                <div className="bento-card profile-summary">
                    <h3>Admin Status</h3>
                    <div className="profile-info">
                        <div className="avatar">AD</div>
                        <div>
                            <div className="name">Super Admin</div>
                            <div className="status">Online</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
