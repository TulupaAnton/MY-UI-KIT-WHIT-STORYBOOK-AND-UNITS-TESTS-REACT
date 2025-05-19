import React from 'react'
import Input from './Input'

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    onChange: { action: 'changed' }
  }
}

const Template = args => {
  const [value, setValue] = React.useState(args.value || '')

  return (
    <Input
      {...args}
      value={value}
      onChange={e => {
        setValue(e.target.value)
        args.onChange?.(e)
      }}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  value: ''
}

export const Filled = Template.bind({})
Filled.args = {
  value: 'Filled input',
  readOnly: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  value: 'Disabled input',
  disabled: true
}

export const Error = Template.bind({})
Error.args = {
  value: 'Error input',
  error: 'There was an error'
}
