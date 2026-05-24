import { ref, watch, onMounted } from 'vue'
import { getTodayDateString, getCurrentTimeFormatted, getHabitState } from '../utils/dateUtils.js'

const HABITS_STORAGE_KEY = 'habit_tracker_data'

/**
 * Composable to manage the application's habit state.
 */
export function useHabits() {
  const habits = ref([])

  /**
   * Loads habits from local storage.
   */
  const loadHabits = () => {
    const stored = localStorage.getItem(HABITS_STORAGE_KEY)
    if (stored) {
      try {
        habits.value = JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse habits from storage', e)
        habits.value = []
      }
    }
  }

  /**
   * Saves habits to local storage.
   */
  const saveHabits = () => {
    localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits.value))
  }

  // Auto-save whenever habits change deeply
  watch(habits, saveHabits, { deep: true })

  onMounted(() => {
    loadHabits()
  })

  /**
   * Generates a unique UUID.
   * @returns {string} Unique ID.
   */
  const generateId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  }

  /**
   * Adds a new habit.
   * @param {Object} habitData - The details of the new habit.
   */
  const addHabit = (habitData) => {
    const newHabit = {
      id: generateId(),
      title: habitData.title,
      frequency: habitData.frequency || 'daily',
      labels: habitData.labels || [],
      timeLimit: habitData.timeLimit || '23:59',
      createdAt: new Date().toISOString(),
      records: {}
    }
    habits.value.push(newHabit)
  }

  /**
   * Deletes a habit by its ID.
   * @param {string} id - Habit ID.
   */
  const deleteHabit = (id) => {
    habits.value = habits.value.filter(h => h.id !== id)
  }

  /**
   * Toggles the completion status of a habit for a specific date.
   * @param {string} id - Habit ID.
   * @param {string} dateStr - Date string (YYYY-MM-DD).
   */
  const toggleHabitRecord = (id, dateStr) => {
    const habit = habits.value.find(h => h.id === id)
    if (habit) {
      if (!habit.records) habit.records = {}
      if (habit.records[dateStr] === 'DONE') {
        delete habit.records[dateStr]
      } else {
        habit.records[dateStr] = 'DONE'
      }
    }
  }

  /**
   * Gets the evaluated state for a specific habit on a given date.
   * @param {string} id - Habit ID.
   * @param {string} dateStr - Date string.
   * @returns {string|null} 'DONE', 'OVERDUE', 'PENDING' or null if not found.
   */
  const getHabitStatusForDate = (id, dateStr) => {
    const habit = habits.value.find(h => h.id === id)
    if (!habit) return null
    return getHabitState(habit, dateStr, getTodayDateString(), getCurrentTimeFormatted())
  }

  return {
    habits,
    loadHabits,
    addHabit,
    deleteHabit,
    toggleHabitRecord,
    getHabitStatusForDate
  }
}