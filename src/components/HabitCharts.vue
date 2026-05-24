<script setup>
import { computed } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import { Bar, Pie } from 'vue-chartjs'
import { getTodayDateString, getHabitState, getCurrentTimeFormatted } from '../utils/dateUtils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  habits: { type: Array, required: true }
})

// Compute completions today
const completionsData = computed(() => {
  const todayStr = getTodayDateString()
  const currentTime = getCurrentTimeFormatted()
  
  let done = 0
  let pending = 0
  let overdue = 0

  props.habits.forEach(h => {
    const s = getHabitState(h, todayStr, todayStr, currentTime)
    if (s === 'DONE') done++
    else if (s === 'OVERDUE') overdue++
    else pending++
  })

  return {
    labels: ['Done', 'Pending', 'Overdue'],
    datasets: [
      {
        label: 'Today\'s Habits',
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        data: [done, pending, overdue]
      }
    ]
  }
})

// Compute Labels dist
const labelsData = computed(() => {
  const labelCounts = {}
  props.habits.forEach(h => {
    h.labels.forEach(l => {
      labelCounts[l] = (labelCounts[l] || 0) + 1
    })
  })

  return {
    labels: Object.keys(labelCounts),
    datasets: [
      {
        backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'],
        data: Object.values(labelCounts)
      }
    ]
  }
})

const barOptions = { responsive: true, maintainAspectRatio: false }
const pieOptions = { responsive: true, maintainAspectRatio: false }
</script>

<template>
  <div class="charts-container">
    <div class="chart-box">
      <h3>Today's Overview</h3>
      <div class="canvas-wrapper">
        <Bar :data="completionsData" :options="barOptions" />
      </div>
    </div>
    <div class="chart-box" v-if="labelsData.labels.length > 0">
      <h3>Labels Distribution</h3>
      <div class="canvas-wrapper">
        <Pie :data="labelsData" :options="pieOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.charts-container {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.chart-box {
  flex: 1;
  min-width: 300px;
  background: var(--surface);
  padding: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
}
.chart-box h3 {
  text-align: center;
  margin-bottom: 1rem;
}
.canvas-wrapper {
  height: 250px;
  position: relative;
}
</style>