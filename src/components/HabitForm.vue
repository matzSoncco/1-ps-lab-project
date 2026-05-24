<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-habit'])

const title = ref('')
const frequency = ref('daily')
const timeLimit = ref('23:59')
const labelsInput = ref('')

const submitForm = () => {
  if (!title.value.trim()) return

  const labels = labelsInput.value
    .split(',')
    .map(l => l.trim())
    .filter(l => l.length > 0)

  emit('add-habit', {
    title: title.value,
    frequency: frequency.value,
    timeLimit: timeLimit.value,
    labels
  })

  title.value = ''
  frequency.value = 'daily'
  timeLimit.value = '23:59'
  labelsInput.value = ''
}
</script>

<template>
  <form @submit.prevent="submitForm" class="habit-form">
    <h3>Create New Habit</h3>
    
    <div class="form-group">
      <label>Title:</label>
      <input v-model="title" type="text" placeholder="e.g., Read for 30 mins" required />
    </div>

    <div class="form-group">
      <label>Frequency:</label>
      <select v-model="frequency">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
    </div>

    <div class="form-group">
      <label>Target Time (Time Limit):</label>
      <input v-model="timeLimit" type="time" required />
    </div>

    <div class="form-group">
      <label>Labels (comma separated):</label>
      <input v-model="labelsInput" type="text" placeholder="health, learning, etc." />
    </div>

    <button type="submit" class="btn-primary">Add Habit</button>
  </form>
</template>

<style scoped>
.habit-form {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
.form-group input, .form-group select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
.btn-primary:hover {
  background: var(--primary-hover);
}
</style>