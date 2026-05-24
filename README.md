# Habit Tracker MVP

Una aplicación minimalista y robusta para el seguimiento de hábitos, desarrollada con Vue.js 3 y que utiliza `localStorage` para la persistencia de datos. Diseñada para monitorizar objetivos diarios y semanales con marcadores de estado interactivos, etiquetas y gráficos atractivos gracias a `vue-chartjs`.

## Características
- **Hábitos CRUD:** Crea, visualiza y elimina fácilmente hábitos diarios o semanales.
- **Estados dinámicos:** Los hábitos cambian automáticamente entre `PENDING` y `OVERDUE` según límites de tiempo personalizados, o se marcan como `DONE` al interactuar con ellos.
- **Datos persistentes:** Todas las interacciones se guardan directamente en el almacenamiento local del navegador, lo que garantiza que no se pierdan datos al actualizar la página.
- **Visualización de datos:** Gráficos sencillos y elegantes que muestran resúmenes del progreso y la distribución de etiquetas para el día de hoy.
- **Matriz semanal:** Una cuadrícula con vista semanal que muestra la finalización de los hábitos durante los últimos 7 días.

## 
1. **Instalar dependencias**
   Asegúrate de tener Node.js instalado. Ejecuta el siguiente comando en la raíz del proyecto:
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo local**
   ```bash
   npm run dev
   ```
   Accede a la URL local proporcionada por Vite en tu navegador.

3. **Ejecutar pruebas unitarias**
   El proyecto incluye pruebas unitarias configuradas mediante Vitest y Vue Test Utils.
   ```bash
   npm run test
   ```

## Notas de arquitectura
- Desarrollado con la **API de composición de Vue 3**.
- El estilo se implementa con **CSS estándar**.
- La gestión del estado se basa en un componente personalizado `useHabits`.