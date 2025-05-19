import React from 'react'
import PropTypes from 'prop-types'
import styles from './SelectMenu.module.css'

const SelectMenu = ({
  options,
  initialSelected,
  placeholder,
  disabled,
  error,
  errorMessage,
  onChange,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.customSelectWrapper} ${error ? styles.error : ''}`}
      >
        <select
          defaultValue={initialSelected}
          disabled={disabled}
          onChange={onChange}
          className={`${styles.select} ${disabled ? styles.disabled : ''}`}
          {...props}
        >
          {placeholder && (
            <option value='' disabled className={styles.placeholder}>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              className={styles.option}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.customArrow}></span>
      </div>
      {error && errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  )
}

SelectMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  initialSelected: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func
}

SelectMenu.defaultProps = {
  initialSelected: '',
  placeholder: null,
  disabled: false,
  error: false,
  errorMessage: '',
  onChange: null
}

export default SelectMenu
