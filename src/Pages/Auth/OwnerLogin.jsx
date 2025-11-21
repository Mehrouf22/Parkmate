import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import './Auth.scss'

const OwnerLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { loginOwner } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (username && password) {
            loginOwner({ username, name: 'Owner', role: 'owner' })
            navigate('/owner')
        }
    }

    return (
        <div className="auth-container owner-theme">
            <div className="auth-card">
                <h2>Owner Portal</h2>
                <p className="auth-subtitle">Manage your parking business</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                        />
                    </div>

                    <button type="submit" className="btn-primary full-width">Login to Dashboard</button>
                </form>

                <p className="auth-footer">
                    New partner? <Link to="/owner/register">Register Business</Link>
                </p>
                <div className="divider">OR</div>
                <p className="auth-footer">
                    Looking for parking? <Link to="/login">User Login</Link>
                </p>
            </div>
        </div>
    )
}

export default OwnerLogin
