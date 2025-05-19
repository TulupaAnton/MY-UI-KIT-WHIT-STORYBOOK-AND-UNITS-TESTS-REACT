import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './ColorPicker.module.css'

export default function ColorPicker ({
  disabled = false,
  defaultColor = '#3a86ff',
  state = 'default',
  presetColors = ['#3a86ff', '#8338ec', '#ff006e', '#fb5607', '#ffbe0b'],
  label = 'Select color',
  showPreview = true,
  showInput = true,
  onChange,
  className = ''
}) {
  const [color, setColor] = useState(defaultColor)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setColor(defaultColor)
  }, [defaultColor])

  const handleChange = e => {
    const newColor = e.target.value
    setColor(newColor)
    onChange?.(newColor)
  }

  const handlePresetClick = presetColor => {
    setColor(presetColor)
    onChange?.(presetColor)
    setIsOpen(false)
  }

  const toggleColorPicker = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  const getContrastColor = hexColor => {
    const r = parseInt(hexColor.substr(1, 2), 16)
    const g = parseInt(hexColor.substr(3, 2), 16)
    const b = parseInt(hexColor.substr(5, 2), 16)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000
    return yiq >= 128 ? '#000000' : '#FFFFFF'
  }

  return (
    <div
      className={`${styles.wrapper} ${styles[state]} ${className}`}
      aria-disabled={disabled}
    >
      <div
        className={`${styles.trigger} ${isOpen ? styles.active : ''} ${
          disabled ? styles.disabled : ''
        }`}
        onClick={toggleColorPicker}
        aria-expanded={isOpen}
        role='button'
        tabIndex={0}
        aria-label={label || 'Color picker'}
        aria-haspopup='menu'
      >
        {label && <span className={styles.labelText}>{label}</span>}

        {showPreview && (
          <div
            className={styles.colorPreview}
            style={{
              backgroundColor: color,
              color: getContrastColor(color),
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
            aria-hidden='true'
          >
            {color.toUpperCase()}
          </div>
        )}
      </div>

      {isOpen && !disabled && (
        <div
          className={styles.dropdown}
          role='menu'
          aria-orientation='vertical'
        >
          <div className={styles.pickerContainer}>
            <input
              type='color'
              value={color}
              onChange={handleChange}
              className={styles.colorInput}
              aria-label='Color picker'
            />

            {showInput && (
              <div className={styles.inputWrapper}>
                <input
                  type='text'
                  value={color.toUpperCase()}
                  onChange={e => {
                    const value = e.target.value
                    if (/^#[0-9A-F]{6}$/i.test(value)) {
                      setColor(value)
                      onChange?.(value)
                    } else if (value.length === 7) {
                      setColor(value)
                    }
                  }}
                  className={styles.textInput}
                  pattern='^#[0-9A-F]{6}$'
                  placeholder='#RRGGBB'
                  aria-label='HEX color code'
                />
                <span className={styles.inputLabel}>HEX</span>
              </div>
            )}

            {presetColors.length > 0 && (
              <>
                <div className={styles.presetLabel}>Preset colors</div>
                <div
                  className={styles.presetColors}
                  role='group'
                  aria-label='Preset colors'
                >
                  {presetColors.map((presetColor, index) => (
                    <button
                      key={index}
                      className={`${styles.presetColor} ${
                        color.toLowerCase() === presetColor.toLowerCase()
                          ? styles.selected
                          : ''
                      }`}
                      style={{ backgroundColor: presetColor }}
                      onClick={() => handlePresetClick(presetColor)}
                      aria-label={`Select color ${presetColor}`}
                      role='option'
                      aria-selected={
                        color.toLowerCase() === presetColor.toLowerCase()
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

ColorPicker.propTypes = {
  disabled: PropTypes.bool,
  defaultColor: PropTypes.string,
  state: PropTypes.oneOf(['default', 'active', 'disabled']),
  presetColors: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  showPreview: PropTypes.bool,
  showInput: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string
}
