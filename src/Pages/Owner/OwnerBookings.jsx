import React, { useState } from 'react'
import { useData } from '../../Context/DataContext'
import './Owner.scss'

const OwnerBookings = () => {
    const { bookings, updateBooking, deleteBooking } = useData()
    const [filter, setFilter] = useState('all') // all, pending, approved, declined

    const filteredBookings = bookings.filter(b => {
        if (filter === 'all') return true
        // Case insensitive comparison for status
        return b.status && b.status.toLowerCase() === filter
    })

    // Sort by recent
    const sortedBookings = [...filteredBookings].sort((a, b) => {
        const dateA = new Date(a.date || a.bookedAt || Date.now())
        const dateB = new Date(b.date || b.bookedAt || Date.now())
        return dateB - dateA
    })

    const handleStatusUpdate = (id, newStatus) => {
        updateBooking(id, { status: newStatus })
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            deleteBooking(id)
        }
    }

    return (
        <div className="owner-bookings">
            <header className="page-header">
                <h1>Manage Bookings</h1>
                <div className="filters">
                    <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                    <button className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`} onClick={() => setFilter('confirmed')}>Confirmed</button>
                    <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
                    <button className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`} onClick={() => setFilter('cancelled')}>Cancelled</button>
                </div>
            </header>

            <div className="bookings-list-container">
                {sortedBookings.length === 0 ? (
                    <div className="empty-state">No bookings found.</div>
                ) : (
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Lot</th>
                                <th>Slot</th>
                                <th>Vehicle</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBookings.map((b) => (
                                <tr key={b.id}>
                                    <td>
                                        <div style={{ fontWeight: '600' }}>{b.userName || 'Guest'}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>ID: {b.userId}</div>
                                    </td>
                                    <td>{b.lotName || 'Unknown Lot'}</td>
                                    <td>#{b.slotId || 'N/A'}</td>
                                    <td style={{ textTransform: 'capitalize' }}>{b.vehicleType || 'N/A'}</td>
                                    <td>{b.date || new Date().toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status-badge ${b.status ? b.status.toLowerCase() : 'pending'}`}>
                                            {b.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-group">
                                            {b.status !== 'Confirmed' && (
                                                <button className="btn-icon success" onClick={() => handleStatusUpdate(b.id, 'Confirmed')} title="Confirm Booking">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </button>
                                            )}
                                            {b.status !== 'Cancelled' && (
                                                <button className="btn-icon warning" onClick={() => handleStatusUpdate(b.id, 'Cancelled')} title="Cancel Booking">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                            )}
                                            <button className="btn-icon danger" onClick={() => handleDelete(b.id)} title="Delete Record">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default OwnerBookings
