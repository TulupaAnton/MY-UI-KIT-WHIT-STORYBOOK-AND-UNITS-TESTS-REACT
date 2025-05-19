import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Input from './Input'

// Mock CSS module
vi.mock('./Input.module.css', () => ({
  default: {
    inputWrapper: 'inputWrapper',
    input: 'input',
    default: 'default',
    filled: 'filled',
    active: 'active',
    error: 'error',
    disabled: 'disabled',
    errorText: 'errorText'
  }
}))

describe('Input Component', () => {
  const mockOnChange = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default state', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('default')
    expect(input).not.toHaveClass('error')
    expect(input).not.toHaveClass('disabled')
  })

  it('handles value changes', () => {
    render(<Input onChange={mockOnChange} />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('shows disabled state', () => {
    render(<Input disabled={true} />)
    const input = screen.getByRole('textbox')

    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled')
  })

  it('shows error state', () => {
    const errorMessage = 'Test error'
    render(<Input error={errorMessage} />)
    const input = screen.getByRole('textbox')
    const errorText = screen.getByText(errorMessage)

    expect(input).toHaveClass('error')
    expect(errorText).toHaveClass('errorText')
  })

  it('handles focus/blur events', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    fireEvent.focus(input)
    expect(input).toHaveClass('active')

    fireEvent.blur(input)
    expect(input).not.toHaveClass('active')
  })

  it('shows filled state when readOnly', () => {
    render(<Input readOnly={true} value='Test value' />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveClass('filled')
    expect(input).toHaveValue('Test value')
  })
})
