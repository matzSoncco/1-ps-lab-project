<script setup>
import HabitItem from './HabitItem.vue'
import { getTodayDateString } from '../utils/dateUtils'

const props = defineProps({
  habits: { type: Array, required: true }
})
const emit = defineEmits(['toggle', 'delete'])

const todayStr = getTodayDateString()
</script>

<template>
  <div class="habit-list">
    <h2>Hábitos de Hoy</h2>
    <p v-if="habits.length === 0" class="empty">No hay hábitos definidos aún.</p>
    <div v-else>
      <HabitItem 
        v-for="habit in habits" 
        :key="habit.id" 
        :habit="habit"
        :dateStr="todayStr"
        @toggle="(id, date) => emit('toggle', id, date)"
        @delete="(id) => emit('delete', id)"
      />
    </div>
  </div>
</template>

<style scoped>
.habit-list {
  margin-bottom: 2rem;
}
.empty {
  color: var(--text-muted);
  font-style: italic;
}
</style>
