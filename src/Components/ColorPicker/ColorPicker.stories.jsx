import React from 'react'
import ColorPicker from './ColorPicker'

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'active', 'disabled'],
      description: 'Visual state of the component'
    },
    defaultColor: {
      control: 'color',
      description: 'Initial selected color'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the color picker'
    },
    label: {
      control: 'text',
      description: 'Label text for the picker'
    },
    showPreview: {
      control: 'boolean',
      description: 'Show color preview box'
    },
    showInput: {
      control: 'boolean',
      description: 'Show HEX input field'
    },
    presetColors: {
      control: 'object',
      description: 'Array of preset color values'
    },
    onChange: {
      action: 'color changed',
      description: 'Callback when color changes'
    },
    className: {
      control: 'text',
      description: 'Additional CSS class'
    }
  }
}

const Template = args => <ColorPicker {...args} />

export const Default = Template.bind({})
Default.args = {
  defaultColor: '#3a86ff',
  state: 'default',
  disabled: false,
  label: 'Select color',
  showPreview: true,
  showInput: true,
  presetColors: ['#3a86ff', '#8338ec', '#ff006e', '#fb5607', '#ffbe0b']
}

export const Active = Template.bind({})
Active.args = {
  ...Default.args,
  state: 'active',
  defaultColor: '#ff5733'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  state: 'disabled',
  disabled: true,
  defaultColor: '#999999'
}

export const WithCustomPresets = Template.bind({})
WithCustomPresets.args = {
  ...Default.args,
  presetColors: ['#4a6fa5', '#166088', '#4fc3f7', '#00b4d8', '#0077b6']
}
