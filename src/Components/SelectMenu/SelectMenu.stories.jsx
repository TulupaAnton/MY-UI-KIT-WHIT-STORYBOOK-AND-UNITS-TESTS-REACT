import React from 'react'
import SelectMenu from './SelectMenu'

export default {
  title: 'Components/SelectMenu',
  component: SelectMenu,
  argTypes: {
    options: { control: 'object' },
    initialSelected: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    onChange: { action: 'changed' }
  }
}

const Template = args => <SelectMenu {...args} />

export const Default = Template.bind({})
Default.args = {
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ],
  placeholder: 'Select an option'
}

export const WithError = Template.bind({})
WithError.args = {
  ...Default.args,
  error: true,
  errorMessage: 'This field is required'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}
