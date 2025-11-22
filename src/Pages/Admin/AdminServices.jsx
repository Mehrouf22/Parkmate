import React, { useState } from 'react'
import { useData } from '../../Context/DataContext'

const AdminServices = () => {
    const { services, addService, updateService, deleteService } = useData()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentService, setCurrentService] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: '',
        active: true
    })

    const handleOpenModal = (service = null) => {
        if (service) {
            setCurrentService(service)
            setFormData(service)
        } else {
            setCurrentService(null)
            setFormData({
                name: '',
                description: '',
                price: '',
                duration: '',
                active: true
            })
        }
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setCurrentService(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (currentService) {
            updateService(currentService.id, formData)
        } else {
            addService(formData)
        }
        handleCloseModal()
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    return (
        <div className="admin-page">
            <div className="page-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Manage Services</h1>
                        <p>Create and manage services available to users.</p>
                    </div>
                    <button className="action-btn" onClick={() => handleOpenModal()}>
                        + Add New Service
                    </button>
                </div>
            </div>

            <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {services.map(service => (
                    <div key={service.id} className="bento-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h3>{service.name}</h3>
                            <span className={`status-badge ${service.active ? 'active' : 'inactive'}`}>
                                {service.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <p style={{ color: '#64748b', margin: '8px 0 16px 0' }}>{service.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: '600' }}>
                            <span>₹{service.price}</span>
                            <span>{service.duration}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="action-btn-small edit" style={{ flex: 1 }} onClick={() => handleOpenModal(service)}>Edit</button>
                            <button className="action-btn-small delete" style={{ flex: 1 }} onClick={() => deleteService(service.id)}>Delete</button>
                        </div>
                    </div>
                ))}
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
                        <h2 style={{ marginTop: 0 }}>{currentService ? 'Edit Service' : 'Add New Service'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Service Name</label>
                                <input name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input name="description" value={formData.description} onChange={handleChange} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>Price (₹)</label>
                                    <input name="price" type="number" value={formData.price} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Duration</label>
                                    <input name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 30m" required />
                                </div>
                            </div>
                            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={formData.active}
                                    onChange={handleChange}
                                    style={{ width: 'auto' }}
                                />
                                <label style={{ marginBottom: 0 }}>Service Active</label>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={handleCloseModal} style={{
                                    flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer'
                                }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Service</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminServices
