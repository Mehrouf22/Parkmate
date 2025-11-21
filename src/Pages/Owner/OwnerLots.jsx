import React, { useState, useEffect } from 'react';
import './Owner.scss';

const OwnerLots = () => {
    const [lots, setLots] = useState([
        { id: 1, name: 'Lot 1', totalSlots: 10, location: 'Main Street' },
        { id: 2, name: 'Lot 2', totalSlots: 10, location: 'Downtown' },
        { id: 3, name: 'Lot 3', totalSlots: 10, location: 'Airport Road' },
    ]);
    const [editingLot, setEditingLot] = useState(null);
    const [editingField, setEditingField] = useState(null);

    // Load persisted configuration on mount
    useEffect(() => {
        const stored = localStorage.getItem('parkmate_lots_config');
        if (stored) {
            setLots(JSON.parse(stored));
        }
    }, []);

    const addLot = () => {
        const newId = lots.length > 0 ? Math.max(...lots.map(l => l.id)) + 1 : 1;
        const newLot = {
            id: newId,
            name: `Lot ${newId}`,
            totalSlots: 10,
            location: 'New Location'
        };
        setLots([...lots, newLot]);
    };

    const deleteLot = (id) => {
        if (window.confirm('Are you sure you want to delete this lot? This action cannot be undone.')) {
            setLots(lots.filter(lot => lot.id !== id));
        }
    };

    const updateSlots = (id, delta) => {
        const newLots = lots.map(lot => {
            if (lot.id === id) {
                const newTotal = Math.max(1, lot.totalSlots + delta);
                return { ...lot, totalSlots: newTotal };
            }
            return lot;
        });
        setLots(newLots);
    };

    const updateLotDetails = (id, field, value) => {
        const newLots = lots.map(lot =>
            lot.id === id ? { ...lot, [field]: value } : lot
        );
        setLots(newLots);
    };

    const applyChanges = () => {
        localStorage.setItem('parkmate_lots_config', JSON.stringify(lots));
        window.dispatchEvent(new Event('lotConfigChanged'));
        alert('✅ Changes saved successfully!');
    };

    return (
        <div className="owner-lots">
            <div className="lots-header">
                <div>
                    <h1>🅿️ My Parking Lots</h1>
                    <p className="subtitle">Manage your parking lot configurations and availability</p>
                </div>
                <button className="btn-add-lot" onClick={addLot}>
                    <span className="icon">+</span>
                    Add New Lot
                </button>
            </div>

            <div className="lots-grid">
                {lots.map(lot => (
                    <div key={lot.id} className="lot-card-modern">
                        <div className="lot-card-header">
                            <div className="lot-icon">🅿️</div>
                            <div className="lot-title-section">
                                {editingLot === lot.id && editingField === 'name' ? (
                                    <input
                                        type="text"
                                        className="edit-input-title"
                                        value={lot.name}
                                        onChange={e => updateLotDetails(lot.id, 'name', e.target.value)}
                                        onBlur={() => { setEditingLot(null); setEditingField(null); }}
                                        autoFocus
                                    />
                                ) : (
                                    <h3
                                        className="lot-name"
                                        onClick={() => { setEditingLot(lot.id); setEditingField('name'); }}
                                    >
                                        {lot.name}
                                        <span className="edit-icon">✏️</span>
                                    </h3>
                                )}

                                {editingLot === lot.id && editingField === 'location' ? (
                                    <input
                                        type="text"
                                        className="edit-input-location"
                                        value={lot.location}
                                        onChange={e => updateLotDetails(lot.id, 'location', e.target.value)}
                                        onBlur={() => { setEditingLot(null); setEditingField(null); }}
                                        autoFocus
                                    />
                                ) : (
                                    <p
                                        className="lot-location"
                                        onClick={() => { setEditingLot(lot.id); setEditingField('location'); }}
                                    >
                                        📍 {lot.location}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="lot-stats-section">
                            <div className="stat-box">
                                <label>Total Slots</label>
                                <div className="slot-counter">
                                    <button
                                        className="counter-btn decrease"
                                        onClick={() => updateSlots(lot.id, -1)}
                                    >
                                        −
                                    </button>
                                    <span className="counter-value">{lot.totalSlots}</span>
                                    <button
                                        className="counter-btn increase"
                                        onClick={() => updateSlots(lot.id, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="stat-box">
                                <label>Occupancy</label>
                                <div className="occupancy-display">
                                    <span className="occupied">0</span>
                                    <span className="separator">/</span>
                                    <span className="total">{lot.totalSlots}</span>
                                </div>
                                <div className="occupancy-bar">
                                    <div className="occupancy-fill" style={{ width: '0%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="lot-card-actions">
                            <button className="btn-manage">
                                <span className="btn-icon">⚙️</span>
                                Manage Slots
                            </button>
                            <button
                                className="btn-delete"
                                onClick={() => deleteLot(lot.id)}
                            >
                                <span className="btn-icon">🗑️</span>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="save-section">
                <button className="btn-save-changes" onClick={applyChanges}>
                    <span className="save-icon">💾</span>
                    Save All Changes
                </button>
                <p className="save-hint">Changes will be applied to all user-facing pages</p>
            </div>
        </div>
    );
};

export default OwnerLots;