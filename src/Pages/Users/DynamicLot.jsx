import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useData } from '../../Context/DataContext';
import './Lot1.scss';

const ONE_HOUR_MS = 60 * 60 * 1000;
const CONFIG_KEY = 'parkmate_lots_config';

function formatRemaining(ms) {
    if (ms <= 0) return '00:00:00';
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

const DynamicLot = () => {
    const { lotId } = useParams();
    const { user } = useAuth();
    const { addBooking } = useData();
    const STORAGE_KEY = `parkmate_lot${lotId}_slots`;

    const [lotInfo, setLotInfo] = useState(null);
    const [slots, setSlots] = useState([]);
    const [selected, setSelected] = useState(null);
    const [payment, setPayment] = useState('card');
    const [vehicleType, setVehicleType] = useState('Hatchback');
    const [now, setNow] = useState(Date.now());
    const timeoutsRef = useRef({});

    // Load lot info and initialize slots
    useEffect(() => {
        const loadLotInfo = () => {
            try {
                const configRaw = localStorage.getItem(CONFIG_KEY);
                if (configRaw) {
                    const lots = JSON.parse(configRaw);
                    const lot = lots.find((l) => l.id === parseInt(lotId));
                    if (lot) {
                        setLotInfo(lot);
                        // Initialize slots based on totalSlots
                        const total = lot.totalSlots || 10;
                        setSlots(Array.from({ length: total }).map((_, i) => ({
                            id: i + 1,
                            status: 'available',
                            bookedAt: null
                        })));
                    }
                }
            } catch (e) {
                console.error('Error loading lot info:', e);
            }
        };

        loadLotInfo();

        // Listen for config changes
        const handler = () => loadLotInfo();
        window.addEventListener('lotConfigChanged', handler);
        return () => window.removeEventListener('lotConfigChanged', handler);
    }, [lotId]);

    const hasAnyBooking = slots.some((s) => !!s.bookedAt);

    // Clock tick
    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(t);
    }, []);

    // Persist slots
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
        } catch (e) { }
    }, [slots, STORAGE_KEY]);

    // Manage automatic release
    useEffect(() => {
        Object.values(timeoutsRef.current).forEach((id) => clearTimeout(id));
        timeoutsRef.current = {};

        slots.forEach((s) => {
            if (s.bookedAt) {
                const elapsed = Date.now() - s.bookedAt;
                const remaining = ONE_HOUR_MS - elapsed;
                if (remaining <= 0) {
                    releaseSlot(s.id);
                } else {
                    const to = setTimeout(() => {
                        releaseSlot(s.id);
                        notify(`Booking ended for slot #${s.id}`);
                    }, remaining);
                    timeoutsRef.current[s.id] = to;
                }
            }
        });

        return () => {
            Object.values(timeoutsRef.current).forEach((id) => clearTimeout(id));
            timeoutsRef.current = {};
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slots]);

    const selectSlot = (id) => {
        const s = slots.find((x) => x.id === id);
        if (!s || s.status === 'booked') return;
        setSelected(id);
    };

    const notify = (text) => {
        try {
            if (window.Notification && Notification.permission === 'granted') {
                new Notification('PARKMATE', { body: text });
            } else if (window.Notification && Notification.permission !== 'denied') {
                Notification.requestPermission().then((p) => {
                    if (p === 'granted') new Notification('PARKMATE', { body: text });
                    else alert(text);
                });
            } else {
                alert(text);
            }
        } catch (e) {
            alert(text);
        }
    };

    const getClientId = () => {
        const KEY = 'parkmate_client_id';
        try {
            let id = localStorage.getItem(KEY);
            if (!id) {
                id = 'c-' + Math.random().toString(36).slice(2, 10);
                localStorage.setItem(KEY, id);
            }
            return id;
        } catch (e) {
            return 'c-unknown';
        }
    };

    const clientBookedSlot = () => {
        try {
            const cid = getClientId();
            return slots.find((s) => s.bookedBy === cid) || null;
        } catch (e) {
            return null;
        }
    };

    const bookSlot = () => {
        if (!selected) return alert('Please select a slot first');
        const slot = slots.find((s) => s.id === selected);
        if (!slot || slot.status === 'booked') return alert('Slot already booked');
        const ok = window.confirm(`Confirm booking for ${vehicleType} in slot #${selected} using ${payment}?`);
        if (!ok) return;
        const bookedAt = Date.now();
        const clientId = getClientId();

        // Update local slots state
        setSlots((prev) =>
            prev.map((s) => (s.id === selected ? { ...s, status: 'booked', bookedAt, bookedBy: clientId, vehicleType } : s))
        );

        // Add to global DataContext for Admin visibility
        addBooking({
            userId: user ? user.id : 'guest',
            userName: user ? user.name : 'Guest User',
            lotName: lotInfo.name,
            date: new Date().toLocaleDateString(),
            slotId: selected,
            vehicleType,
            paymentMethod: payment
        });

        setSelected(null);
        notify(`Slot #${selected} booked for 1 hour.`);
    };

    const releaseSlot = (id) => {
        setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, status: 'available', bookedAt: null } : s)));
        if (timeoutsRef.current[id]) {
            clearTimeout(timeoutsRef.current[id]);
            delete timeoutsRef.current[id];
        }
    };

    const resetBookings = () => {
        if (!window.confirm(`Reset all bookings for ${lotInfo?.name || 'this lot'}?`)) return;
        const fresh = Array.from({ length: slots.length }).map((_, i) => ({ id: i + 1, status: 'available', bookedAt: null }));
        setSlots(fresh);
        setSelected(null);
    };

    if (!lotInfo) {
        return <div className="lot1-demo lot1-root"><h1>Loading lot information...</h1></div>;
    }

    return (
        <div className="lot1-demo lot1-root">
            <h1>{lotInfo.name} — Book a Slot</h1>
            <p style={{ color: '#666', marginTop: '-10px' }}>📍 {lotInfo.location}</p>

            <div className="pricing-card">
                <div className="price-header">Parking Rate</div>
                <div className="price-amount">₹50 <span className="per-slot">/ slot</span></div>
                <div className="price-info">Hourly Rate</div>
            </div>

            <p className="lot-desc">Select an available slot below. Bookings last 1 hour and will expire automatically.</p>

            <div className="slots-grid">
                {slots.map((s) => {
                    const remaining = s.bookedAt ? ONE_HOUR_MS - (now - s.bookedAt) : null;
                    return (
                        <button
                            key={s.id}
                            className={`slot ${s.bookedAt ? 'booked' : 'available'} ${selected === s.id ? 'selected' : ''}`}
                            onClick={() => selectSlot(s.id)}
                            disabled={!!s.bookedAt}
                        >
                            <div className="slot-id">#{s.id}</div>
                            <div className="slot-state">{s.bookedAt ? `Booked — ${formatRemaining(remaining)}` : 'Available'}</div>
                        </button>
                    );
                })}
            </div>

            <div className="controls">
                <div className="vehicle-choice">
                    <label>Vehicle Type</label>
                    <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Three Wheeler">Three Wheeler</option>
                        <option value="Two Wheeler">Two Wheeler</option>
                    </select>
                </div>

                <div className="payment-choice">
                    <label>
                        <input type="radio" name="pay" value="card" checked={payment === 'card'} onChange={() => setPayment('card')} /> Card
                    </label>
                    <label>
                        <input type="radio" name="pay" value="wallet" checked={payment === 'wallet'} onChange={() => setPayment('wallet')} /> Wallet
                    </label>
                    <label>
                        <input type="radio" name="pay" value="cash" checked={payment === 'cash'} onChange={() => setPayment('cash')} /> Cash
                    </label>
                </div>

                <div className="actions">
                    <button className="btn primary" onClick={bookSlot}>Book Selected Slot</button>
                    <button className="btn ghost" onClick={resetBookings}>Reset</button>
                    {hasAnyBooking && (
                        <Link to="/profile" className="btn ghost" style={{ marginLeft: 8 }}>Profile</Link>
                    )}
                    {clientBookedSlot() && (
                        <Link to={`/service?lot=${lotId}`} className="btn primary" style={{ marginLeft: 8 }}>Book Service</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DynamicLot;
