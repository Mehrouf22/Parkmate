import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import './Auth.scss'

const UserLogin = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { loginUser } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulate login
        if (username && password) {
            loginUser({ username, name: 'User', role: 'user' })
            navigate('/')
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="auth-subtitle">Login to book your perfect spot</p>

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
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="btn-primary full-width">Login</button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
                <div className="divider">OR</div>
                <p className="auth-footer">
                    Are you a parking lot owner? <Link to="/owner/login">Login here</Link>
                </p>
                <p className="auth-footer" style={{ fontSize: '0.8rem', marginTop: '16px' }}>
                    <Link to="/admin/login" style={{ color: '#94a3b8' }}>Admin Access</Link>
                </p>
            </div>
        </div>
    )
}

export default UserLogin
