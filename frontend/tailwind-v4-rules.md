# Stack & Design Rules

## 📦 Tailwind CSS v4 — Instalación con Vite
- Instalar con: `npm install tailwindcss @tailwindcss/vite`
- NO uses: `npx tailwindcss init`, `tailwind.config.js`, `@tailwind base/components/utilities`
- Plugin en vite.config.ts:
  ```ts
  import tailwindcss from '@tailwindcss/vite'
  export default defineConfig({ plugins: [tailwindcss()] })
  ```
- En CSS solo escribir: `@import "tailwindcss";`
- Para Context7 usa: `/tailwindlabs/tailwindcss.com`

---

## 🎨 Design System (Tailwind v4 CSS-first)

### Tokens en CSS (NO en config.js)
```css
@import "tailwindcss";

@theme {
  --color-primary-500: oklch(0.55 0.22 260);
  --color-primary-900: oklch(0.25 0.15 265);
  --font-sans: 'Geist Sans', system-ui, sans-serif;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

### Paleta moderna con oklch
- Usa `oklch()` en lugar de hex para colores más vívidos y consistentes
- Tailwind v4 usa P3 color palette por defecto

---

## 🧱 Patrones de Layout

### Contenedor responsivo
```html
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
```

### Hero centrado
```html
<section class="min-h-screen flex items-center justify-center text-center px-4">
```

### Grid responsivo
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Sidebar + Main
```html
<div class="flex min-h-screen">
  <aside class="w-64 bg-gray-900 text-white p-4"></aside>
  <main class="flex-1 p-6"></main>
</div>
```

### Sticky footer
```html
<body class="min-h-screen flex flex-col">
  <main class="flex-grow"></main>
  <footer></footer>
</body>
```

---

## 🧩 Componentes Modernos

### Card con sombra y hover
```html
<div class="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 p-6">
```

### Botón principal
```html
<button class="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold">
```

### Glassmorphism
```html
<div class="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6">
```

### Badge / Chip
```html
<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
```

---

## 📐 Tipografía
```html
<!-- Heading hero -->
<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">

<!-- Subheading -->
<p class="text-lg text-gray-600 text-pretty max-w-2xl">
```
- Usa `text-balance` en headings y `text-pretty` en párrafos
- Mobile-first: empieza sin prefijo, luego `sm:`, `md:`, `lg:`

---

## 🚫 Reglas duras
- NO usar `@apply` en proyectos nuevos v4
- NO usar `tailwind.config.js`
- NO usar `npx tailwindcss init`
- Siempre mobile-first
- Container queries con `@container` en lugar de breakpoints cuando sea posible
