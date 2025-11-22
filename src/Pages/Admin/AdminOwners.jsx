import React, { useState } from 'react'
import { useData } from '../../Context/DataContext'

const AdminOwners = () => {
    const { owners, addOwner, updateOwner, deleteOwner } = useData()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentOwner, setCurrentOwner] = useState(null)
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        email: '',
        status: 'Active'
    })

    const handleOpenModal = (owner = null) => {
        if (owner) {
            setCurrentOwner(owner)
            setFormData(owner)
        } else {
            setCurrentOwner(null)
            setFormData({
                businessName: '',
                ownerName: '',
                email: '',
                status: 'Active'
            })
        }
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setCurrentOwner(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentOwner) {
            updateOwner(currentOwner.id, formData)
        } else {
            addOwner(formData)
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
                        <h1>Manage Owners</h1>
                        <p>Approve and manage parking lot owners.</p>
                    </div>
                    <button className="action-btn" onClick={() => handleOpenModal()}>
                        + Add Owner
                    </button>
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Business Name</th>
                            <th>Owner Name</th>
                            <th>Email</th>
                            <th>Lots</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owners.map(owner => (
                            <tr key={owner.id}>
                                <td style={{ fontWeight: '600' }}>{owner.businessName}</td>
                                <td>{owner.ownerName}</td>
                                <td>{owner.email}</td>
                                <td>{owner.lots}</td>
                                <td>
                                    <span className={`status-badge ${owner.status === 'Active' ? 'active' : 'pending'}`}>
                                        {owner.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="action-btn-small edit" onClick={() => handleOpenModal(owner)}>Edit</button>
                                    <button className="action-btn-small delete" onClick={() => deleteOwner(owner.id)}>Delete</button>
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
                        <h2 style={{ marginTop: 0 }}>{currentOwner ? 'Edit Owner' : 'Add New Owner'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Business Name</label>
                                <input name="businessName" value={formData.businessName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Owner Name</label>
                                <input name="ownerName" value={formData.ownerName} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} style={{
                                    width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0'
                                }}>
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Suspended">Suspended</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={handleCloseModal} style={{
                                    flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer'
                                }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Owner</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminOwners
