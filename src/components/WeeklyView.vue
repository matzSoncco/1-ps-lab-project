<script setup>
import { computed } from 'vue'
import { getLastNDays, getHabitState, getTodayDateString } from '../utils/dateUtils'

const props = defineProps({
  habits: { type: Array, required: true }
})

const emit = defineEmits(['toggle'])

const last7Days = computed(() => getLastNDays(7))
const todayStr = getTodayDateString()

const getStatus = (habit, dateStr) => {
  return getHabitState(habit, dateStr, todayStr)
}

const formatDay = (dateStr) => {
  const parts = dateStr.split('-')
  return `${parts[2]}/${parts[1]}`
}

const toggle = (habit, day) => {
  if (getStatus(habit, day) !== 'NO_PROGRAMADO') {
    emit('toggle', habit.id, day)
  }
}

// Tooltips for status
const getTooltip = (status) => {
  const map = {
    'COMPLETADO': 'Completado',
    'VENCIDO': 'Vencido',
    'PENDIENTE': 'Pendiente',
    'NO_PROGRAMADO': 'No Programado'
  }
  return map[status] || status
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
          <div v-for="day in last7Days" :key="day" class="grid-cell day-cell">
            {{ formatDay(day) }}
          </div>
        </div>
        
        <!-- Habit Rows -->
        <div v-for="habit in habits" :key="habit.id" class="grid-row">
          <div class="grid-cell title-cell">{{ habit.title }}</div>
          <div v-for="day in last7Days" :key="day" class="grid-cell status-cell">
            <button 
              class="status-block" 
              :class="getStatus(habit, day).toLowerCase()"
              :disabled="getStatus(habit, day) === 'NO_PROGRAMADO'"
              @click="toggle(habit, day)"
              :title="getTooltip(getStatus(habit, day))"
            ></button>
          </div>
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
  gap: 0.5rem;
  overflow-x: auto;
}
.grid-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.header-row {
  margin-bottom: 0.5rem;
}
.grid-cell {
  flex-shrink: 0;
}
.title-cell {
  flex: 1;
  min-width: 150px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.header-row .title-cell {
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
}
.day-cell {
  width: 40px;
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
}
.status-cell {
  width: 40px;
  display: flex;
  justify-content: center;
}
.status-block {
  width: 24px;
  height: 24px;
  border-radius: 4px;
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

/* Colors for status */
.status-block.completado { background-color: #10B981; }
.status-block.vencido { background-color: #EF4444; }
.status-block.pendiente { background-color: #FBBF24; border: 2px solid #F59E0B; }
.status-block.no_programado { background-color: #E5E7EB; opacity: 0.5; }

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
}
.legend-item .status-block:hover {
  transform: none;
}
</style>
