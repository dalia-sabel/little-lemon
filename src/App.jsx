
import { useState } from 'react'
import './App.css'

// Initial list of available booking times
const availableTimes = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
]

// Initialize the available times
export function initializeTimes() {
  return [...availableTimes]
}

// Update available times when a date is selected
export function updateTimes(selectedDate) {
  if (!selectedDate) {
    return initializeTimes()
  }

  // A real booking system would retrieve availability
  // from a backend or booking database.
  return initializeTimes()
}

function App() {
  const [date, setDate] = useState('')
  const [times, setTimes] = useState(initializeTimes)
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('2')
  const [occasion, setOccasion] = useState('Birthday')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const today = new Date().toLocaleDateString('en-CA')

  function handleDateChange(event) {
    const selectedDate = event.target.value

    setDate(selectedDate)
    setTimes(updateTimes(selectedDate))
    setTime('')
    setSuccess(false)

    setErrors((previous) => ({
      ...previous,
      date: '',
      time: '',
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    if (!date) {
      newErrors.date = 'Please select a booking date.'
    } else if (date < today) {
      newErrors.date = 'The booking date cannot be in the past.'
    }

    if (!time) {
      newErrors.time = 'Please select a time.'
    }

    if (
      !guests ||
      Number(guests) < 1 ||
      Number(guests) > 10
    ) {
      newErrors.guests = 'Choose between 1 and 10 guests.'
    }

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.'
    }

    if (
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = 'Please enter a valid email address.'
    }

    setErrors(newErrors)
    setSuccess(false)

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true)
    }
  }

  return (
    <div className="site-wrapper">
      {/* Header */}
      <header className="site-header">
        <a
          className="brand"
          href="#home"
          aria-label="Little Lemon home"
        >
          <span className="lemon-icon" aria-hidden="true">
            🍋
          </span>
          <span>LITTLE LEMON</span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#booking">Reservations</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">
              MEDITERRANEAN FLAVORS
            </p>

            <h1>Little Lemon</h1>
            <h2>Chicago</h2>

            <p className="hero-description">
              We are a family-owned Mediterranean restaurant,
              focused on traditional recipes served with a
              modern twist.
            </p>

            <a className="primary-button" href="#booking">
              Reserve a Table
            </a>
          </div>

          <div
            className="hero-art"
            role="img"
            aria-label="Illustration of fresh Mediterranean food and lemons"
          >
            <span className="art-lemon lemon-one" aria-hidden="true">
              🍋
            </span>

            <span className="art-lemon lemon-two" aria-hidden="true">
              🍋
            </span>

            <div className="food-plate" aria-hidden="true">
              <span>🥗</span>
              <span>🍅</span>
              <span>🫒</span>
            </div>

            <p>Fresh · Seasonal · Mediterranean</p>
          </div>
        </section>

        {/* Reservation form */}
        <section className="booking-section" id="booking">
          <div className="booking-heading">
            <p className="eyebrow">
              YOUR TABLE IS WAITING
            </p>

            <h2>Reserve a table</h2>

            <p>
              Plan your visit. We look forward to welcoming you.
            </p>
          </div>

          <form
            className="booking-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Date */}
            <div className="form-field">
              <label htmlFor="booking-date">
                Choose date
              </label>

              <input
                id="booking-date"
                name="date"
                type="date"
                value={date}
                min={today}
                onChange={handleDateChange}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={
                  errors.date ? 'date-error' : undefined
                }
                required
              />

              {errors.date && (
                <p
                  className="error-message"
                  id="date-error"
                  role="alert"
                >
                  {errors.date}
                </p>
              )}
            </div>

            {/* Time */}
            <div className="form-field">
              <label htmlFor="booking-time">
                Choose time
              </label>

              <select
                id="booking-time"
                name="time"
                value={time}
                onChange={(event) => {
                  setTime(event.target.value)
                  setSuccess(false)

                  setErrors((previous) => ({
                    ...previous,
                    time: '',
                  }))
                }}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={
                  errors.time ? 'time-error' : undefined
                }
                required
              >
                <option value="">Select a time</option>

                {times.map((availableTime) => (
                  <option
                    key={availableTime}
                    value={availableTime}
                  >
                    {availableTime}
                  </option>
                ))}
              </select>

              {errors.time && (
                <p
                  className="error-message"
                  id="time-error"
                  role="alert"
                >
                  {errors.time}
                </p>
              )}
            </div>

            {/* Number of guests */}
            <div className="form-field">
              <label htmlFor="booking-guests">
                Number of guests
              </label>

              <select
                id="booking-guests"
                name="guests"
                value={guests}
                onChange={(event) => {
                  setGuests(event.target.value)
                  setSuccess(false)

                  setErrors((previous) => ({
                    ...previous,
                    guests: '',
                  }))
                }}
                aria-invalid={Boolean(errors.guests)}
                aria-describedby={
                  errors.guests ? 'guests-error' : undefined
                }
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                  (number) => (
                    <option key={number} value={number}>
                      {number}{' '}
                      {number === 1 ? 'guest' : 'guests'}
                    </option>
                  )
                )}
              </select>

              {errors.guests && (
                <p
                  className="error-message"
                  id="guests-error"
                  role="alert"
                >
                  {errors.guests}
                </p>
              )}
            </div>

            {/* Occasion */}
            <div className="form-field">
              <label htmlFor="booking-occasion">
                Occasion
              </label>

              <select
                id="booking-occasion"
                name="occasion"
                value={occasion}
                onChange={(event) => {
                  setOccasion(event.target.value)
                  setSuccess(false)
                }}
              >
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Engagement</option>
                <option>Other</option>
              </select>
            </div>

            {/* Customer name */}
            <div className="form-field">
              <label htmlFor="customer-name">
                Your name
              </label>

              <input
                id="customer-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setSuccess(false)

                  setErrors((previous) => ({
                    ...previous,
                    name: '',
                  }))
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? 'name-error' : undefined
                }
                placeholder="Enter your name"
                required
              />

              {errors.name && (
                <p
                  className="error-message"
                  id="name-error"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-field">
              <label htmlFor="customer-email">
                Email address
              </label>

              <input
                id="customer-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setSuccess(false)

                  setErrors((previous) => ({
                    ...previous,
                    email: '',
                  }))
                }}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? 'email-error' : undefined
                }
                placeholder="you@example.com"
                required
              />

              {errors.email && (
                <p
                  className="error-message"
                  id="email-error"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              className="submit-button"
              type="submit"
            >
              Confirm Reservation
            </button>

            {/* Success message */}
            {success && (
              <div
                className="success-message"
                role="status"
                aria-live="polite"
              >
                <h3>
                  Thank you, {name.trim()}!
                </h3>

                <p>
                  Your reservation details have been validated.
                  This demo does not send a real booking to the
                  restaurant.
                </p>

                <p>
                  {date} at {time} · {guests}{' '}
                  {Number(guests) === 1 ? 'guest' : 'guests'}
                  {' '}· {occasion}
                </p>
              </div>
            )}
          </form>
        </section>

        {/* About */}
        <section className="about-section" id="about">
          <p className="eyebrow">OUR STORY</p>

          <h2>A little taste of the Mediterranean</h2>

          <p>
            At Little Lemon, we bring people together through
            fresh ingredients, comforting recipes, and warm
            hospitality.
          </p>

          <a href="#booking">
            Join us for a meal →
          </a>
        </section>

        {/* Menu */}
        <section className="menu-note" id="menu">
          <h2>Good food. Good company.</h2>

          <p>
            Discover your next favorite Mediterranean meal at
            Little Lemon.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <a
          className="brand footer-brand"
          href="#home"
        >
          <span aria-hidden="true">🍋</span>
          LITTLE LEMON
        </a>

        <p>Fresh flavors, warm welcomes.</p>

        <p>
          © {new Date().getFullYear()} Little Lemon Restaurant
        </p>
      </footer>
    </div>
  )
}

export default App
