# Memory Game

A small browser-based memory matching game implemented with TypeScript and a minimal UI.

## Quick start

- Play immediately: open `index.html` in your browser (no build step required).

- Optional development workflow:
  1. Install dependencies (if you plan to edit or build):

     npm install

  2. Compile TypeScript (to emit files into the project):

     npx tsc

  3. Serve the folder with a static server (example):

     npx http-server . -p 8080
     # or
     python3 -m http.server 8080

## Project structure

Files you care about:

- `index.html`  — main playable HTML
- `style.css`   — base styles
- `src/`        — TypeScript source
  - `game.ts`
  - `ui.ts`
  - `storage.ts`
  - `index.ts`
- `package.json`, `tsconfig.json` — optional tooling/config

That's it — open `index.html` to play, or run the optional steps above to develop locally.


