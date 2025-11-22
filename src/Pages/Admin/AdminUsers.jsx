import React, { useState } from 'react'
import { useData } from '../../Context/DataContext'

const AdminUsers = () => {
    const { users, addUser, updateUser, deleteUser } = useData()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'Active'
    })

    const handleOpenModal = (user = null) => {
        if (user) {
            setCurrentUser(user)
            setFormData(user)
        } else {
            setCurrentUser(null)
            setFormData({
                name: '',
                email: '',
                phone: '',
                status: 'Active'
            })
        }
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setCurrentUser(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentUser) {
            updateUser(currentUser.id, formData)
        } else {
            addUser(formData)
        }
        handleCloseModal()
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="admin-page">
            <div className="page-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Manage Users</h1>
                        <p>View and manage registered users.</p>
                    </div>
                    <button className="action-btn" onClick={() => handleOpenModal()}>
                        + Add User
                    </button>
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td style={{ fontWeight: '600' }}>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <span className={`status-badge ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="action-btn-small edit" onClick={() => handleOpenModal(user)}>Edit</button>
                                    <button className="action-btn-small delete" onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="modal-content" style={{
                        background: '#fff', padding: '32px', borderRadius: '20px', width: '500px', maxWidth: '90%'
                    }}>
                        <h2 style={{ marginTop: 0 }}>{currentUser ? 'Edit User' : 'Add New User'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} style={{
                                    width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0'
                                }}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                    <option value="Banned">Banned</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={handleCloseModal} style={{
                                    flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer'
                                }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save User</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminUsers
