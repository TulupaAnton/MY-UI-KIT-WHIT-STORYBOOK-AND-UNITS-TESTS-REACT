import React from 'react'
import styles from './Link.module.css'
export default function Link ({
  href = '#',
  children,
  disabled = false,
  onClick,
  ...props
}) {
  const handleClick = e => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }
  return (
    <a
      href={disabled ? undefined : href}
      className={`${styles.link} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  )
}
