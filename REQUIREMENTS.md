# Project Requirements

This document outlines the core requirements fulfilled by the Habit Tracker MVP project.

## 1. Functional Requirements
- [x] CRUD functionality for habits.
- [x] `localStorage` persistence to prevent data loss on refresh.
- [x] Three defined states for a habit: PENDING, DONE, OVERDUE.
- [x] Calendar tracking for habit dates and time limits.
- [x] Habit creation parameters:
  - [x] Title
  - [x] Frequency (Daily default, Weekly available)
  - [x] Descriptive labels (health, entertainment, etc.)
  - [x] Custom time limit for expiration.
- [x] Status state changes:
  - [x] Checkbox click transitions state from PENDING to DONE.
  - [x] Exceeding time limit transitions state from PENDING to OVERDUE.
- [x] Data visualizations using VueChart (Chart.js) for today's snapshot and label distribution.
- [x] Weekly matrix view displaying habits over a 7-day period.

## 2. Technical Stack
- [x] Framework: Vue.js 3 (Composition API)
- [x] Charts: `vue-chartjs` & `chart.js`
- [x] Languages: JavaScript, HTML5, Vanilla CSS
- [x] Test framework: Vitest & `@vue/test-utils`

## 3. Code Standards & Architecture
- [x] No login/authentication logic included.
- [x] Modular file structure inside `src/`.
- [x] Descriptive variable/component naming with CamelCase conventions.
- [x] Separation of stylesheets into `src/styles/` for larger CSS files.
- [x] Codebase documented using JSDocs convention.
- [x] Unit tests housed entirely inside the `tests/` folder.