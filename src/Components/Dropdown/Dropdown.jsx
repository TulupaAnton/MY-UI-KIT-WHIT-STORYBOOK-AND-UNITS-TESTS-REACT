import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Dropdown.module.css'

const Dropdown = ({
  items,
  disabled,
  placeholder = 'Select an option',
  error,
  errorMessage,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    if (!disabled) setIsOpen(!isOpen)
  }

  const handleItemClick = item => {
    setSelectedItem(item)
    setIsOpen(false)
    if (onSelect) onSelect(item)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.open : ''} ${
          disabled ? styles.disabled : ''
        } ${error ? styles.error : ''}`}
        onClick={toggleDropdown}
        disabled={disabled}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span className={styles.selectedValue}>
          {selectedItem || placeholder}
        </span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7 10l5 5 5-5'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      </button>

      {error && errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      <div className={`${styles.dropdownMenu} ${isOpen ? styles.visible : ''}`}>
        <ul role='listbox'>
          {items.map((item, index) => (
            <li
              key={index}
              className={`${styles.dropdownItem} 
                ${item === selectedItem ? styles.selected : ''} 
                ${item === hoveredItem ? styles.hovered : ''}`}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              role='option'
              aria-selected={item === selectedItem}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onSelect: PropTypes.func
}

Dropdown.defaultProps = {
  disabled: false,
  placeholder: 'Select an option',
  error: false,
  errorMessage: '',
  onSelect: null
}

export default Dropdown
