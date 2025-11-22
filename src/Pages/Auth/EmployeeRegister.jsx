import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useData } from '../../Context/DataContext'
import './Auth.scss'

const EmployeeRegister = () => {
    const navigate = useNavigate()
    const { addEmployee } = useData()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'Washer',
        licenseNum: '',
        licenseImage: null
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'licenseImage') {
            setFormData(prev => ({ ...prev, [name]: files[0] }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!")
            return
        }

        const newEmployee = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            licenseNum: formData.licenseNum,
            licenseImageName: formData.licenseImage ? formData.licenseImage.name : 'None',
            status: 'Off Duty', // Default status
            serviceId: '' // Unassigned initially
        }

        addEmployee(newEmployee)
        alert('Registration successful! Please contact Admin for assignment.')
        navigate('/login')
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Employee Registration</h1>
                    <p>Join the Parkmate team</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
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
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
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
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="auth-select">
                            <option value="Washer">Washer</option>
                            <option value="Valet">Valet</option>
                            <option value="Security">Security</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Driving License Number</label>
                        <input
                            type="text"
                            name="licenseNum"
                            value={formData.licenseNum}
                            onChange={handleChange}
                            required
                            placeholder="DL-1234567890"
                        />
                    </div>

                    <div className="form-group">
                        <label>Upload Driving License</label>
                        <input
                            type="file"
                            name="licenseImage"
                            onChange={handleChange}
                            accept="image/*"
                            className="file-input"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-auth">Register as Employee</button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Sign In</Link></p>
                    <p className="mt-2">Not an employee? <Link to="/register">User Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default EmployeeRegister
