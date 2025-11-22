import React from 'react'
import { useData } from '../../Context/DataContext'

const AdminBookings = () => {
    const { bookings, deleteBooking } = useData()

    return (
        <div className="admin-page">
            <div className="page-header">
                <h1>Manage Bookings</h1>
                <p>View and manage all system bookings.</p>
            </div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Lot</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td style={{ fontWeight: '600' }}>{booking.userName}</td>
                                <td>{booking.lotName}</td>
                                <td>{booking.date}</td>
                                <td>
                                    <span className={`status-badge ${booking.status === 'Confirmed' ? 'active' : 'pending'}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="action-btn-small delete" onClick={() => deleteBooking(booking.id)}>Cancel Booking</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminBookings
