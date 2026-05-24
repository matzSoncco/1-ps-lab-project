/**
 * Funciones de utilidad para cálculos de fecha y hora.
 */

/**
 * Retorna la fecha de hoy formateada como YYYY-MM-DD.
 * @returns {string} La cadena de fecha formateada.
 */
export function getTodayDateString() {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

/**
 * Retorna la hora actual formateada como HH:MM.
 * @returns {string} La cadena de hora formateada.
 */
export function getCurrentTimeFormatted() {
  const today = new Date()
  const hh = String(today.getHours()).padStart(2, '0')
  const mm = String(today.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

/**
 * Obtiene los últimos N días incluyendo hoy como cadenas YYYY-MM-DD.
 * @param {number} days - Número de días a obtener.
 * @returns {string[]} Arreglo de cadenas de fecha.
 */
export function getLastNDays(days = 7) {
  const result = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    result.push(`${yyyy}-${mm}-${dd}`)
  }
  return result
}

/**
 * Evalúa el estado de un hábito para una fecha dada.
 * @param {Object} habit - El objeto hábito.
 * @param {string} dateStr - La fecha objetivo YYYY-MM-DD.
 * @param {string} currentDateStr - La fecha de hoy YYYY-MM-DD.
 * @returns {string} 'COMPLETADO', 'VENCIDO', 'PENDIENTE' o 'NO_PROGRAMADO'.
 */
export function getHabitState(habit, dateStr, currentDateStr) {
  // Verifica si el hábito está programado para el día de la semana de dateStr
  const dateObj = new Date(dateStr + 'T00:00:00') // Para evitar desfases de zona horaria
  const dayOfWeek = dateObj.getDay()
  
  // Asumimos que habit.frequency es un arreglo de números (0-6)
  if (Array.isArray(habit.frequency) && !habit.frequency.includes(dayOfWeek)) {
    return 'NO_PROGRAMADO'
  }

  // Si está marcado explícitamente como completado para esa fecha
  if (habit.records && habit.records[dateStr] === 'COMPLETADO') {
    return 'COMPLETADO'
  }

  // Si la fecha objetivo es estrictamente en el pasado (al final del día)
  if (dateStr < currentDateStr) {
    return 'VENCIDO'
  }

  // Si es la fecha actual o futura
  return 'PENDIENTE'
}
