import { describe, it, expect } from 'vitest'
import { getHabitState, getTodayDateString, getLastNDays } from '../src/utils/dateUtils'

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6]

describe('dateUtils - getHabitState', () => {
  it('should return COMPLETADO if record exists for the date', () => {
    const habit = { frequency: ALL_DAYS, records: { '2023-10-25': 'COMPLETADO' } }
    expect(getHabitState(habit, '2023-10-25', '2023-10-25')).toBe('COMPLETADO')
  })

  it('should return COMPLETADO for a past date that was marked done', () => {
    const habit = { frequency: ALL_DAYS, records: { '2023-10-24': 'COMPLETADO' } }
    expect(getHabitState(habit, '2023-10-24', '2023-10-25')).toBe('COMPLETADO')
  })

  it('should return VENCIDO if date is strictly in the past and not done', () => {
    const habit = { frequency: ALL_DAYS, records: {} }
    expect(getHabitState(habit, '2023-10-24', '2023-10-25')).toBe('VENCIDO')
  })

  it('should return PENDIENTE if date is today and not done', () => {
    const habit = { frequency: ALL_DAYS, records: {} }
    expect(getHabitState(habit, '2023-10-25', '2023-10-25')).toBe('PENDIENTE')
  })

  it('should return PENDIENTE if date is in the future and not done', () => {
    const habit = { frequency: ALL_DAYS, records: {} }
    expect(getHabitState(habit, '2099-12-31', '2023-10-25')).toBe('PENDIENTE')
  })

  it('should return NO_PROGRAMADO if day of week is not in frequency', () => {
    // 2023-10-25 is a Wednesday (day 3)
    const habit = { frequency: [1, 5], records: {} } // Monday and Friday only
    expect(getHabitState(habit, '2023-10-25', '2023-10-25')).toBe('NO_PROGRAMADO')
  })

  it('should return NO_PROGRAMADO even when records exist for an unscheduled day', () => {
    // NO_PROGRAMADO is checked before COMPLETADO in the function
    const habit = { frequency: [1, 5], records: { '2023-10-25': 'COMPLETADO' } }
    expect(getHabitState(habit, '2023-10-25', '2023-10-25')).toBe('NO_PROGRAMADO')
  })

  it('should treat all days as scheduled when frequency is not an array', () => {
    const habit = { frequency: undefined, records: {} }
    // Falls through to PENDIENTE for today
    expect(getHabitState(habit, '2023-10-25', '2023-10-25')).toBe('PENDIENTE')
  })
})

describe('dateUtils - getTodayDateString', () => {
  it('should return a string in YYYY-MM-DD format', () => {
    const result = getTodayDateString()
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('should return today\'s actual date', () => {
    const result = getTodayDateString()
    const now = new Date()
    const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    expect(result).toBe(expected)
  })
})

describe('dateUtils - getLastNDays', () => {
  it('should return the correct number of days', () => {
    expect(getLastNDays(7).length).toBe(7)
    expect(getLastNDays(3).length).toBe(3)
  })

  it('should end with today\'s date', () => {
    const result = getLastNDays(7)
    expect(result[result.length - 1]).toBe(getTodayDateString())
  })

  it('should return dates in ascending chronological order', () => {
    const result = getLastNDays(7)
    for (let i = 1; i < result.length; i++) {
      expect(result[i] > result[i - 1]).toBe(true)
    }
  })

  it('should default to 7 days when called with no arguments', () => {
    expect(getLastNDays().length).toBe(7)
  })
})
