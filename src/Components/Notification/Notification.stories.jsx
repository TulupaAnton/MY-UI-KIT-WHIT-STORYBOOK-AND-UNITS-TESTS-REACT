import React, { useState } from 'react'
import Notification from './Notification'
import { NotificationProvider, useNotification } from './NotificationProvider'

export default {
  title: 'Components/Notification',
  component: Notification,
  decorators: [
    Story => (
      <NotificationProvider>
        <Story />
      </NotificationProvider>
    )
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info']
    },
    message: { control: 'text' },
    duration: { control: 'number' }
  }
}

const Template = args => {
  const { addNotification } = useNotification()
  const [visible, setVisible] = useState(true)

  return (
    <>
      <button
        onClick={() => addNotification(args.message, args.type, args.duration)}
      >
        Показать уведомление
      </button>
      {visible && (
        <Notification
          {...args}
          id='story-notification'
          onClose={() => setVisible(false)}
        />
      )}
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  type: 'default',
  message: 'Это обычное уведомление.',
  duration: 3000
}

export const Success = Template.bind({})
Success.args = {
  type: 'success',
  message: 'Успешно выполнено!',
  duration: 3000
}

export const Error = Template.bind({})
Error.args = {
  type: 'error',
  message: 'Произошла ошибка.',
  duration: 3000
}

export const Warning = Template.bind({})
Warning.args = {
  type: 'warning',
  message: 'Будьте осторожны.',
  duration: 3000
}

export const Info = Template.bind({})
Info.args = {
  type: 'info',
  message: 'Информация для пользователя.',
  duration: 3000
}
