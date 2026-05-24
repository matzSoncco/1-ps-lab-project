/**
 * Utility functions for date and time calculations.
 */

/**
 * Returns today's date formatted as YYYY-MM-DD.
 * @returns {string} The formatted date string.
 */
export function getTodayDateString() {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

/**
 * Returns the current time formatted as HH:MM.
 * @returns {string} The formatted time string.
 */
export function getCurrentTimeFormatted() {
  const today = new Date()
  const hh = String(today.getHours()).padStart(2, '0')
  const mm = String(today.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

/**
 * Gets the last N days including today as YYYY-MM-DD strings.
 * @param {number} days - Number of days to retrieve.
 * @returns {string[]} Array of date strings.
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
 * Evaluates the state of a habit for a given date.
 * @param {Object} habit - The habit object.
 * @param {string} dateStr - The target date YYYY-MM-DD.
 * @param {string} currentDateStr - Today's date YYYY-MM-DD.
 * @param {string} currentTimeStr - Current time HH:MM.
 * @returns {string} 'DONE', 'OVERDUE', or 'PENDING'.
 */
export function getHabitState(habit, dateStr, currentDateStr, currentTimeStr) {
  // If explicitly marked as done for that date
  if (habit.records && habit.records[dateStr] === 'DONE') {
    return 'DONE'
  }

  // If the target date is strictly in the past
  if (dateStr < currentDateStr) {
    return 'OVERDUE'
  }

  // If the target date is today
  if (dateStr === currentDateStr) {
    if (currentTimeStr > habit.timeLimit) {
      return 'OVERDUE'
    }
    return 'PENDING'
  }

  // Future dates (if applicable)
  return 'PENDING'
}