import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Textarea from './Textarea'
import styles from './Textarea.module.css'

describe('Textarea Component', () => {
  it('отображает текстовое поле с пустым значением по умолчанию', () => {
    render(<Textarea />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea.value).toBe('')
  })

  it('отображает переданное значение', () => {
    const testValue = 'Test text'
    render(<Textarea value={testValue} />)
    expect(screen.getByRole('textbox').value).toBe(testValue)
  })

  it('вызывает onChange при вводе текста', () => {
    const mockOnChange = vi.fn()
    render(<Textarea onChange={mockOnChange} />)

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'new text' } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(textarea.value).toBe('new text')
  })

  it('не вызывает onChange в disabled состоянии', () => {
    const mockOnChange = vi.fn()
    render(<Textarea disabled={true} onChange={mockOnChange} />)

    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'try to change' } })

    expect(mockOnChange).not.toHaveBeenCalled()
    expect(textarea.value).toBe('')
  })

  it('отображает сообщение об ошибке', () => {
    const errorMessage = 'Error message'
    render(<Textarea error={errorMessage} />)

    const errorElement = screen.getByText(errorMessage)
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveClass(styles.errorText)
  })

  it('применяет правильные классы для разных состояний', () => {
    const { rerender } = render(<Textarea state='default' />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass(styles.default)

    rerender(<Textarea state='filled' />)
    expect(textarea).toHaveClass(styles.filled)

    rerender(<Textarea state='disabled' />)
    expect(textarea).toHaveClass(styles.disabled)

    rerender(<Textarea state='error' />)
    expect(textarea).toHaveClass(styles.error)
  })
})
