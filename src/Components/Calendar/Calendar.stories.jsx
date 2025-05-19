import React from 'react'
import Calendar from './Calendar'

export default {
  title: 'Components/Calendar',
  component: Calendar,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the calendar'
    },
    value: {
      control: 'date',
      description: 'Currently selected date'
    },
    onDateSelect: {
      action: 'date selected',
      description: 'Callback when date is selected'
    }
  }
}

const Template = args => <Calendar {...args} />

export const Default = Template.bind({})
Default.args = {
  disabled: false,
  value: new Date()
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  value: new Date()
}

export const InteractiveExample = () => {
  const [date, setDate] = React.useState(new Date())
  return (
    <div>
      <p>Selected date: {date.toLocaleDateString()}</p>
      <Calendar value={date} onDateSelect={setDate} />
      <div style={{ marginTop: '16px' }}>
        <Calendar disabled value={date} onDateSelect={setDate} />
      </div>
    </div>
  )
}
