<script setup>
import { computed } from 'vue'
import { getLastNDays, getHabitState, getCurrentTimeFormatted, getTodayDateString } from '../utils/dateUtils'

const props = defineProps({
  habits: { type: Array, required: true }
})

const emit = defineEmits(['toggle'])

const last7Days = computed(() => getLastNDays(7))
const todayStr = getTodayDateString()
const currentTimeStr = getCurrentTimeFormatted()

const getStatus = (habit, dateStr) => {
  return getHabitState(habit, dateStr, todayStr, currentTimeStr)
}
</script>

<template>
  <div class="weekly-view">
    <h2>Weekly Progress</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Habit</th>
            <th v-for="day in last7Days" :key="day">
              {{ day.split('-').slice(1).join('/') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="habit in habits" :key="habit.id">
            <td class="habit-title">{{ habit.title }}</td>
            <td v-for="day in last7Days" :key="day" class="cell-status">
              <input 
                type="checkbox" 
                :checked="getStatus(habit, day) === 'DONE'" 
                @change="emit('toggle', habit.id, day)" 
              />
            </td>
          </tr>
        </tbody>
      </table>
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
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
}
th {
  background: var(--bg-color);
  font-weight: 600;
  font-size: 0.9rem;
}
td.habit-title {
  text-align: left;
  font-weight: 600;
}
.cell-status input {
  transform: scale(1.2);
  cursor: pointer;
}
</style>