import React from 'react'
import Textarea from './Textarea'

export default {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    value: { control: 'text' },
    disabled: {
      control: 'boolean',
      defaultValue: false
    },
    error: { control: 'text' },
    state: {
      control: {
        type: 'select'
      },
      options: ['default', 'filled', 'disabled', 'error'],
      defaultValue: 'default'
    },
    onChange: { action: 'changed' }
  }
}

const Template = args => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {
  value: '',
  state: 'default'
}

export const Filled = Template.bind({})
Filled.args = {
  value: 'Filled Textarea',
  state: 'filled'
}

export const Disabled = Template.bind({})
Disabled.args = {
  value: 'Disabled Textarea',
  disabled: true,
  state: 'disabled'
}

export const Error = Template.bind({})
Error.args = {
  value: 'Error Textarea',
  error: 'There was an error',
  state: 'error'
}
