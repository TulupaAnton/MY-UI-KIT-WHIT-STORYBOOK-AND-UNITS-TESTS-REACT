import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import styles from './Checkbox.module.css'

export default function Checkbox ({
  checked = false,
  disabled = false,
  error = '',
  label = '',
  onChange,
  ...props
}) {
  const handleChange = e => {
    if (!disabled && onChange) {
      onChange(e.target.checked)
    }
  }

  return (
    <label
      className={`${styles.checkboxWrapper} ${disabled ? styles.disabled : ''}`}
    >
      <input
        type='checkbox'
        checked={checked}
        onChange={handleChange}
        className={styles.hiddenInput}
        disabled={disabled}
        {...props}
      />

      <div
        className={`${styles.customCheckbox} ${checked ? styles.checked : ''} ${
          error ? styles.error : ''
        }`}
      >
        {checked && (
          <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
        )}
      </div>

      {label && <span className={styles.label}>{label}</span>}
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  )
}
