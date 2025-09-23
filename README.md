# Memory Game

A small browser-based memory matching game implemented with TypeScript and a minimal UI. 

## What it is

- A simple card matching game: flip cards, find matching pairs, and track scores.
- Built with TypeScript for the game logic and plain HTML/CSS for the UI

## Quick start

You can run the game one of two ways:

1. Open the game directly in your browser:

	- Open `MemoryGame/index.html` in your browser (no build step required for the static bundle version).

2. (Optional) Build from source and serve locally:

	- Install dependencies (if present in `package.json`):

```bash
npm install
```

	- Compile TypeScript (if you want to build from the `src/` files):

```bash
npx tsc
```

	- Serve the `MemoryGame/` folder using a static server (example):

```bash
npx http-server MemoryGame -p 8080
# or
python3 -m http.server 8080 --directory MemoryGame
```

## Development notes

- Source files are under `src/` and include `game.ts`, `ui.ts`, `storage.ts`, and an entry `index.ts`.
- The top-level `index.html` in the `MemoryGame/` folder is the playable build/entry.


## Project structure

MemoryGame/
- index.html        # main playable HTML
- package.json      # (optional) scripts & dependencies
- tsconfig.json     # TypeScript config
- style.css         # base styles
- src/              # TypeScript source files
  - game.ts
  - index.ts
  - storage.ts
  - ui.ts


