<script setup>
import { useHabits } from './composables/useHabits'
import HabitForm from './components/HabitForm.vue'
import HabitList from './components/HabitList.vue'
import WeeklyView from './components/WeeklyView.vue'
import HabitCharts from './components/HabitCharts.vue'

const { habits, addHabit, deleteHabit, toggleHabitRecord } = useHabits()

const handleAddHabit = (habitData) => {
  addHabit(habitData)
}

const handleToggle = (id, dateStr) => {
  toggleHabitRecord(id, dateStr)
}

const handleDelete = (id) => {
  deleteHabit(id)
}
</script>

<template>
  <main class="app-container">
    <header>
      <h1>Habit Tracker</h1>
      <p>Manage your daily and weekly goals.</p>
    </header>
    
    <div class="layout">
      <section class="left-col">
        <HabitForm @add-habit="handleAddHabit" />
        <HabitList 
          :habits="habits" 
          @toggle="handleToggle" 
          @delete="handleDelete" 
        />
      </section>
      
      <section class="right-col">
        <WeeklyView 
          :habits="habits" 
          @toggle="handleToggle" 
        />
        <HabitCharts 
          :habits="habits" 
        />
      </section>
    </div>
  </main>
</template>

<style scoped>
.layout {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.left-col {
  flex: 1;
  min-width: 350px;
}
.right-col {
  flex: 2;
  min-width: 400px;
}
</style>