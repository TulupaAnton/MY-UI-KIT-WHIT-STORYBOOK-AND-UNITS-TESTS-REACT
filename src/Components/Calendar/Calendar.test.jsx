import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Calendar from './Calendar'
import {
  format,
  isToday,
  isSameDay,
  startOfMonth,
  addMonths,
  subMonths
} from 'date-fns'
import { vi } from 'vitest'

// Мок для date-fns
vi.mock('date-fns', async () => {
  const actual = await vi.importActual('date-fns')
  return {
    ...actual,
    isToday: vi.fn(),
    isSameDay: vi.fn()
  }
})

describe('Calendar Component', () => {
  const currentDate = new Date()
  const mockOnDateSelect = vi.fn()
  const formattedDate = format(currentDate, 'MMMM d, yyyy')
  const formattedMonth = format(currentDate, 'MMMM yyyy')
  const nextMonth = format(addMonths(currentDate, 1), 'MMMM yyyy')
  const prevMonth = format(subMonths(currentDate, 1), 'MMMM yyyy')

  beforeEach(() => {
    mockOnDateSelect.mockClear()
    vi.mocked(isToday).mockImplementation(date => isSameDay(date, currentDate))
    vi.mocked(isSameDay).mockImplementation(
      (date1, date2) =>
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    )
  })

  it('renders trigger button with current date', () => {
    // Кнопка
    render(<Calendar value={currentDate} />)
    expect(screen.getByRole('button')).toHaveTextContent(formattedDate)
  })

  it('opens calendar when trigger button is clicked', async () => {
    // Открытие
    const user = userEvent.setup()
    render(<Calendar value={currentDate} />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByText(formattedMonth)).toBeInTheDocument()
  })

  it('navigates to next month when next button is clicked', async () => {
    // Вперёд
    const user = userEvent.setup()
    render(<Calendar value={currentDate} />)

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('→'))

    expect(screen.getByText(nextMonth)).toBeInTheDocument()
  })

  it('navigates to previous month when prev button is clicked', async () => {
    // Назад
    const user = userEvent.setup()
    render(<Calendar value={currentDate} />)

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText('←'))

    expect(screen.getByText(prevMonth)).toBeInTheDocument()
  })

  it('calls onDateSelect when date is clicked', async () => {
    // Выбор
    const user = userEvent.setup()
    render(<Calendar value={currentDate} onDateSelect={mockOnDateSelect} />)

    await user.click(screen.getByRole('button'))
    await user.click(screen.getByText(currentDate.getDate().toString()))

    expect(mockOnDateSelect).toHaveBeenCalledTimes(1)
  })

  it('does not open calendar when disabled', async () => {
    // Блокировка Открытия
    const user = userEvent.setup()
    render(<Calendar value={currentDate} disabled />)

    await user.click(screen.getByRole('button'))
    expect(screen.queryByText(formattedMonth)).not.toBeInTheDocument()
  })

  it('does not call onDateSelect when disabled', async () => {
    // Блокировка Выбора
    const user = userEvent.setup()
    render(
      <Calendar value={currentDate} onDateSelect={mockOnDateSelect} disabled />
    )

    await user.click(screen.getByRole('button'))
    expect(mockOnDateSelect).not.toHaveBeenCalled()
  })

  it('renders days of week headers', async () => {
    // Заголовки
    const user = userEvent.setup()
    render(<Calendar value={currentDate} />)

    await user.click(screen.getByRole('button'))

    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    days.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })

  it('highlights current date', async () => {
    // Сегодня
    const user = userEvent.setup()
    render(<Calendar value={currentDate} />)

    await user.click(screen.getByRole('button'))

    const todayCell = screen.getByText(currentDate.getDate().toString())
    expect(todayCell.parentElement.className).toMatch(/today/)
  })

  it('highlights selected date', async () => {
    // Выбранная
    const user = userEvent.setup()
    render(<Calendar value={currentDate} />)

    await user.click(screen.getByRole('button'))

    const selectedCell = screen.getByText(currentDate.getDate().toString())
    expect(selectedCell.parentElement.className).toMatch(/selected/)
  })
})
