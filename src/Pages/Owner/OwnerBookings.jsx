import React, { useState, useEffect } from 'react'
import './Owner.scss'

const OwnerBookings = () => {
    const [bookings, setBookings] = useState([])
    const [filter, setFilter] = useState('all') // all, pending, approved, declined

    useEffect(() => {
        loadBookings()
    }, [])

    const loadBookings = () => {
        const keys = [
            { key: 'parkmate_lot1_slots', label: 'Lot 1', idx: 1 },
            { key: 'parkmate_lot2_slots', label: 'Lot 2', idx: 2 },
            { key: 'parkmate_lot3_slots', label: 'Lot 3', idx: 3 },
        ]
        const all = []
        keys.forEach((k) => {
            try {
                const raw = localStorage.getItem(k.key)
                if (!raw) return
                const arr = JSON.parse(raw)
                arr.forEach((s) => {
                    if (s && s.isBooked) {
                        // Default to 'Approved' if no status exists for backward compatibility
                        const status = s.status || 'Approved'
                        all.push({
                            ...s,
                            lot: k.label,
                            lotKey: k.key,
                            status: status
                        })
                    }
                })
            } catch (e) { }
        })
        // Sort by recent
        all.sort((a, b) => b.bookedAt - a.bookedAt)
        setBookings(all)
    }

    const updateBookingStatus = (booking, newStatus) => {
        try {
            const raw = localStorage.getItem(booking.lotKey)
            if (!raw) return
            const arr = JSON.parse(raw)

            const newArr = arr.map(s => {
                if (s.id === booking.id) {
                    if (newStatus === 'Declined') {
                        // If declined, we might want to free up the slot
                        // For now, let's just mark it as declined but keep the record?
                        // Or free it? Usually declined means "cancelled", so free it.
                        // But if we free it, it disappears from the list?
                        // Let's just set isBooked to false and clear details.
                        return { id: s.id, isBooked: false, status: 'Declined' }
                    }
                    return { ...s, status: newStatus }
                }
                return s
            })

            localStorage.setItem(booking.lotKey, JSON.stringify(newArr))
            loadBookings() // Reload
        } catch (e) {
            console.error("Failed to update booking", e)
        }
    }

    const filteredBookings = bookings.filter(b => {
        if (filter === 'all') return true
        return b.status.toLowerCase() === filter
    })

    return (
        <div className="owner-bookings">
            <header className="page-header">
                <h1>Manage Bookings</h1>
                <div className="filters">
                    <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                    <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
                    <button className={`filter-btn ${filter === 'approved' ? 'active' : ''}`} onClick={() => setFilter('approved')}>Approved</button>
                    {/* <button className={`filter-btn ${filter === 'declined' ? 'active' : ''}`} onClick={() => setFilter('declined')}>Declined</button> */}
                </div>
            </header>

            <div className="bookings-list-container">
                {filteredBookings.length === 0 ? (
                    <div className="empty-state">No bookings found.</div>
                ) : (
                    <table className="bookings-table">
                        <thead>
                            <tr>
                                <th>Lot</th>
                                <th>Slot</th>
                                <th>Vehicle</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((b, i) => (
                                <tr key={`${b.lotKey}-${b.id}-${i}`}>
                                    <td>{b.lot}</td>
                                    <td>#{b.id}</td>
                                    <td style={{ textTransform: 'capitalize' }}>{b.vehicleType || 'N/A'}</td>
                                    <td>{new Date(b.bookedAt).toLocaleString()}</td>
                                    <td>
                                        <span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span>
                                    </td>
                                    <td>
                                        {b.status === 'Pending' && (
                                            <div className="action-group">
                                                <button className="btn-sm success" onClick={() => updateBookingStatus(b, 'Approved')}>Approve</button>
                                                <button className="btn-sm danger" onClick={() => updateBookingStatus(b, 'Declined')}>Decline</button>
                                            </div>
                                        )}
                                        {b.status === 'Approved' && (
                                            <button className="btn-sm danger" onClick={() => updateBookingStatus(b, 'Declined')}>Cancel</button>
                                        )}
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
