import React from 'react'
import Button from './Button'
import {
  faRocket,
  faArrowRight,
  faHeart
} from '@fortawesome/free-solid-svg-icons'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    icon: {
      control: { type: 'select' },
      options: {
        none: null,
        rocket: faRocket,
        arrowRight: faArrowRight,
        heart: faHeart
      },
      mapping: {
        none: null,
        rocket: faRocket,
        arrowRight: faArrowRight,
        heart: faHeart
      }
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right']
    },
    children: { control: 'text' }
  }
}

const Template = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Click Me',
  variant: 'primary',
  size: 'md'
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Click Me',
  variant: 'secondary',
  size: 'md'
}

export const Danger = Template.bind({})
Danger.args = {
  children: 'Click Me',
  variant: 'danger',
  size: 'md'
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Disabled',
  variant: 'primary',
  disabled: true
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  children: 'Full Width',
  variant: 'primary',
  fullWidth: true
}

export const WithIconLeft = Template.bind({})
WithIconLeft.args = {
  children: 'Launch',
  icon: faRocket,
  iconPosition: 'left',
  variant: 'primary'
}

export const WithIconRight = Template.bind({})
WithIconRight.args = {
  children: 'Next',
  icon: faArrowRight,
  iconPosition: 'right',
  variant: 'secondary'
}

export const IconOnly = Template.bind({})
IconOnly.args = {
  icon: faHeart,
  iconPosition: 'left'
}
