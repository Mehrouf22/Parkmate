import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import './Auth.scss'

const AdminLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { loginAdmin } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (username === 'admin' && password === 'admin123') { // Simple hardcoded check for now
            loginAdmin({ username, name: 'Super Admin', role: 'admin' })
            navigate('/admin')
        } else {
            alert('Invalid credentials (try admin/admin123)')
        }
    }

    return (
        <div className="auth-container admin-theme">
            <div className="auth-card">
                <h2>Admin Portal</h2>
                <p className="auth-subtitle">System Administration</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter admin username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter admin password"
                        />
                    </div>

                    <button type="submit" className="btn-primary full-width">Login to Admin Dashboard</button>
                </form>

                <div className="divider">OR</div>
                <p className="auth-footer">
                    <Link to="/login" style={{ marginRight: '15px' }}>User Login</Link>
                    <Link to="/owner/login">Owner Login</Link>
                </p>
            </div>
        </div>
    )
}

export default AdminLogin
