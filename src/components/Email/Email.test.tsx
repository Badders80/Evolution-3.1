import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Email } from './Email'

describe('Email Component', () => {
  it('should render email input and button', () => {
    render(<Email />)
    
    const emailInput = screen.getByPlaceholderText(/email address/i)
    const submitButton = screen.getByRole('button', { name: /request access/i })
    
    expect(emailInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('should handle email input change', () => {
    render(<Email />)
    
    const emailInput = screen.getByPlaceholderText(/email address/i) as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    expect(emailInput.value).toBe('test@example.com')
  })

  it('should show success message when submitting valid email', async () => {
    // Mock the API call
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })
    global.fetch = mockFetch

    render(<Email />)
    
    const emailInput = screen.getByPlaceholderText(/email address/i)
    const submitButton = screen.getByRole('button', { name: /request access/i })
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)
    
    const successMessage = await screen.findByText(/access request logged/i)
    expect(successMessage).toBeInTheDocument()
  })
})
