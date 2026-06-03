import { describe, it, expect, beforeEach } from 'vitest'
import { useHabits } from '../src/composables/useHabits'

describe('useHabits composable', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should add a habit correctly', () => {
    const { habits, addHabit } = useHabits()
    expect(habits.value.length).toBe(0)
    
    addHabit({ title: 'Read Book', frequency: 'daily', timeLimit: '20:00', labels: ['study'] })
    
    expect(habits.value.length).toBe(1)
    expect(habits.value[0].title).toBe('Read Book')
    expect(habits.value[0].id).toBeDefined()
  })

  it('should delete a habit correctly', () => {
    const { habits, addHabit, deleteHabit } = useHabits()
    addHabit({ title: 'Test', frequency: 'daily' })
    const id = habits.value[0].id
    
    deleteHabit(id)
    expect(habits.value.length).toBe(0)
  })

  it('should toggle habit record for a specific date', () => {
    const { habits, addHabit, toggleHabitRecord } = useHabits()
    addHabit({ title: 'Test' })
    const id = habits.value[0].id
    
    toggleHabitRecord(id, '2023-10-25')
    expect(habits.value[0].records['2023-10-25']).toBe('COMPLETADO')
    
    toggleHabitRecord(id, '2023-10-25')
    expect(habits.value[0].records['2023-10-25']).toBeUndefined()
  })
})