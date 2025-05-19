import React, { useState } from 'react'
import styles from './Textarea.module.css'

export default function Textarea ({
  value = '',
  onChange,
  disabled = false,
  error = '',
  state = 'default', // default | filled | disabled | error
  ...props
}) {
  const [textareaValue, setTextareaValue] = useState(value)

  const handleChange = e => {
    if (!disabled) {
      setTextareaValue(e.target.value)
      onChange && onChange(e)
    }
  }

  const textareaClass = `${styles.textarea} ${styles[state]} ${
    error ? styles.error : ''
  } ${disabled ? styles.disabled : ''}`

  return (
    <div className={styles.textareaWrapper}>
      <textarea
        value={textareaValue}
        onChange={handleChange}
        className={textareaClass}
        disabled={disabled}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}
