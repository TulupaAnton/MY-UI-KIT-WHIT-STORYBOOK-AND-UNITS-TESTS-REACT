import React from 'react'
import Notification from './Notification'
import styles from './NotificationContainer.module.css'

export default function NotificationContainer ({
  notifications,
  removeNotification
}) {
  return (
    <div className={styles.container}>
      {notifications.map(note => (
        <Notification key={note.id} {...note} onClose={removeNotification} />
      ))}
    </div>
  )
}
