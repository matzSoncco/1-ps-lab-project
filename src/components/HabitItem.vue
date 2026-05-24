<script setup>
import { computed } from 'vue'
import { getHabitState, getTodayDateString } from '../utils/dateUtils'

const props = defineProps({
  habit: { type: Object, required: true },
  dateStr: { type: String, required: true }
})

const emit = defineEmits(['toggle', 'delete'])

const todayStr = getTodayDateString()

const status = computed(() => {
  return getHabitState(props.habit, props.dateStr, todayStr)
})

const isDone = computed(() => status.value === 'COMPLETADO')
const isNotScheduled = computed(() => status.value === 'NO_PROGRAMADO')
</script>

<template>
  <div class="habit-item" :class="status.toLowerCase()">
    <div class="habit-main">
      <input 
        v-if="!isNotScheduled"
        type="checkbox" 
        :checked="isDone" 
        @change="emit('toggle', habit.id, dateStr)" 
      />
      <div class="habit-details">
        <span class="title">{{ habit.title }}</span>
        <span class="reminder">🔔 {{ habit.timeLimit }}</span>
        <span class="labels" v-if="habit.labels.length">
          <span class="badge" v-for="label in habit.labels" :key="label">{{ label }}</span>
        </span>
      </div>
    </div>
    
    <div class="habit-actions">
      <span v-if="!isNotScheduled" class="status-badge" :class="status.toLowerCase()">{{ status }}</span>
      <span v-else class="status-badge no_programado">No programado hoy</span>
      <button class="btn-delete" @click="emit('delete', habit.id)" title="Eliminar hábito">🗑️</button>
    </div>
  </div>
</template>

<style scoped>
.habit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  margin-bottom: 0.5rem;
  transition: all 0.2s;
}
.habit-item.completado { border-left: 4px solid var(--success); }
.habit-item.vencido { border-left: 4px solid var(--danger); }
.habit-item.pendiente { border-left: 4px solid var(--warning); }
.habit-item.no_programado { border-left: 4px solid #9CA3AF; opacity: 0.7; }

.habit-main {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.habit-details {
  display: flex;
  flex-direction: column;
}
.title { font-weight: 600; }
.reminder { font-size: 0.8rem; color: #6B7280; }
.labels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.25rem;
}
.badge {
  font-size: 0.7rem;
  background: #E5E7EB;
  padding: 0.1rem 0.4rem;
  border-radius: 12px;
}
.habit-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.status-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
}
.status-badge.completado { background: #D1FAE5; color: #065F46; }
.status-badge.vencido { background: #FEE2E2; color: #991B1B; }
.status-badge.pendiente { background: #FEF3C7; color: #92400E; }
.status-badge.no_programado { background: #F3F4F6; color: #4B5563; font-weight: normal; }

.btn-delete {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}
.btn-delete:hover {
  transform: scale(1.1);
}
</style>
