import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SelectMenu from './SelectMenu'

describe('SelectMenu Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  it('отображает список опций', () => {
    render(<SelectMenu options={mockOptions} placeholder='Select an option' />)

    expect(screen.getByText('Select an option')).toBeInTheDocument()
    mockOptions.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('вызывает onChange при выборе опции', () => {
    const mockOnChange = vi.fn()
    render(<SelectMenu options={mockOptions} onChange={mockOnChange} />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'option2' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(select.value).toBe('option2')
  })

  it('отображает состояние disabled', () => {
    render(<SelectMenu options={mockOptions} disabled={true} />)

    const select = screen.getByRole('combobox')
    expect(select).toBeDisabled()
    expect(select).toHaveAttribute('disabled')
  })

  it('отображает ошибку при error=true', () => {
    const errorMessage = 'This field is required'
    render(
      <SelectMenu
        options={mockOptions}
        error={true}
        errorMessage={errorMessage}
      />
    )

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
    const errorDiv = screen.getByText(errorMessage).parentElement
    expect(errorDiv).toContainHTML(errorMessage)
  })
})
