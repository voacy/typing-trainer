# TypeZone

A minimalist typing speed trainer inspired by Monkeytype. Built with React and TypeScript.

## Features

- **Three modes** — words, time, quote
- **Multilingual** — English, Russian and more
- **18 themes** — dark and muted-light options
- **Punctuation & numbers** toggle
- **Live WPM & accuracy** tracking
- **Results chart** — WPM over time
- **Typing sounds** & cursor animations
- **Screenshot** results to clipboard

## Tech Stack

- React 19 + TypeScript
- Vite
- SCSS + Tailwind CSS
- Recharts
- Sonner
- html2canvas
- canvas-confetti
- use-sound

## Getting Started

```bash
npm install
npm run dev
```

## Architecture

Feature-Sliced Design (FSD):

```
src/
├── app/        # entry point, global styles
├── pages/      # TypingPage
├── features/   # typing, timer, results, theme, sounds...
├── widgets/    # Header, Results, Settings
└── shared/     # ui, lib, types, constants
```
