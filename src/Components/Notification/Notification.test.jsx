import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import Notification from './Notification'
import NotificationContainer from './NotificationContainer'
import { NotificationProvider, useNotification } from './NotificationProvider'

// Мокаем иконки с разными testid
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => {
    if (icon.iconName === 'times') {
      return <span data-testid='close-icon' />
    }
    return <span data-testid='notification-icon' />
  }
}))

describe('NotificationContainer', () => {
  it('отображает список уведомлений', () => {
    const notifications = [
      { id: '1', message: 'First' },
      { id: '2', message: 'Second' }
    ]
    render(
      <NotificationContainer
        notifications={notifications}
        removeNotification={vi.fn()}
      />
    )

    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })
})

describe('NotificationProvider', () => {
  const TestComponent = () => {
    const { addNotification } = useNotification()
    return <button onClick={() => addNotification('Test')}>Add</button>
  }

  it('добавляет уведомления', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    )

    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('требует Provider', () => {
    expect(() => {
      render(
        <div>
          <TestComponent />
        </div>
      )
    }).toThrow('useNotification must be used within a NotificationProvider')
  })
})
