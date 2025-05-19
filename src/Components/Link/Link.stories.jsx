import React from 'react'
import Link from './Link'

export default {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    href: { control: 'text' },
    onClick: { action: 'clicked' }
  }
}

const Template = args => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Visit Google',
  href: 'https://www.google.com',
  disabled: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Disabled Link',
  href: '#',
  disabled: true
}
