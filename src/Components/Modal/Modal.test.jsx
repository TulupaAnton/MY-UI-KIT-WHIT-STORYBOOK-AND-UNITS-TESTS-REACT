import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Modal from './Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { vi } from 'vitest'

// Mock
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }) => {
    if (icon === faXmark) {
      return <span data-testid='close-icon'>X</span>
    }
    return null
  }
}))

describe('Modal Component', () => {
  const mockOnClose = vi.fn()
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    children: <div>Modal Content</div>
  }

  afterEach(() => {
    vi.clearAllMocks()
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })

  it('should not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    render(<Modal {...defaultProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('should call onClose when clicking the close button', () => {
    render(<Modal {...defaultProps} closeButton={true} />)
    fireEvent.click(screen.getByLabelText('Close modal'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should not render close button when closeButton is false', () => {
    render(<Modal {...defaultProps} closeButton={false} />)
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument()
  })

  it('should call onClose when clicking the backdrop by default', () => {
    render(<Modal {...defaultProps} />)
    fireEvent.click(screen.getByRole('dialog'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when clicking the backdrop if disableBackdropClose is true', () => {
    render(<Modal {...defaultProps} disableBackdropClose={true} />)
    fireEvent.click(screen.getByRole('dialog'))
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should call onClose when pressing Escape key', () => {
    render(<Modal {...defaultProps} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when pressing Escape key if closable is false', () => {
    render(<Modal {...defaultProps} closable={false} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should prevent body scroll when modal is open', () => {
    render(<Modal {...defaultProps} />)
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.paddingRight).toBe('15px')
  })

  it('should stop click propagation when clicking modal content', () => {
    render(<Modal {...defaultProps} />)
    const modalContent = screen.getByRole('dialog').firstChild
    fireEvent.click(modalContent)
    expect(mockOnClose).not.toHaveBeenCalled()
  })
})
