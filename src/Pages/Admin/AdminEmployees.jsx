import React, { useState } from 'react'
import { useData } from '../../Context/DataContext'

const AdminEmployees = () => {
    const { employees, addEmployee, updateEmployee, deleteEmployee, services } = useData()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentEmployee, setCurrentEmployee] = useState(null)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        email: '',
        phone: '',
        latitude: '',
        licenseNum: '',
        licenseImage: null,
        status: 'On Duty',
        serviceId: ''
    })

    const handleOpenModal = (employee = null) => {
        if (employee) {
            setCurrentEmployee(employee)
            setFormData(employee)
        } else {
            setCurrentEmployee(null)
            setFormData({
                firstName: '',
                lastName: '',
                role: '',
                email: '',
                phone: '',
                latitude: '',
                licenseNum: '',
                licenseImage: null,
                status: 'On Duty',
                serviceId: ''
            })
        }
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setCurrentEmployee(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const employeeData = {
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`, // Combine for display
            licenseImageName: formData.licenseImage ? formData.licenseImage.name : 'None'
        }

        if (currentEmployee) {
            updateEmployee(currentEmployee.id, employeeData)
        } else {
            addEmployee(employeeData)
        }
        handleCloseModal()
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'licenseImage') {
            setFormData(prev => ({ ...prev, [name]: files[0] }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    return (
        <div className="admin-page">
            <div className="page-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Manage Employees</h1>
                        <p>Allocate and manage employees for services.</p>
                    </div>
                    <button className="action-btn" onClick={() => handleOpenModal()}>
                        + Add Employee
                    </button>
                </div>
            </div>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Contact</th>
                            <th>Assigned Service</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => {
                            const service = services.find(s => s.id == emp.serviceId)
                            return (
                                <tr key={emp.id}>
                                    <td>
                                        <div style={{ fontWeight: '600' }}>{emp.name || `${emp.firstName} ${emp.lastName}`}</div>
                                    </td>
                                    <td>{emp.role}</td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem' }}>{emp.email}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{emp.phone}</div>
                                    </td>
                                    <td>{service ? service.name : 'Unassigned'}</td>
                                    <td>
                                        <span className={`status-badge ${emp.status === 'On Duty' ? 'active' : 'inactive'}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-btn-small edit" onClick={() => handleOpenModal(emp)}>Edit</button>
                                        <button className="action-btn-small delete" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
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
                        background: '#fff', padding: '32px', borderRadius: '20px', width: '600px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <h2 style={{ marginTop: 0 }}>{currentEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <select name="role" value={formData.role} onChange={handleChange} required style={{
                                    width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0'
                                }}>
                                    <option value="">Select Role</option>
                                    <option value="Washer">Washer</option>
                                    <option value="Valet">Valet</option>
                                    <option value="Security">Security</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Latitude (Location)</label>
                                <input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="e.g. 12.9716" required />
                            </div>

                            <div className="form-group">
                                <label>Driving License Number</label>
                                <input name="licenseNum" value={formData.licenseNum} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Driving License Image</label>
                                <input
                                    type="file"
                                    name="licenseImage"
                                    accept="image/*"
                                    onChange={handleChange}
                                    style={{ padding: '8px' }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Assign Service</label>
                                <select name="serviceId" value={formData.serviceId} onChange={handleChange} style={{
                                    width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0'
                                }}>
                                    <option value="">None</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" value={formData.status} onChange={handleChange} style={{
                                    width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0'
                                }}>
                                    <option value="On Duty">On Duty</option>
                                    <option value="Off Duty">Off Duty</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={handleCloseModal} style={{
                                    flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer'
                                }}>Cancel</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Save Employee</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminEmployees
