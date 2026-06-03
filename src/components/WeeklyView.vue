<script setup>
import { computed } from 'vue'
import { getLastNDays, getHabitState, getTodayDateString } from '../utils/dateUtils'

const props = defineProps({
  habits: { type: Array, required: true }
})

const emit = defineEmits(['toggle'])

const last7Days = computed(() => getLastNDays(7))
const todayStr = getTodayDateString()

const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const getStatus = (habit, dateStr) => {
  return getHabitState(habit, dateStr, todayStr)
}

const formatDay = (dateStr) => {
  const parts = dateStr.split('-')
  return `${parts[2]}/${parts[1]}`
}

const getDayName = (dateStr) => {
  const d = new Date(dateStr + 'T00:00:00')
  return DAY_NAMES[d.getDay()]
}

const isToday = (dateStr) => dateStr === todayStr

const toggle = (habit, day) => {
  if (getStatus(habit, day) !== 'NO_PROGRAMADO') {
    emit('toggle', habit.id, day)
  }
}

const getTooltip = (status) => {
  const map = {
    'COMPLETADO': 'Completado',
    'VENCIDO': 'Vencido',
    'PENDIENTE': 'Pendiente',
    'NO_PROGRAMADO': 'No Programado'
  }
  return map[status] || status
}

/**
 * Porcentaje de completado para un hábito en los últimos 7 días.
 * @param {Object} habit
 * @returns {number|null} 0-100 o null si no hay días programados.
 */
const getHabitWeeklyRate = (habit) => {
  const scheduled = last7Days.value.filter(day => getStatus(habit, day) !== 'NO_PROGRAMADO')
  if (scheduled.length === 0) return null
  const done = scheduled.filter(day => getStatus(habit, day) === 'COMPLETADO')
  return Math.round((done.length / scheduled.length) * 100)
}

const getRateClass = (rate) => {
  if (rate >= 80) return 'rate-high'
  if (rate >= 50) return 'rate-mid'
  return 'rate-low'
}

/**
 * Cuántos hábitos están completados vs programados para un día dado.
 * @param {string} dateStr
 * @returns {{ done: number, total: number }}
 */
const getDaySummary = (dateStr) => {
  const scheduled = props.habits.filter(h => getStatus(h, dateStr) !== 'NO_PROGRAMADO')
  const done = scheduled.filter(h => getStatus(h, dateStr) === 'COMPLETADO')
  return { done: done.length, total: scheduled.length }
}
</script>

<template>
  <div class="weekly-view">
    <h2>Progreso Semanal</h2>
    <div v-if="habits.length === 0" class="empty-state">No hay hábitos para mostrar.</div>
    <div v-else class="grid-wrapper">
      <div class="grid-container">
        <!-- Header Row -->
        <div class="grid-row header-row">
          <div class="grid-cell title-cell">Hábito</div>
          <div
            v-for="day in last7Days"
            :key="day"
            class="grid-cell day-cell"
            :class="{ 'today-col': isToday(day) }"
          >
            <span class="day-name">{{ getDayName(day) }}</span>
            <span class="day-date">{{ formatDay(day) }}</span>
          </div>
          <div class="grid-cell rate-cell rate-header">Semana</div>
        </div>

        <!-- Habit Rows -->
        <div v-for="habit in habits" :key="habit.id" class="grid-row habit-row">
          <div class="grid-cell title-cell">{{ habit.title }}</div>
          <div
            v-for="day in last7Days"
            :key="day"
            class="grid-cell status-cell"
            :class="{ 'today-col': isToday(day) }"
          >
            <button
              class="status-block"
              :class="getStatus(habit, day).toLowerCase()"
              :disabled="getStatus(habit, day) === 'NO_PROGRAMADO'"
              @click="toggle(habit, day)"
              :title="getTooltip(getStatus(habit, day))"
            ></button>
          </div>
          <div class="grid-cell rate-cell">
            <span
              v-if="getHabitWeeklyRate(habit) !== null"
              class="rate-badge"
              :class="getRateClass(getHabitWeeklyRate(habit))"
            >{{ getHabitWeeklyRate(habit) }}%</span>
            <span v-else class="rate-badge rate-na">—</span>
          </div>
        </div>

        <!-- Summary Row -->
        <div class="grid-row summary-row">
          <div class="grid-cell title-cell summary-label">Por día</div>
          <div
            v-for="day in last7Days"
            :key="day"
            class="grid-cell status-cell"
            :class="{ 'today-col': isToday(day) }"
          >
            <span
              class="day-count"
              :class="{ 'all-done': getDaySummary(day).total > 0 && getDaySummary(day).done === getDaySummary(day).total }"
            >{{ getDaySummary(day).done }}/{{ getDaySummary(day).total }}</span>
          </div>
          <div class="grid-cell rate-cell"></div>
        </div>
      </div>

      <div class="legend">
        <div class="legend-item"><span class="status-block completado"></span> Completado</div>
        <div class="legend-item"><span class="status-block pendiente"></span> Pendiente</div>
        <div class="legend-item"><span class="status-block vencido"></span> Vencido</div>
        <div class="legend-item"><span class="status-block no_programado"></span> No Programado</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weekly-view {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
}
.empty-state {
  color: var(--text-muted);
  font-style: italic;
  padding: 1rem 0;
}
.grid-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.grid-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-x: auto;
}
.grid-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.header-row {
  margin-bottom: 0.25rem;
}
.grid-cell {
  flex-shrink: 0;
}

/* Habit title column */
.title-cell {
  flex: 1;
  min-width: 140px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 0.5rem;
}
.header-row .title-cell {
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
}

/* Day header cells */
.day-cell {
  width: 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 4px 2px;
  border-radius: 6px;
}
.day-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--text);
}
.day-date {
  font-size: 0.65rem;
  color: var(--text-muted);
}

/* Today column highlight */
.today-col {
  background-color: rgba(79, 70, 229, 0.06);
  border-radius: 6px;
}
.header-row .today-col .day-name {
  color: var(--primary);
}
.header-row .today-col .day-date {
  color: var(--primary);
  opacity: 0.75;
}

/* Status block cells */
.status-cell {
  width: 48px;
  display: flex;
  justify-content: center;
  padding: 3px 2px;
}
.status-block {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
}
.status-block:hover:not(:disabled) {
  transform: scale(1.15);
}
.status-block:disabled {
  cursor: not-allowed;
}

/* Status colors */
.status-block.completado  { background-color: #10B981; }
.status-block.vencido     { background-color: #EF4444; }
.status-block.pendiente   { background-color: #FBBF24; border: 2px solid #F59E0B; }
.status-block.no_programado { background-color: #E5E7EB; opacity: 0.4; }

/* Weekly rate column */
.rate-cell {
  width: 64px;
  text-align: center;
  flex-shrink: 0;
}
.rate-header {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted);
}
.rate-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 10px;
}
.rate-high { background: #D1FAE5; color: #065F46; }
.rate-mid  { background: #FEF3C7; color: #92400E; }
.rate-low  { background: #FEE2E2; color: #991B1B; }
.rate-na   { color: var(--text-muted); font-weight: normal; }

/* Per-habit row hover */
.habit-row {
  border-radius: 4px;
  transition: background 0.15s;
}
.habit-row:hover {
  background: rgba(0, 0, 0, 0.02);
}

/* Summary row */
.summary-row {
  border-top: 1px dashed var(--border-color);
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}
.summary-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
}
.day-count {
  font-size: 0.7rem;
  color: var(--text-muted);
  font-weight: 600;
}
.day-count.all-done {
  color: #10B981;
  font-weight: 700;
}

/* Legend */
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.legend-item .status-block {
  width: 16px;
  height: 16px;
  cursor: default;
  pointer-events: none;
}
</style>
