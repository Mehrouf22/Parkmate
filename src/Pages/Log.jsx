import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Log.scss'

export default function Log() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const raw = localStorage.getItem('parkmate_user')
    if (!raw) return setError('No registered user found. Please register first.')
    try {
      const user = JSON.parse(raw)
      if (user.email !== email || user.password !== password) return setError('Invalid email or password')
      localStorage.setItem('parkmate_logged_in', user.email)
      // set client id so bookings are tied to the user
      localStorage.setItem('parkmate_client_id', user.email)
      navigate('/profile')
    } catch (e) {
      setError('Could not read stored user')
    }
  }

  return (
    <div className="log-page container">
      <form className="form card" onSubmit={onSubmit}>
        <h2>Welcome back</h2>
        {error && <div className="form-error">{error}</div>}

        <label>
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <div className="form-actions">
          <button className="btn primary" type="submit">Log in</button>
        </div>
      </form>
    </div>
  )
}
