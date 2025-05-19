import React, { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths
} from 'date-fns'
import styles from './Calendar.module.css'

const Calendar = ({ disabled = false, onDateSelect, value = new Date() }) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(value))
  const [isOpen, setIsOpen] = useState(false)

  const navigateMonth = direction => {
    setCurrentMonth(
      direction === 'prev'
        ? subMonths(currentMonth, 1)
        : addMonths(currentMonth, 1)
    )
  }

  const handleDateSelect = day => {
    if (!disabled) {
      onDateSelect?.(day)
      setIsOpen(false)
    }
  }

  const renderHeader = () => (
    <div className={styles.header}>
      <button
        onClick={() => navigateMonth('prev')}
        className={styles.navButton}
        disabled={disabled}
      >
        ←
      </button>
      <h2 className={styles.title}>{format(currentMonth, 'MMMM yyyy')}</h2>
      <button
        onClick={() => navigateMonth('next')}
        className={styles.navButton}
        disabled={disabled}
      >
        →
      </button>
    </div>
  )

  const renderDays = () => {
    const dateFormat = 'EEEEEE'
    const days = []
    let startDate = startOfWeek(new Date())

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={styles.day} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }

    return <div className={styles.daysRow}>{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        const isSelected = isSameDay(day, value)
        const isCurrentMonth = isSameMonth(day, monthStart)
        const isTodayDate = isToday(day)

        days.push(
          <div
            className={[
              styles.cell,
              !isCurrentMonth && styles.outOfMonth,
              isSelected && styles.selected,
              isTodayDate && styles.today,
              disabled && styles.disabled
            ]
              .filter(Boolean)
              .join(' ')}
            key={day.toString()}
            onClick={() => handleDateSelect(cloneDay)}
          >
            <span className={styles.dateNumber}>{format(day, 'd')}</span>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className={styles.row} key={day.toString()}>
          {days}
        </div>
      )
      days = []
    }
    return <div className={styles.grid}>{rows}</div>
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.triggerButton}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {format(value, 'MMMM d, yyyy')}
      </button>

      {isOpen && (
        <div className={styles.calendar}>
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      )}
    </div>
  )
}

export default Calendar
