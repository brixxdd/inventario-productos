---
name: tailwind-v4
description: Instala, configura y aplica Tailwind CSS v4 con Vite siguiendo las mejores prácticas modernas (CSS-first, Oklch, Glassmorphism). Usar cuando se requiera UI "Demasiado Pro", componentes avanzados o resolver configuración de Tailwind v4. Nunca usar v3.
---

# Tailwind CSS v4 — Skill Avanzado (Pro UI)

## 🎯 Cuándo usar esta skill
- El usuario quiere instalar o configurar Tailwind CSS v4.
- Peticiones de UI "Pro", moderna, estética o premium.
- Menciones de Glassmorphism, colores vívidos, animaciones suaves o componentes modernos.
- Errores de Tailwind (para asegurar que no se estén usando patrones obsoletos de v3).

---

## 📦 1. Instalación y Configuración (Vite)

La versión 4 es "CSS-first". No requiere `tailwind.config.js`.

### Comandos de instalación
```bash
npm install tailwindcss @tailwindcss/vite
```

### Configuración en `vite.config.ts` o `vite.config.js`
```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

### Punto de entrada CSS (ej. `index.css`)
```css
@import "tailwindcss";
```

### 🚫 Patrones Prohibidos (Legado v3)
- ❌ `npx tailwindcss init`
- ❌ Crear o modificar `tailwind.config.js`
- ❌ `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`
- ❌ Instalar `postcss` o `autoprefixer` por separado
- ❌ Uso de `@apply` en proyectos nuevos

> **Nota para LLMs (Context7)**: Para buscar documentación, usa el endpoint `/tailwindlabs/tailwindcss.com`.

---

## 🎨 2. Design System: Variables y Temas (CSS-First)

Toda la personalización del tema se hace directamente en el CSS principal usando la directiva `@theme`.

```css
@import "tailwindcss";

@theme {
  /* Paleta moderna con OKLCH para colores más vívidos y consistentes */
  --color-primary-100: oklch(0.95 0.05 260);
  --color-primary-500: oklch(0.55 0.22 260);
  --color-primary-900: oklch(0.25 0.15 265);
  
  --font-sans: 'Geist Sans', 'Inter', system-ui, sans-serif;
  
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
}
```
*💡 Emplea `oklch()` en lugar de Hex/RGB. Tailwind v4 usa P3 color gamut nativamente.*

---

## 🧱 3. Patrones de Layout

### Contenedor Principal (Responsivo)
```html
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
```

### Hero Moderno Centrado
```html
<section class="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
  <!-- Opcional: Gradiente de fondo sutil -->
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-100/50 via-white to-white -z-10"></div>
</section>
```

### Grid Adaptativo (Cards/Productos)
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

### Sidebar + Main Layout
```html
<div class="flex min-h-screen bg-gray-50/50">
  <aside class="w-64 shrink-0 bg-gray-900/95 backdrop-blur-xl text-white p-6 shadow-2xl z-20 hidden md:flex flex-col"></aside>
  <main class="flex-1 p-6 md:p-8 xl:p-12 overflow-y-auto relative"></main>
</div>
```

---

## 🧩 4. Componentes Premium (UI "Demasiado Pro")

### Tarjeta (Card) con Sombra Avanzada y Hover
```html
<div class="rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100">
```

### Tarjeta Glassmorphism (Fondo Vidrio Esmerilado)
```html
<div class="backdrop-blur-md bg-white/60 border border-white/40 shadow-lg rounded-2xl p-6 relative overflow-hidden">
  <!-- Elemento decorativo de brillo -->
  <div class="absolute -right-10 -top-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl"></div>
</div>
```

### Botón Principal Dinámico
```html
<button class="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-900 shadow-md hover:shadow-xl active:scale-95 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
  <!-- Icono genérico de ejemplo -->
  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
  <span>Confirmar</span>
</button>
```

### Botón Secundario (Outline / Ghost)
```html
<button class="border border-gray-200 text-gray-700 bg-white/50 backdrop-blur-sm hover:bg-gray-50 hover:border-gray-300 px-6 py-3 rounded-xl font-semibold shadow-sm transition-all duration-300">
```

### Badge / Chip Elegante
```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200/50">
```

### Input Inteligente (Moderno)
```html
<input class="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all shadow-sm" placeholder="Escribe aquí...">
```

---

## 📐 5. Tipografía y Espaciado

```html
<!-- Título Principal (Hero) -->
<h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-balance text-gray-900 leading-tight">

<!-- Subtítulo -->
<h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">

<!-- Párrafo Descriptivo -->
<p class="text-lg text-gray-600 text-pretty max-w-2xl leading-relaxed">
```
*💡 Regla de oro: `text-balance` para Títulos/Encabezados (distribuye las líneas equitativamente) y `text-pretty` para Párrafos (evita viudas/palabras huérfanas).*

---

## 🚦 6. Árbol de Decisiones (Troubleshooting & Mejora)

| Requerimiento | Solución Tailwind v4 |
|--------------|----------------------|
| **Setup inicial** | Usar `@tailwindcss/vite` e importar en el CSS. Cero `.config.js`. |
| **Definir colores de marca** | Bloque `@theme` en el archivo CSS global con valores `oklch()`. |
| **"Se ve aburrido"** | Añadir sombras (`shadow-md`), esquinas redondeadas (`rounded-2xl`), y micro-animaciones (`transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`). |
| **Efecto de Vidrio** | `backdrop-blur-md bg-white/50 border border-white/40` |
| **Diseño adaptable** | Enfoque mobile-first. Comienza con clases base y aplica sufijos `sm:`, `md:`, `lg:` hacia arriba. Usa `@container` para componentes. |
| **Problemas de consistencia** | No usar `@apply` para pseudo-componentes CSS. Extrae componentes en React/Vue/Svelte en su lugar. |
