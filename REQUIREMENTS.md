# Requisitos del proyecto

Este documento describe los requisitos principales que cumple el proyecto Habit Tracker MVP.

## 1. Requisitos funcionales
- [x] Funcionalidad CRUD para hábitos.
- [x] Persistencia en `localStorage` para evitar la pérdida de datos al actualizar.
- [x] Tres estados definidos para un hábito: PENDIENTE, COMPLETADO, VENCIDO.
- [x] Seguimiento en calendario para fechas y límites de tiempo de los hábitos.
- [x] Parámetros de creación de hábitos:
  - [x] Título
  - [x] Frecuencia (Diaria por defecto, Semanal disponible)
  - [x] Etiquetas descriptivas (salud, entretenimiento, etc.)
  - [x] Límite de tiempo personalizado para la expiración.
- [x] Cambios de estado:
  - [x] Al hacer clic en la casilla de verificación, el estado cambia de PEDNING a DONE.
  - [x] Si se supera el límite de tiempo, el estado cambia de PEDING a OVERDUE.
- Visualizaciones de datos con VueChart (Chart.js) para la instantánea del día y la distribución de etiquetas.
- [x] Vista matricial semanal que muestra los hábitos durante un período de 7 días.

## 2. Tecnologías utilizadas
- [x] Framework: Vue.js 3 (API de composición)
- [x] Gráficos: `vue-chartjs` y `chart.js`
- [x] Lenguajes: JavaScript, HTML5, CSS puro
- [x] Framework de pruebas: Vitest y `@vue/test-utils`
- [x] Agente: Gemini 3.1 Pro dentro del IDE VSCode

## 3. Estándares y arquitectura del código
- [x] No incluye lógica de inicio de sesión/autenticación.
- [x] Estructura de archivos modular dentro de `src/`.
- [x] Nombres descriptivos de variables/componentes con convención CamelCase.
- [x] Separación de hojas de estilo en `src/styles/` para archivos CSS de mayor tamaño.
- [x] El código fuente está documentado utilizando la convención JSDocs.
- [x] Las pruebas unitarias se encuentran completamente dentro de la carpeta `tests/`.