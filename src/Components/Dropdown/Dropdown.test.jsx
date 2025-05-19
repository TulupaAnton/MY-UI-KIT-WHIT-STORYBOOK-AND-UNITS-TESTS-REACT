import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Dropdown from './Dropdown'

vi.mock('./Dropdown.module.css', () => ({
  default: {
    dropdownContainer: 'dropdownContainer',
    dropdownButton: 'dropdownButton',
    open: 'open',
    disabled: 'disabled',
    error: 'error',
    selectedValue: 'selectedValue',
    arrow: 'arrow',
    rotated: 'rotated',
    errorMessage: 'errorMessage',
    dropdownMenu: 'dropdownMenu',
    visible: 'visible',
    dropdownItem: 'dropdownItem',
    selected: 'selected',
    hovered: 'hovered'
  }
}))

describe('Dropdown Component', () => {
  const mockItems = ['Option 1', 'Option 2', 'Option 3']
  const mockOnSelect = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders with default state', () => {
    render(<Dropdown items={mockItems} />)
    expect(screen.getByText('Select an option')).toBeInTheDocument()
    expect(screen.getByRole('listbox').parentElement).not.toHaveClass('visible')
  })

  it('toggles dropdown visibility on click', () => {
    render(<Dropdown items={mockItems} />)
    const button = screen.getByRole('button')
    const menu = screen.getByRole('listbox').parentElement

    // Open
    fireEvent.click(button)
    expect(menu).toHaveClass('visible')

    // Close
    fireEvent.click(button)
    expect(menu).not.toHaveClass('visible')
  })

  it('selects item and closes dropdown', () => {
    render(<Dropdown items={mockItems} onSelect={mockOnSelect} />)
    const button = screen.getByRole('button')
    const menu = screen.getByRole('listbox').parentElement

    fireEvent.click(button)
    fireEvent.click(screen.getByText('Option 2'))

    expect(mockOnSelect).toHaveBeenCalledWith('Option 2')
    expect(button).toHaveTextContent('Option 2')
    expect(menu).not.toHaveClass('visible')
  })

  it('handles disabled state', () => {
    render(<Dropdown items={mockItems} disabled={true} />)
    const button = screen.getByRole('button')
    const menu = screen.getByRole('listbox').parentElement

    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled')

    fireEvent.click(button)
    expect(menu).not.toHaveClass('visible')
  })

  it('shows error state', () => {
    render(
      <Dropdown items={mockItems} error={true} errorMessage='Test error' />
    )

    expect(screen.getByRole('button')).toHaveClass('error')
    expect(screen.getByText('Test error')).toHaveClass('errorMessage')
  })
})
