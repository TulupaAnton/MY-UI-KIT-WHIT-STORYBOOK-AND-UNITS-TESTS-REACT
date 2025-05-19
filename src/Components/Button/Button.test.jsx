import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from './Button'
import { faRocket } from '@fortawesome/free-solid-svg-icons'
import { vi } from 'vitest'

describe('Button Component', () => {
  it('renders without crashing', () => {
    // Рендер
    render(<Button>Test Button</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('displays the correct text', () => {
    // Текст
    render(<Button>Click Me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click Me')
  })

  it('applies the correct variant class', () => {
    // Вариант
    const { container } = render(<Button variant='primary'>Test</Button>)
    const button = container.firstChild
    expect(button.className).toMatch(/primary/)
  })

  it('applies the correct size class', () => {
    // Размер
    const { container } = render(<Button size='sm'>Test</Button>)
    const button = container.firstChild
    expect(button.className).toMatch(/sm/)
  })

  it('applies fullWidth class when fullWidth is true', () => {
    // Ширина
    const { container } = render(<Button fullWidth>Test</Button>)
    const button = container.firstChild
    expect(button.className).toMatch(/fullWidth/)
  })

  it('is disabled when disabled prop is true', () => {
    // Отключение
    render(<Button disabled>Test</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not call onClick when disabled', async () => {
    // Без Действия
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        Test
      </Button>
    )
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders icon on the left when iconPosition is "left"', () => {
    // Иконка Слева
    render(
      <Button icon={faRocket} iconPosition='left'>
        Launch
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Launch')
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('renders icon on the right when iconPosition is "right"', () => {
    // Иконка Справа
    render(
      <Button icon={faRocket} iconPosition='right'>
        Launch
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Launch')
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('renders only icon when children is not provided', () => {
    // Только Иконка
    render(<Button icon={faRocket} />)
    const button = screen.getByRole('button')
    expect(button).not.toHaveTextContent()
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    // Клик
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
