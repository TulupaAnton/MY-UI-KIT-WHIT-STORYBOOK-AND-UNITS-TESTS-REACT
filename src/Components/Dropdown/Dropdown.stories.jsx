import Dropdown from './Dropdown'

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    onSelect: { action: 'selected' }
  }
}

const Template = args => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  items: ['Option 1', 'Option 2', 'Option 3']
}

export const WithError = Template.bind({})
WithError.args = {
  ...Default.args,
  error: true,
  errorMessage: 'Please select an option'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true
}
