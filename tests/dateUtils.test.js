import { describe, it, expect } from 'vitest'
import { getHabitState } from '../src/utils/dateUtils'

describe('dateUtils - getHabitState', () => {
  it('should return DONE if record exists for the date', () => {
    const habit = { records: { '2023-10-25': 'DONE' }, timeLimit: '12:00' }
    const state = getHabitState(habit, '2023-10-25', '2023-10-25', '10:00')
    expect(state).toBe('DONE')
  })

  it('should return OVERDUE if date is strictly in the past and not done', () => {
    const habit = { records: {}, timeLimit: '12:00' }
    const state = getHabitState(habit, '2023-10-24', '2023-10-25', '10:00')
    expect(state).toBe('OVERDUE')
  })

  it('should return OVERDUE if today and past time limit', () => {
    const habit = { records: {}, timeLimit: '10:00' }
    const state = getHabitState(habit, '2023-10-25', '2023-10-25', '11:00')
    expect(state).toBe('OVERDUE')
  })

  it('should return PENDING if today and before time limit', () => {
    const habit = { records: {}, timeLimit: '12:00' }
    const state = getHabitState(habit, '2023-10-25', '2023-10-25', '11:00')
    expect(state).toBe('PENDING')
  })
})