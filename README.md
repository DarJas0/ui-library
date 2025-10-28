## UI Library (React + TypeScript + Vite + Storybook + Tailwind v4)

A small component library featuring a Button, Header, and an upgraded Alert (popup-style) component. Built with React, TypeScript, Storybook, and Tailwind CSS v4.

### Tech stack
- **React + TypeScript**
- **Vite** (dev/build)
- **Storybook** (component docs)
- **Tailwind CSS v4** (utility styling)

### Quick start
- **Install**
```bash
npm i
```
- **Run app (Vite)**
```bash
npm run dev
```
- **Run Storybook**
```bash
npm run storybook
```
- **Build**
```bash
npm run build
```

### Tailwind CSS (v4) setup
- Global import is in `src/styles/tailwind.css`:
```css
@import "tailwindcss";
```
- App entry imports Tailwind in `src/main.tsx`:
```ts
import './styles/tailwind.css';
```
- Vite integrates Tailwind via plugin in `vite.config.ts`:
```ts
import tailwind from '@tailwindcss/vite';
// ...
plugins: [react(), tailwind()],
```
- Storybook also loads Tailwind:
  - Plugin in `.storybook/main.ts`
  - CSS import in `.storybook/preview.ts`

Optional brand tokens are defined in `tailwind.config.ts` under `theme.extend.colors.brand` (e.g., `brand.red`, `brand.purple`).

### Components
- **Button**: `color` ("red" | "purple"), `variant` ("solid" | "outline"), `size` ("small" | "medium" | "large").
- **Header**: responsive layout, uses Button color scheme for actions (Log in/Sign up/Log out).
- **Alert**: `variant` ("info" | "success" | "warning" | "error"), optional `dismissible`, `onClose`.

Example (dismissible Alert):
```tsx
<Alert title="Heads up" variant="info" dismissible onClose={() => console.log('closed')}>
  Message body goes here.
<\/Alert>
```

### Attribution (sources and licenses)
- **Heroicons (alert icons)**
  - Source: `https://heroicons.com` (Tailwind Labs)
  - License: MIT — `https://github.com/tailwindlabs/heroicons/blob/master/LICENSE`
  - Icons used: information-circle, check-circle, exclamation-triangle, x-circle (20px)

- **Storybook example SVG (Header logo)**
  - Source: Storybook React + Vite template (Example/Header)
  - Repo: `https://github.com/storybookjs/storybook`
  - License: MIT — `https://github.com/storybookjs/storybook/blob/next/LICENSE`

### Scripts
- **dev**: Vite dev server
- **storybook**: Storybook dev server
- **build**: Type-check and Vite build

### Notes
- Tailwind v4 uses a single global `@import "tailwindcss";` instead of `@tailwind base; @tailwind components; @tailwind utilities;`.
- The Header and Alert are styled to align with the Button’s brand colors (red gradient `#FF5050 → #FF6A6A`, purple `#4C28D3`).
