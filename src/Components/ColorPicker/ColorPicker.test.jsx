import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ColorPicker from './ColorPicker'
import styles from './ColorPicker.module.css'
import { vi } from 'vitest'

describe('ColorPicker Component', () => {
  const mockOnChange = vi.fn()
  const defaultProps = {
    defaultColor: '#3a86ff',
    label: 'Select color',
    onChange: mockOnChange,
    presetColors: ['#3a86ff', '#8338ec', '#ff006e']
  }

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  // Basic rendering
  it('renders with default props', () => {
    render(<ColorPicker {...defaultProps} />)
    expect(screen.getByText('Select color')).toBeInTheDocument()
    expect(screen.getByText('#3A86FF')).toBeInTheDocument()
  })

  // Color preview
  it('displays correct color preview', () => {
    render(<ColorPicker {...defaultProps} defaultColor='#ff0000' />)
    const preview = screen.getByText('#FF0000')
    expect(preview).toHaveStyle('background-color: #ff0000')
  })

  // Toggle dropdown
  it('opens and closes dropdown on trigger click', async () => {
    const user = userEvent.setup()
    render(<ColorPicker {...defaultProps} />)

    // Получаем триггер по aria-label
    const trigger = screen.getByLabelText('Select color')

    // Open dropdown
    await user.click(trigger)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    // Close dropdown
    await user.click(trigger)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  // Color input
  it('updates color via color input', async () => {
    const user = userEvent.setup()
    render(<ColorPicker {...defaultProps} />)

    await user.click(screen.getByLabelText('Select color'))
    const colorInput = screen.getByLabelText('Color picker')
    fireEvent.change(colorInput, { target: { value: '#00ff00' } })
    expect(mockOnChange).toHaveBeenCalledWith('#00ff00')
  })

  // Preset colors
  it('selects preset color', async () => {
    const user = userEvent.setup()
    render(<ColorPicker {...defaultProps} />)

    await user.click(screen.getByLabelText('Select color'))
    const presetButton = screen.getByLabelText('Select color #8338ec')
    await user.click(presetButton)

    expect(mockOnChange).toHaveBeenCalledWith('#8338ec')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  // Disabled state
  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(<ColorPicker {...defaultProps} disabled />)

    await user.click(screen.getByLabelText('Select color'))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('applies disabled styles', () => {
    render(<ColorPicker {...defaultProps} disabled />)
    const trigger = screen.getByLabelText('Select color')
    expect(trigger).toHaveClass(styles.disabled)
  })

  // State variants
  it('applies active state styles', async () => {
    const user = userEvent.setup()
    render(<ColorPicker {...defaultProps} state='active' />)
    const trigger = screen.getByLabelText('Select color')

    // Click to activate the trigger
    await user.click(trigger)
    expect(trigger).toHaveClass(styles.active)
  })

  // Custom class
  it('accepts custom className', () => {
    const { container } = render(
      <ColorPicker {...defaultProps} className='custom-class' />
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  // Default color update
  it('updates when defaultColor prop changes', () => {
    const { rerender } = render(<ColorPicker {...defaultProps} />)
    expect(screen.getByText('#3A86FF')).toBeInTheDocument()

    rerender(<ColorPicker {...defaultProps} defaultColor='#ff0000' />)
    expect(screen.getByText('#FF0000')).toBeInTheDocument()
  })
})
