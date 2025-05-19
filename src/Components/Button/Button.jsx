import React from 'react'
import styles from './Button.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon = null, // icon = faUser, faPlus и т.д.
  iconPosition = 'left' // "left", "right"
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    icon && children ? styles.withIcon : ''
  ].join(' ')

  return (
    <button
      className={classes}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && (
        <FontAwesomeIcon icon={icon} className={styles.icon} />
      )}
      {children && <span className={styles.text}>{children}</span>}
      {icon && iconPosition === 'right' && (
        <FontAwesomeIcon icon={icon} className={styles.icon} />
      )}
    </button>
  )
}
