import React, { useState } from 'react'
import Modal from './Modal'
import styles from './Modal.stories.module.css'

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean' },
    closable: { control: 'boolean' },
    disableBackdropClose: { control: 'boolean' },
    width: {
      control: { type: 'text' },
      description: 'Ширина модального окна (px, %, rem)'
    },
    height: {
      control: { type: 'text' },
      description: 'Высота модального окна (px, %, rem)'
    },
    animationDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Длительность анимации в ms'
    },
    overlayBlur: { control: 'boolean' },
    closeButton: { control: 'boolean' },
    borderRadius: {
      control: { type: 'text' },
      description: 'Радиус скругления углов'
    },
    padding: {
      control: { type: 'text' },
      description: 'Внутренние отступы'
    },
    closeIconColor: {
      control: { type: 'color' },
      description: 'Цвет иконки закрытия'
    },
    overlayColor: {
      control: { type: 'color' },
      description: 'Цвет оверлея'
    }
  }
}

const Template = args => {
  const [isOpen, setIsOpen] = useState(args.isOpen)

  return (
    <>
      <button className={styles.openButton} onClick={() => setIsOpen(true)}>
        Открыть модальное окно
      </button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  isOpen: false,
  children: (
    <div className={styles.modalContent}>
      <h2>Добро пожаловать!</h2>
      <p>Это стандартное модальное окно с базовыми настройками.</p>
    </div>
  )
}

export const WithCustomSize = Template.bind({})
WithCustomSize.args = {
  isOpen: true,
  width: '800px',
  height: '400px',
  children: (
    <div className={styles.modalContent}>
      <h2>Большое модальное окно</h2>
      <p>Это окно имеет фиксированные размеры 800x400 пикселей.</p>
      <div className={styles.scrollContent}>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>Строка контента #{i + 1}</p>
        ))}
      </div>
    </div>
  )
}

export const WithActions = Template.bind({})
WithActions.args = {
  isOpen: true,
  borderRadius: '16px',
  padding: '2.5rem',
  children: (
    <div className={styles.modalContent}>
      <h2>Подтвердите действие</h2>
      <p>
        Вы уверены, что хотите выполнить это действие? Это нельзя будет
        отменить.
      </p>
      <div className={styles.actions}>
        <button
          className={styles.secondaryButton}
          onClick={() => console.log('Отмена')}
        >
          Отмена
        </button>
        <button
          className={styles.primaryButton}
          onClick={() => console.log('Подтвердить')}
        >
          Подтвердить
        </button>
      </div>
    </div>
  )
}

export const StyledModal = Template.bind({})
StyledModal.args = {
  isOpen: true,
  overlayColor: 'rgba(107, 114, 128, 0.7)',
  closeIconColor: '#6366f1',
  borderRadius: '24px',
  padding: '3rem',
  children: (
    <div className={styles.modalContent}>
      <h2 style={{ color: '#6366f1' }}>Стилизованное окно</h2>
      <p>
        Это модальное окно с кастомными цветами и увеличенными скруглениями.
      </p>
    </div>
  )
}

export const NonClosable = Template.bind({})
NonClosable.args = {
  isOpen: true,
  closable: false,
  disableBackdropClose: true,
  children: (
    <div className={styles.modalContent}>
      <h2>Важное сообщение</h2>
      <p>
        Это окно нельзя закрыть кликом вне его или по крестику. Закрыть можно
        только программно.
      </p>
    </div>
  )
}

export const WithBlurEffect = Template.bind({})
WithBlurEffect.args = {
  isOpen: true,
  overlayBlur: true,
  children: (
    <div className={styles.modalContent}>
      <h2>Эффект размытия</h2>
      <p>Фон под модальным окном размыт для лучшего визуального выделения.</p>
    </div>
  )
}
