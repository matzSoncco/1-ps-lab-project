<script setup>
import { computed } from 'vue'
import { getHabitState, getTodayDateString, getCurrentTimeFormatted } from '../utils/dateUtils'

const props = defineProps({
  habit: { type: Object, required: true },
  dateStr: { type: String, required: true }
})

const emit = defineEmits(['toggle', 'delete'])

const todayStr = getTodayDateString()

const status = computed(() => {
  return getHabitState(props.habit, props.dateStr, todayStr, getCurrentTimeFormatted())
})

const isDone = computed(() => status.value === 'DONE')
</script>

<template>
  <div class="habit-item" :class="status.toLowerCase()">
    <div class="habit-main">
      <input 
        type="checkbox" 
        :checked="isDone" 
        @change="emit('toggle', habit.id, dateStr)" 
      />
      <div class="habit-details">
        <span class="title">{{ habit.title }}</span>
        <span class="labels" v-if="habit.labels.length">
          <span class="badge" v-for="label in habit.labels" :key="label">{{ label }}</span>
        </span>
      </div>
    </div>
    
    <div class="habit-actions">
      <span class="status-badge" :class="status.toLowerCase()">{{ status }}</span>
      <button class="btn-delete" @click="emit('delete', habit.id)">🗑️</button>
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
.habit-item.done { border-left: 4px solid var(--success); }
.habit-item.overdue { border-left: 4px solid var(--danger); }
.habit-item.pending { border-left: 4px solid var(--warning); }

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
.labels {
  display: flex;
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
.status-badge.done { background: #D1FAE5; color: #065F46; }
.status-badge.overdue { background: #FEE2E2; color: #991B1B; }
.status-badge.pending { background: #FEF3C7; color: #92400E; }
.btn-delete {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}
</style>