import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { expect } from 'vitest'
import '@testing-library/jest-dom'
import Link from './Link'
import styles from './Link.module.css'

describe('Link Component', () => {
  it('renders with default props', () => {
    render(<Link>Test Link</Link>)
    const linkElement = screen.getByText('Test Link')

    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '#')
    expect(linkElement).toHaveClass(styles.link)
    expect(linkElement).not.toHaveClass(styles.disabled)
  })

  it('renders with href prop', () => {
    render(<Link href='https://example.com'>Example</Link>)
    const linkElement = screen.getByText('Example')

    expect(linkElement).toHaveAttribute('href', 'https://example.com')
    expect(linkElement).toHaveClass(styles.link)
  })

  it('applies disabled styles when disabled', () => {
    render(<Link disabled>Disabled Link</Link>)
    const linkElement = screen.getByText('Disabled Link')

    expect(linkElement).toHaveClass(styles.disabled)
    expect(linkElement).toHaveClass(styles.link)
    expect(linkElement).not.toHaveAttribute('href')
  })

  it('prevents default click behavior when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Link disabled onClick={handleClick}>
        Disabled Link
      </Link>
    )
    const linkElement = screen.getByText('Disabled Link')

    fireEvent.click(linkElement)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('calls onClick handler when not disabled', () => {
    const handleClick = vi.fn()
    render(<Link onClick={handleClick}>Clickable Link</Link>)
    const linkElement = screen.getByText('Clickable Link')

    fireEvent.click(linkElement)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('passes additional props to anchor element', () => {
    render(
      <Link data-testid='custom-link' aria-label='Test'>
        Link
      </Link>
    )
    const linkElement = screen.getByTestId('custom-link')

    expect(linkElement).toHaveAttribute('aria-label', 'Test')
    expect(linkElement).toHaveClass(styles.link)
  })
})
