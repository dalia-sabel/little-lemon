import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App, { initializeTimes, updateTimes } from './App'

describe('Booking times', () => {
  it('returns the initial list of available times', () => {
    const times = initializeTimes()

    expect(times).toHaveLength(9)
    expect(times).toContain('17:00')
    expect(times).toContain('19:00')
    expect(times).toContain('21:00')
  })

  it('returns times when a date is selected', () => {
    const times = updateTimes('2026-10-20')

    expect(times).toHaveLength(9)
    expect(times).toContain('17:00')
    expect(times).toContain('21:00')
  })

  it('returns initial times when no date is selected', () => {
    expect(updateTimes('')).toHaveLength(9)
  })

  it('returns a new list without modifying the original', () => {
    const firstList = initializeTimes()
    const secondList = initializeTimes()

    expect(firstList).not.toBe(secondList)
    expect(firstList).toEqual(secondList)
  })
})

describe('Booking form', () => {
  it('renders all booking fields', () => {
    render(<App />)

    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', () => {
    render(<App />)

    fireEvent.click(
      screen.getByRole('button', { name: /confirm reservation/i })
    )

    expect(screen.getByText('Please select a booking date.')).toBeInTheDocument()
    expect(screen.getByText('Please select a time.')).toBeInTheDocument()
    expect(screen.getByText('Please enter your name.')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
  })

  it('shows an error for an invalid email address', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: '2026-12-20' },
    })

    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: '18:00' },
    })

    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'Dalia' },
    })

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'invalid-email' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: /confirm reservation/i })
    )

    expect(
      screen.getByText('Please enter a valid email address.')
    ).toBeInTheDocument()
  })

  it('shows a confirmation for valid booking details', () => {
    render(<App />)

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: '2026-12-20' },
    })

    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: '18:00' },
    })

    fireEvent.change(screen.getByLabelText(/your name/i), {
      target: { value: 'Dalia' },
    })

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'dalia@example.com' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: /confirm reservation/i })
    )

    expect(
      screen.getByRole('status')
    ).toHaveTextContent('Thank you, Dalia!')

    expect(screen.getByRole('status')).toHaveTextContent('18:00')
  })
})
