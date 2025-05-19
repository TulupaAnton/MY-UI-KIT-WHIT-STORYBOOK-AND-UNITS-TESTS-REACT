// NotificationProvider.jsx
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback
} from 'react'
import NotificationContainer from './NotificationContainer'

const NotificationContext = createContext()

let idCounter = 0

export function NotificationProvider ({ children }) {
  const [notifications, setNotifications] = useState([])
  const timers = useRef({})

  // Сначала объявляем removeNotification
  const removeNotification = useCallback(id => {
    setNotifications(prev => {
      const newNotifications = prev.filter(n => n.id !== id)
      if (newNotifications.length < prev.length && timers.current[id]) {
        clearTimeout(timers.current[id])
        delete timers.current[id]
      }
      return newNotifications
    })
  }, [])

  // Затем addNotification, который использует removeNotification
  const addNotification = useCallback(
    (message, type = 'default', duration = 4000) => {
      const id = ++idCounter
      setNotifications(prev => [...prev, { id, message, type, duration }])

      if (duration > 0) {
        timers.current[id] = setTimeout(() => {
          removeNotification(id)
        }, duration)
      }

      return id
    },
    [removeNotification] // Теперь removeNotification инициализирован
  )

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(timer => clearTimeout(timer))
    }
  }, [])

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}
      <NotificationContainer
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </NotificationContext.Provider>
  )
}

// Явный экспорт хука
export function useNotification () {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}
