import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // close mobile menu when route changes
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header id="Nav">
      <div className="container nav-inner">
        <div className="brand">
          <Link to="/" className="logo">PARKMATE</Link>
        </div>

        <button
          className={`hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-items ${open ? 'open' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/#about" className="nav-link">About</Link>
          <Link to="/lots" className="nav-link">Lots</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </nav>

        {/* backdrop closes the menu when clicking outside on mobile */}
        <div
          className={`nav-backdrop ${open ? 'open' : ''}`}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        />
      </div>
    </header>
  )
}

export default Navbar
