import React, { useState, useEffect } from 'react'
import './Owner.scss'

const DEFAULT_SERVICES = [
    { id: 'interior', title: 'Interior Wash', desc: 'Thorough vacuuming, wipe down, and interior detailing.', price: 500, icon: '🧼' },
    { id: 'exterior', title: 'Exterior Wash', desc: 'Exterior shampoo, wheel clean and rim shine.', price: 300, icon: '🚿' },
    { id: 'full', title: 'Full Wash', desc: 'Interior + Exterior combo for a complete clean.', price: 750, icon: '✨' },
]

const OwnerServices = () => {
    const [services, setServices] = useState(DEFAULT_SERVICES)
    const [isEditing, setIsEditing] = useState(false)
    const [currentService, setCurrentService] = useState(null)

    useEffect(() => {
        const stored = localStorage.getItem('parkmate_services_config')
        if (stored) {
            setServices(JSON.parse(stored))
        } else {
            // Initialize with defaults if empty
            localStorage.setItem('parkmate_services_config', JSON.stringify(DEFAULT_SERVICES))
        }
    }, [])

    const saveServices = (newServices) => {
        setServices(newServices)
        localStorage.setItem('parkmate_services_config', JSON.stringify(newServices))
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
            saveServices(services.filter(s => s.id !== id))
        }
    }

    const handleEdit = (service) => {
        setCurrentService(service)
        setIsEditing(true)
    }

    const handleAddNew = () => {
        setCurrentService({ id: '', title: '', desc: '', price: 0, icon: '🔧' })
        setIsEditing(true)
    }

    const handleSaveForm = (e) => {
        e.preventDefault()
        const newSvc = { ...currentService }
        if (!newSvc.id) newSvc.id = 'svc-' + Date.now() // Simple ID generation

        let newServices
        if (services.find(s => s.id === currentService.id)) {
            // Update existing
            newServices = services.map(s => s.id === currentService.id ? newSvc : s)
        } else {
            // Add new
            newServices = [...services, newSvc]
        }
        saveServices(newServices)
        setIsEditing(false)
        setCurrentService(null)
    }

    return (
        <div className="owner-services">
            <div className="services-header">
                <div>
                    <h1>🛠️ Service Management</h1>
                    <p className="subtitle">Configure and manage your parking lot services</p>
                </div>
                <button className="btn-add-service" onClick={handleAddNew}>
                    <span className="icon">+</span>
                    Add New Service
                </button>
            </div>

            {isEditing && (
                <div className="service-modal-overlay" onClick={() => setIsEditing(false)}>
                    <div className="service-modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{currentService.id && !currentService.id.startsWith('svc-') ? '✏️ Edit Service' : '➕ New Service'}</h2>
                            <button className="modal-close" onClick={() => setIsEditing(false)}>✕</button>
                        </div>
                        <form onSubmit={handleSaveForm}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Service Icon</label>
                                    <input
                                        type="text"
                                        value={currentService.icon || '🔧'}
                                        onChange={e => setCurrentService({ ...currentService, icon: e.target.value })}
                                        placeholder="Choose an emoji"
                                        maxLength="2"
                                    />
                                    <small>Pick an emoji to represent this service</small>
                                </div>
                                <div className="form-group">
                                    <label>Service Title</label>
                                    <input
                                        type="text"
                                        value={currentService.title}
                                        onChange={e => setCurrentService({ ...currentService, title: e.target.value })}
                                        placeholder="e.g., Premium Detailing"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={currentService.desc}
                                        onChange={e => setCurrentService({ ...currentService, desc: e.target.value })}
                                        placeholder="Describe what this service includes..."
                                        rows="3"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price (₹)</label>
                                    <input
                                        type="number"
                                        value={currentService.price}
                                        onChange={e => setCurrentService({ ...currentService, price: Number(e.target.value) })}
                                        placeholder="0"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-modal-cancel" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-modal-save">
                                    <span className="save-icon">💾</span>
                                    Save Service
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="services-grid">
                {services.map(service => (
                    <div key={service.id} className="service-card-modern">
                        <div className="service-card-header">
                            <div className="service-icon-badge">
                                {service.icon || '🔧'}
                            </div>
                            <div className="service-price-badge">
                                ₹{service.price}
                            </div>
                        </div>
                        <div className="service-card-body">
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.desc}</p>
                        </div>
                        <div className="service-card-actions">
                            <button className="btn-edit-service" onClick={() => handleEdit(service)}>
                                <span className="btn-icon">✏️</span>
                                Edit
                            </button>
                            <button className="btn-delete-service" onClick={() => handleDelete(service.id)}>
                                <span className="btn-icon">🗑️</span>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {services.length === 0 && (
                <div className="empty-services-state">
                    <div className="empty-icon">🛠️</div>
                    <h3>No Services Yet</h3>
                    <p>Add your first service to get started</p>
                    <button className="btn-add-first" onClick={handleAddNew}>
                        <span className="icon">+</span>
                        Add Your First Service
                    </button>
                </div>
            )}
        </div>
    )
}

export default OwnerServices
