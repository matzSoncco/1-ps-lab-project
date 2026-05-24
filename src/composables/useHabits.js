import { ref, watch, onMounted } from 'vue'
import { getTodayDateString, getHabitState } from '../utils/dateUtils.js'

const HABITS_STORAGE_KEY = 'habit_tracker_data'

/**
 * Composable para manejar el estado de los hábitos de la aplicación.
 */
export function useHabits() {
  const habits = ref([])

  /**
   * Carga los hábitos desde el almacenamiento local (localStorage).
   */
  const loadHabits = () => {
    const stored = localStorage.getItem(HABITS_STORAGE_KEY)
    if (stored) {
      try {
        habits.value = JSON.parse(stored)
      } catch (e) {
        console.error('Error al analizar los hábitos desde el almacenamiento', e)
        habits.value = []
      }
    }
  }

  /**
   * Guarda los hábitos en el almacenamiento local.
   */
  const saveHabits = () => {
    localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits.value))
  }

  // Guardado automático cuando los hábitos cambian profundamente
  watch(habits, saveHabits, { deep: true })

  onMounted(() => {
    loadHabits()
  })

  /**
   * Genera un UUID único.
   * @returns {string} ID único.
   */
  const generateId = () => {
    return 'id-' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  }

  /**
   * Añade un nuevo hábito.
   * @param {Object} habitData - Los detalles del nuevo hábito.
   */
  const addHabit = (habitData) => {
    const newHabit = {
      id: generateId(),
      title: habitData.title,
      frequency: habitData.frequency || [0, 1, 2, 3, 4, 5, 6],
      labels: habitData.labels || [],
      timeLimit: habitData.timeLimit || '08:00', // Ahora es un recordatorio
      createdAt: new Date().toISOString(),
      records: {}
    }
    habits.value.push(newHabit)
  }

  /**
   * Elimina un hábito por su ID.
   * @param {string} id - ID del hábito.
   */
  const deleteHabit = (id) => {
    habits.value = habits.value.filter(h => h.id !== id)
  }

  /**
   * Cambia el estado de completado de un hábito para una fecha específica.
   * @param {string} id - ID del hábito.
   * @param {string} dateStr - Cadena de fecha (YYYY-MM-DD).
   */
  const toggleHabitRecord = (id, dateStr) => {
    const habit = habits.value.find(h => h.id === id)
    if (habit) {
      if (!habit.records) habit.records = {}
      if (habit.records[dateStr] === 'COMPLETADO') {
        delete habit.records[dateStr]
      } else {
        habit.records[dateStr] = 'COMPLETADO'
      }
    }
  }

  /**
   * Obtiene el estado evaluado para un hábito específico en una fecha dada.
   * @param {string} id - ID del hábito.
   * @param {string} dateStr - Cadena de fecha.
   * @returns {string|null} 'COMPLETADO', 'VENCIDO', 'PENDIENTE', 'NO_PROGRAMADO' o null si no se encuentra.
   */
  const getHabitStatusForDate = (id, dateStr) => {
    const habit = habits.value.find(h => h.id === id)
    if (!habit) return null
    return getHabitState(habit, dateStr, getTodayDateString())
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
