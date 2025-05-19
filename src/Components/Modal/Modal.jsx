import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './Modal.module.css'

export default function Modal ({
  isOpen = false,
  onClose,
  closable = true,
  children,
  disableBackdropClose = false,
  width = '600px',
  height = 'auto',
  animationDuration = 300,
  overlayBlur = true,
  closeButton = true,
  borderRadius = '12px',
  padding = '2rem',
  closeIconColor = '#6b7280',
  overlayColor = 'rgba(0, 0, 0, 0.5)'
}) {
  const handleBackdropClick = () => {
    if (!disableBackdropClose && onClose) onClose()
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '15px'
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && closable && onClose) {
        onClose()
      }
    }

    if (isOpen) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closable, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles.show : ''}`}
      style={{
        '--overlay-color': overlayColor,
        '--animation-duration': `${animationDuration}ms`,
        '--overlay-blur': overlayBlur ? '4px' : '0'
      }}
      onClick={handleBackdropClick}
      role='dialog'
      aria-modal='true'
    >
      <div
        className={`${styles.modal} ${isOpen ? styles.show : ''}`}
        style={{
          '--width': width,
          '--height': height,
          '--border-radius': borderRadius,
          '--padding': padding,
          '--animation-duration': `${animationDuration}ms`
        }}
        onClick={e => e.stopPropagation()}
      >
        {closable && closeButton && (
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label='Close modal'
            style={{ '--icon-color': closeIconColor }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
