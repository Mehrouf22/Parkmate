import React, { useEffect, useState } from 'react'
import './Userprof.scss'

const LOT_KEYS = [
  { key: 'parkmate_lot1_slots', label: 'Lot 1' },
  { key: 'parkmate_lot2_slots', label: 'Lot 2' },
  { key: 'parkmate_lot3_slots', label: 'Lot 3' },
]

function clientId() {
  const KEY = 'parkmate_client_id'
  try {
    let id = localStorage.getItem(KEY)
    if (!id) {
      id = 'c-' + Math.random().toString(36).slice(2, 10)
      localStorage.setItem(KEY, id)
    }
    return id
  } catch (e) {
    return 'c-unknown'
  }
}

function formatDate(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return d.toLocaleString()
}

export default function Userprof() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const id = clientId()
    const all = []
    LOT_KEYS.forEach((lot, idx) => {
      try {
        const raw = localStorage.getItem(lot.key)
        if (!raw) return
        const arr = JSON.parse(raw)
        arr.forEach((s) => {
          if (s && s.bookedAt) {
            all.push({
              lot: lot.label,
              lotIndex: idx + 1,
              slot: s.id,
              bookedAt: s.bookedAt,
              bookedBy: s.bookedBy || null,
            })
          }
        })
      } catch (e) {}
    })

    // sort by bookedAt desc
    all.sort((a, b) => b.bookedAt - a.bookedAt)
    setBookings(all.map((b) => ({ ...b, owner: b.bookedBy === id ? 'you' : 'other' })))
  }, [])

  return (
    <div className="userprof-root">
      <h2>Your Profile</h2>
      <p className="muted">Shows your current bookings and recent bookings by others.</p>

      <section className="your-bookings">
        <h3>Your Bookings</h3>
        <div className="cards">
          {bookings.filter((b) => b.owner === 'you').length === 0 && <div className="empty">No bookings yet.</div>}
          {bookings
            .filter((b) => b.owner === 'you')
            .map((b) => (
              <div className="card you" key={`${b.lot}-${b.slot}`}>
                <div className="card-left">
                  <div className="lot-label">{b.lot}</div>
                  <div className="slot-label">Slot #{b.slot}</div>
                </div>
                <div className="card-right">
                  <div className="time">{formatDate(b.bookedAt)}</div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="other-bookings">
        <h3>Other Bookings (recent)</h3>
        <div className="cards">
          {bookings.filter((b) => b.owner === 'other').length === 0 && <div className="empty">No other bookings.</div>}
          {bookings
            .filter((b) => b.owner === 'other')
            .map((b) => (
              <div className="card other" key={`${b.lot}-${b.slot}`}>
                <div className="card-left">
                  <div className="lot-label">{b.lot}</div>
                  <div className="slot-label">Slot #{b.slot}</div>
                </div>
                <div className="card-right">
                  <div className="time">{formatDate(b.bookedAt)}</div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
