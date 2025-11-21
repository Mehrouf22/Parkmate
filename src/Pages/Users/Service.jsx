import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Service.scss'

const DEFAULT_SERVICES = [
  { id: 'interior', title: 'Interior Wash', desc: 'Thorough vacuuming, wipe down, and interior detailing.', price: 500 },
  { id: 'exterior', title: 'Exterior Wash', desc: 'Exterior shampoo, wheel clean and rim shine.', price: 300 },
  { id: 'full', title: 'Full Wash', desc: 'Interior + Exterior combo for a complete clean.', price: 750 },
]

function getClientId() {
  try {
    const KEY = 'parkmate_client_id'
    let id = localStorage.getItem(KEY)
    if (!id) {
      id = 'c-' + Math.random().toString(36).slice(2, 10)
      localStorage.setItem(KEY, id)
    }
    return id
  } catch (e) { return 'c-unknown' }
}

export default function Service() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const suggestedLot = params.get('lot')

  const [bookings, setBookings] = useState([])
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [services, setServices] = useState(DEFAULT_SERVICES)

  useEffect(() => {
    const stored = localStorage.getItem('parkmate_services_config')
    if (stored) {
      setServices(JSON.parse(stored))
      setSelectedService(JSON.parse(stored)[0]?.id)
    } else {
      setSelectedService(DEFAULT_SERVICES[0].id)
    }
  }, [])

  useEffect(() => {
    const id = getClientId()
    const keys = [
      { key: 'parkmate_lot1_slots', label: 'Lot 1', idx: 1 },
      { key: 'parkmate_lot2_slots', label: 'Lot 2', idx: 2 },
      { key: 'parkmate_lot3_slots', label: 'Lot 3', idx: 3 },
    ]
    const all = []
    keys.forEach((k) => {
      try {
        const raw = localStorage.getItem(k.key)
        if (!raw) return
        const arr = JSON.parse(raw)
        arr.forEach((s) => {
          if (s && s.bookedBy === id) {
            all.push({ lot: k.label, lotIndex: k.idx, slot: s.id, bookedAt: s.bookedAt })
          }
        })
      } catch (e) { }
    })
    setBookings(all)
    if (all.length === 1) setSelectedBooking(all[0])
    else if (suggestedLot) {
      const found = all.find((b) => String(b.lotIndex) === String(suggestedLot))
      if (found) setSelectedBooking(found)
    }
  }, [suggestedLot])

  const bookService = () => {
    if (!selectedBooking) return alert('Select a booking first')
    const svc = services.find((s) => s.id === selectedService)
    if (!svc) return

    const item = {
      id: 's-' + Math.random().toString(36).slice(2, 9),
      lotIndex: selectedBooking.lotIndex,
      lot: selectedBooking.lot,
      slot: selectedBooking.slot,
      service: svc.id,
      serviceTitle: svc.title,
      bookedAt: Date.now(),
      bookedBy: getClientId(),
    }

    try {
      const raw = localStorage.getItem('parkmate_services')
      const arr = raw ? JSON.parse(raw) : []
      arr.push(item)
      localStorage.setItem('parkmate_services', JSON.stringify(arr))
    } catch (e) { }

    alert(`Service '${svc.title}' booked for ${selectedBooking.lot} slot #${selectedBooking.slot}`)
    navigate('/profile')
  }

  if (bookings.length === 0) {
    return (
      <div className="service-root container">
        <h2>Services</h2>
        <p className="muted">No active bookings found. You can only book services after booking a slot.</p>
      </div>
    )
  }

  return (
    <div className="service-root container">
      <h2>Car Care Services</h2>
      <p className="muted">Choose a booking and the service you'd like. We offer quick interior, exterior and full washes.</p>

      <div className="service-grid">
        <div className="bookings-list">
          <h4>Your Bookings</h4>
          {bookings.map((b) => (
            <label key={`${b.lot}-${b.slot}`} className={`booking-item ${selectedBooking && selectedBooking.slot === b.slot ? 'active' : ''}`}>
              <input type="radio" name="booking" checked={selectedBooking && selectedBooking.slot === b.slot} onChange={() => setSelectedBooking(b)} />
              <div>
                <div className="b-lot">{b.lot} — Slot #{b.slot}</div>
                <div className="b-time">{new Date(b.bookedAt).toLocaleString()}</div>
              </div>
            </label>
          ))}
        </div>

        <div className="services-list">
          <h4>Available Services</h4>
          <div className="cards">
            {services.map((s) => (
              <div key={s.id} className={`svc-card ${selectedService === s.id ? 'selected' : ''}`} onClick={() => setSelectedService(s.id)}>
                <div className="svc-title">{s.title}</div>
                <div className="svc-desc">{s.desc}</div>
                <div className="svc-price">₹{s.price}</div>
                <div className="svc-choose">{selectedService === s.id ? 'Selected' : 'Choose'}</div>
              </div>
            ))}
          </div>

          <div className="svc-actions">
            <button className="btn primary" onClick={bookService}>Book Service</button>
            <button className="btn ghost" onClick={() => navigate('/lots')}>Back to Lots</button>
          </div>
        </div>
      </div>
    </div>
  )
}

