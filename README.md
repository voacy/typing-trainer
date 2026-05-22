# typezone

Typing trainer for people who care about their setup.
Clean interface, mechanical keyboard sounds, 170+ themes.

→ [typing-trainer-sigma.vercel.app](https://typing-trainer-sigma.vercel.app)

---

## start

```bash
npm install
npm run dev
```

---

## stack

React 19 · TypeScript 6 · Vite 8 · Howler · Recharts · Radix UI · SCSS

---

## structure

```
features/typing        keyboard input, word validation, letter states
features/sounds        Howler singleton — one instance, shared everywhere
features/timer         countdown and elapsed tracking
features/results       WPM and accuracy calculation
features/theme         170+ themes via CSS custom properties
features/cursor        pixel-perfect caret positioning
features/textScroll    3-line scroll logic
widgets/Toolbar        mode, count, language, punctuation controls
widgets/Results        stats screen with per-second WPM chart
pages/TypingPage       useSession — single source of truth for a test
```

---

## how it works

A test is owned entirely by `useSession`.
It holds words, timer, typing state, and results.
Components only read — they never write to each other.

Themes switch by setting `data-theme` on `<html>`.
No re-renders. No JS on switch. Just CSS variables.

Sound runs through a module-level Howler singleton.
Every component that calls `useGameSounds()` gets the same instance.
Volume changes apply globally and immediately via `Howler.volume()`.

Settings persist to `localStorage` automatically.
No backend. No accounts. Nothing leaves the browser.
