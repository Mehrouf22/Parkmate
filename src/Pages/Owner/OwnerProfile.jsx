import React, { useState, useEffect } from 'react'
import './Owner.scss'

const OwnerProfile = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@parkmate.com',
        phone: '+91 98765 43210',
        company: 'ParkMate Solutions',
        address: '123, Tech Park, Bangalore',
        bio: 'Managing parking spaces since 2020.'
    })
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem('parkmate_owner_profile')
        if (stored) {
            setProfile(JSON.parse(stored))
        }
    }, [])

    const handleSave = (e) => {
        e.preventDefault()
        localStorage.setItem('parkmate_owner_profile', JSON.stringify(profile))
        setIsEditing(false)
        alert('Profile updated successfully!')
    }

    return (
        <div className="owner-profile">
            <header className="page-header">
                <h1>My Profile</h1>
                {!isEditing && (
                    <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
            </header>

            <div className="profile-card">
                <div className="profile-header-section">
                    <div className="profile-avatar-large">
                        {profile.name.charAt(0)}
                    </div>
                    <div className="profile-title">
                        <h2>{profile.name}</h2>
                        <p>{profile.company}</p>
                    </div>
                </div>

                {isEditing ? (
                    <form className="profile-form" onSubmit={handleSave}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="tel"
                                    value={profile.phone}
                                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Company</label>
                                <input
                                    type="text"
                                    value={profile.company}
                                    onChange={e => setProfile({ ...profile, company: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                value={profile.address}
                                onChange={e => setProfile({ ...profile, address: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea
                                value={profile.bio}
                                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button type="submit" className="btn-primary">Save Changes</button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-details">
                        <div className="detail-group">
                            <label>Email</label>
                            <p>{profile.email}</p>
                        </div>
                        <div className="detail-group">
                            <label>Phone</label>
                            <p>{profile.phone}</p>
                        </div>
                        <div className="detail-group">
                            <label>Address</label>
                            <p>{profile.address}</p>
                        </div>
                        <div className="detail-group">
                            <label>Bio</label>
                            <p>{profile.bio}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OwnerProfile
