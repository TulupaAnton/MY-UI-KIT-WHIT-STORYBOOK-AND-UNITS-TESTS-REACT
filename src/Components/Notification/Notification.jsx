import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import styles from './Notification.module.css'

const iconMap = {
  success: faCheckCircle,
  error: faExclamationCircle,
  warning: faExclamationTriangle,
  info: faInfoCircle,
  default: faInfoCircle
}

export default function Notification ({
  id,
  message,
  type = 'default',
  onClose
}) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose?.(id)
    }, 300)
  }

  return (
    <div
      className={`${styles.notification} ${styles[type]} ${
        isVisible ? styles.enter : styles.exit
      }`}
    >
      <div className={styles.content}>
        <FontAwesomeIcon icon={iconMap[type]} className={styles.icon} />
        <span className={styles.message}>{message}</span>
      </div>
      <button onClick={handleClose} className={styles.close}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  )
}
