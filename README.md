# Habit Tracker MVP

A minimal, robust habit-tracking application built with Vue.js 3, utilizing `localStorage` for data persistence. Designed to track daily and weekly goals with interactive status markers, labels, and beautiful charts powered by `vue-chartjs`.

## Features
- **CRUD Habits:** Easily create, view, and delete daily or weekly habits.
- **Dynamic States:** Habits automatically transition between `PENDING` and `OVERDUE` based on custom time limits, or become `DONE` upon interaction.
- **Persistent Data:** All interactions are saved directly to browser `localStorage` ensuring no data loss upon refresh.
- **Data Visualization:** Simple and elegant charts displaying progress overviews and label distributions for today.
- **Weekly Matrix:** A weekly view grid showing habit completion across the last 7 days.

## Setup Instructions

1. **Install Dependencies**
   Ensure you have Node.js installed. Run the following command in the project root:
   ```bash
   npm install
   ```

2. **Run Local Development Server**
   ```bash
   npm run dev
   ```
   Navigate to the local URL provided by Vite in your browser.

3. **Run Unit Tests**
   The project includes unit testing configured via Vitest and Vue Test Utils.
   ```bash
   npm run test
   ```

## Architecture Notes
- Built using **Vue 3 Composition API**.
- Styling is implemented using **Vanilla CSS**.
- State management relies on a custom composable `useHabits`.