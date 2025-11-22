import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { useData } from '../../Context/DataContext'
import './Auth.scss'

const UserRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        phone: '',
        vehicleNum: '',
        vehicleType: 'Car'
    })
    const { loginUser } = useAuth()
    const { addUser } = useData()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.username && formData.password) {
            // Add to global data store (visible to Admin)
            const newUser = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: `${formData.username}@example.com`, // Mock email generation or add field
                phone: formData.phone,
                status: 'Active',
                ...formData
            }
            addUser(newUser)

            // Log in the user
            loginUser({
                username: formData.username,
                name: newUser.name,
                role: 'user',
                ...formData
            })
            navigate('/')
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card" style={{ maxWidth: '500px' }}>
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join ParkMate today</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder="John"
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Choose a username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="123-456-7890"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label>Vehicle Number</label>
                            <input
                                type="text"
                                name="vehicleNum"
                                value={formData.vehicleNum}
                                onChange={handleChange}
                                required
                                placeholder="ABC-1234"
                            />
                        </div>
                        <div className="form-group">
                            <label>Vehicle Type</label>
                            <select
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                            >
                                <option value="Car">Car</option>
                                <option value="Bike">Bike</option>
                                <option value="Truck">Truck</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary full-width">Sign Up</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default UserRegister
