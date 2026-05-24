<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-habit'])

const title = ref('')
const selectedDays = ref([1, 2, 3, 4, 5, 6, 0]) // Todos los días por defecto
const timeLimit = ref('08:00') // Hora de recordatorio por defecto
const selectedLabels = ref([])
const newLabel = ref('')

const daysOfWeek = [
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
  { value: 0, label: 'Domingo' }
]

const availableLabels = ref(['Salud', 'Educación', 'Deporte', 'Entretenimiento', 'Trabajo'])

const addNewLabel = () => {
  const label = newLabel.value.trim()
  if (label && !availableLabels.value.includes(label)) {
    availableLabels.value.push(label)
    selectedLabels.value.push(label)
    newLabel.value = ''
  }
}

const submitForm = () => {
  if (!title.value.trim() || selectedDays.value.length === 0) return

  emit('add-habit', {
    title: title.value,
    frequency: [...selectedDays.value],
    timeLimit: timeLimit.value,
    labels: [...selectedLabels.value]
  })

  // Reset form
  title.value = ''
  selectedDays.value = [1, 2, 3, 4, 5, 6, 0]
  timeLimit.value = '08:00'
  selectedLabels.value = []
  newLabel.value = ''
}
</script>

<template>
  <form @submit.prevent="submitForm" class="habit-form">
    <h3>Crear Nuevo Hábito</h3>
    
    <div class="form-group">
      <label>Título:</label>
      <input v-model="title" type="text" placeholder="Ej. Leer por 30 mins" required />
    </div>

    <div class="form-group">
      <label>Días de la semana:</label>
      <div class="days-checkboxes">
        <label v-for="day in daysOfWeek" :key="day.value" class="checkbox-label">
          <input type="checkbox" :value="day.value" v-model="selectedDays" />
          {{ day.label }}
        </label>
      </div>
      <small v-if="selectedDays.length === 0" class="error-text">Debe seleccionar al menos un día.</small>
    </div>

    <div class="form-group">
      <label>Hora del Recordatorio:</label>
      <input v-model="timeLimit" type="time" required title="Hora en la que se debería recordar la tarea" />
      <small class="help-text">Solo como referencia. El hábito vencerá al final del día.</small>
    </div>

    <div class="form-group">
      <label>Etiquetas:</label>
      <div class="labels-selection">
        <label v-for="label in availableLabels" :key="label" class="checkbox-label">
          <input type="checkbox" :value="label" v-model="selectedLabels" />
          {{ label }}
        </label>
      </div>
      <div class="new-label-group">
        <input v-model="newLabel" type="text" placeholder="Nueva etiqueta..." @keydown.enter.prevent="addNewLabel" />
        <button type="button" @click="addNewLabel" class="btn-secondary">Añadir</button>
      </div>
    </div>

    <button type="submit" class="btn-primary" :disabled="selectedDays.length === 0">Añadir Hábito</button>
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
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
.form-group input[type="text"], .form-group input[type="time"] {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}
.days-checkboxes, .labels-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: normal;
  font-size: 0.85rem;
  cursor: pointer;
}
.new-label-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.new-label-group input {
  flex: 1;
}
.btn-secondary {
  background: #E5E7EB;
  border: none;
  border-radius: 4px;
  padding: 0 1rem;
  cursor: pointer;
}
.btn-secondary:hover {
  background: #D1D5DB;
}
.help-text {
  font-size: 0.75rem;
  color: #6B7280;
  margin-top: 0.2rem;
}
.error-text {
  font-size: 0.75rem;
  color: #EF4444;
  margin-top: 0.2rem;
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
.btn-primary:disabled {
  background: #9CA3AF;
  cursor: not-allowed;
}
</style>
