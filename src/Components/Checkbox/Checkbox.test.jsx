import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Checkbox from './Checkbox'
import styles from './Checkbox.module.css'

describe('Checkbox Component', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  // Renders
  it('renders checkbox with label', () => {
    render(<Checkbox label='Test Checkbox' />)
    expect(screen.getByText('Test Checkbox')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  // Checked State
  it('displays checked state when checked prop is true', () => {
    render(<Checkbox checked={true} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
    expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument()
  })

  // Unchecked State
  it('displays unchecked state when checked prop is false', () => {
    render(<Checkbox checked={false} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    expect(screen.getByRole('checkbox', { checked: false })).toBeInTheDocument()
  })

  // Change Handler
  it('calls onChange when clicked', async () => {
    const user = userEvent.setup()
    render(<Checkbox onChange={mockOnChange} />)

    await user.click(screen.getByRole('checkbox'))
    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange).toHaveBeenCalledWith(true)
  })

  // Disabled State
  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup()
    render(<Checkbox disabled onChange={mockOnChange} />)

    await user.click(screen.getByRole('checkbox'))
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('has disabled styles when disabled', () => {
    const { container } = render(<Checkbox disabled />)
    const wrapper = container.querySelector(`.${styles.checkboxWrapper}`)
    expect(wrapper).toHaveClass(styles.disabled)
  })

  // Error State
  it('shows error message when error prop is provided', () => {
    const errorText = 'This field is required'
    render(<Checkbox error={errorText} />)
    expect(screen.getByText(errorText)).toBeInTheDocument()
    expect(screen.getByText(errorText)).toHaveClass(styles.errorText)
  })

  it('applies error styles when error prop is provided', () => {
    const { container } = render(<Checkbox error='Error' />)
    const checkbox = container.querySelector(`.${styles.customCheckbox}`)
    expect(checkbox).toHaveClass(styles.error)
  })

  // Label
  it('does not render label when label prop is empty', () => {
    const { container } = render(<Checkbox label='' />)
    expect(container.querySelector(`.${styles.label}`)).toBeNull()
  })

  // Custom Props
  it('passes additional props to input element', () => {
    render(<Checkbox id='test-checkbox' />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'test-checkbox')
  })
})
