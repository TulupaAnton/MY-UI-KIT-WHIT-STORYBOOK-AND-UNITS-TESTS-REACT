import React from 'react'
import Checkbox from './Checkbox'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    onChange: { action: 'changed' }
  },
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    disabled: false,
    error: ''
  }
}

const Template = args => {
  const [isChecked, setIsChecked] = React.useState(args.checked)

  return (
    <Checkbox
      {...args}
      checked={isChecked}
      onChange={checked => {
        setIsChecked(checked)
        args.onChange(checked)
      }}
    />
  )
}

export const Default = Template.bind({})

export const Checked = Template.bind({})
Checked.args = {
  checked: true,
  label: 'I agree to the terms'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  label: 'Disabled checkbox'
}

export const WithError = Template.bind({})
WithError.args = {
  error: 'Please accept the terms',
  label: 'Error checkbox'
}
