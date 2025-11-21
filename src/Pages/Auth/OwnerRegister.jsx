import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import './Auth.scss'

const OwnerRegister = () => {
    const [company, setCompany] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { loginOwner } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (username && password && company) {
            loginOwner({ username, company, role: 'owner' })
            navigate('/owner')
        }
    }

    return (
        <div className="auth-container owner-theme">
            <div className="auth-card">
                <h2>Partner Registration</h2>
                <p className="auth-subtitle">Start managing your lots with ParkMate</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            placeholder="ParkMate Solutions"
                        />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Choose a username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Create a strong password"
                        />
                    </div>

                    <button type="submit" className="btn-primary full-width">Register Business</button>
                </form>

                <p className="auth-footer">
                    Already a partner? <Link to="/owner/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default OwnerRegister
