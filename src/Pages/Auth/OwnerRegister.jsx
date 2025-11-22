import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { useData } from '../../Context/DataContext'
import './Auth.scss'

const OwnerRegister = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        street: '',
        locality: '',
        city: '',
        state: '',
        pincode: '',
        verificationDoc: null
    })

    const { loginOwner } = useAuth()
    const { addOwner } = useData()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'verificationDoc') {
            setFormData(prev => ({ ...prev, [name]: files[0] }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, we would upload the file and send data to backend
        if (formData.username && formData.password) {
            const newOwner = {
                businessName: `${formData.firstName}'s Parking`,
                ownerName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                status: 'Pending', // Default status for new owners
                lots: 0,
                ...formData,
                verificationDocName: formData.verificationDoc ? formData.verificationDoc.name : 'None'
            }
            addOwner(newOwner)

            loginOwner({
                username: formData.username,
                company: newOwner.businessName,
                role: 'owner',
                ...formData,
                verificationDocName: newOwner.verificationDocName
            })
            navigate('/owner')
        }
    }

    return (
        <div className="auth-container owner-theme">
            <div className="auth-card" style={{ maxWidth: '600px' }}>
                <h2>Partner Registration</h2>
                <p className="auth-subtitle">Start managing your lots with ParkMate</p>

                <form onSubmit={handleSubmit}>
                    {/* Personal Details */}
                    <h4 style={{ margin: '0 0 16px 0', color: '#64748b' }}>Personal Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input name="username" value={formData.username} onChange={handleChange} required placeholder="Username" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="Phone" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" value={formData.password} onChange={handleChange} required placeholder="Password" />
                    </div>

                    {/* Address Details */}
                    <h4 style={{ margin: '24px 0 16px 0', color: '#64748b' }}>Address Details</h4>
                    <div className="form-group">
                        <label>Street Name</label>
                        <input name="street" value={formData.street} onChange={handleChange} required placeholder="Street Address" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label>Locality</label>
                            <input name="locality" value={formData.locality} onChange={handleChange} required placeholder="Locality" />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input name="city" value={formData.city} onChange={handleChange} required placeholder="City" />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label>State</label>
                            <input name="state" value={formData.state} onChange={handleChange} required placeholder="State" />
                        </div>
                        <div className="form-group">
                            <label>Pincode</label>
                            <input name="pincode" value={formData.pincode} onChange={handleChange} required placeholder="Pincode" />
                        </div>
                    </div>

                    {/* Verification */}
                    <h4 style={{ margin: '24px 0 16px 0', color: '#64748b' }}>Verification</h4>
                    <div className="form-group">
                        <label>Verification Document (Image)</label>
                        <input
                            type="file"
                            name="verificationDoc"
                            accept="image/*"
                            onChange={handleChange}
                            required
                            style={{ padding: '8px' }}
                        />
                    </div>

                    <button type="submit" className="btn-primary full-width" style={{ marginTop: '24px' }}>Register Business</button>
                </form>

                <p className="auth-footer">
                    Already a partner? <Link to="/owner/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default OwnerRegister
