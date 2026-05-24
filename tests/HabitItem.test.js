import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HabitItem from '../src/components/HabitItem.vue'

describe('HabitItem.vue', () => {
  const mockHabit = {
    id: '123',
    title: 'Test Habit',
    labels: ['health'],
    timeLimit: '23:59',
    records: {}
  }

  it('renders habit title and labels', () => {
    const wrapper = mount(HabitItem, {
      props: {
        habit: mockHabit,
        dateStr: '2023-10-25'
      }
    })
    
    expect(wrapper.text()).toContain('Test Habit')
    expect(wrapper.text()).toContain('health')
  })

  it('emits toggle event when checkbox is clicked', async () => {
    const wrapper = mount(HabitItem, {
      props: {
        habit: mockHabit,
        dateStr: '2023-10-25'
      }
    })
    
    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(wrapper.emitted()).toHaveProperty('toggle')
    expect(wrapper.emitted('toggle')[0]).toEqual(['123', '2023-10-25'])
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(HabitItem, {
      props: {
        habit: mockHabit,
        dateStr: '2023-10-25'
      }
    })
    
    await wrapper.find('.btn-delete').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('delete')
    expect(wrapper.emitted('delete')[0]).toEqual(['123'])
  })
})