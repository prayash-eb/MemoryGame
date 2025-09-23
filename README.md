# Memory Game

A small browser-based memory matching game implemented with TypeScript and a minimal UI.

Important: TypeScript cannot run directly in the browser. You must compile the TypeScript sources before the game will work. This project already includes a build step and a serve script.

Step-by-step (required)

1. Install dependencies (one-time):

   ```bash
   npm install
   ```

2. Build and run (single command):

   ```bash
   npm start
   ```

   The `npm start` script runs the TypeScript compiler and then launches `serve` to serve the project. After the server starts, open the URL shown in the terminal (typically http://127.0.0.1:3000).

Notes

- Compiled files are emitted to `dist/` (see `tsconfig.json`). The repository's `.gitignore` excludes `dist/`, so built artifacts won't be committed.
- The `start` script is the single supported workflow for local development: it performs the required build step and serves the site.

Project structure

- `index.html`  — main playable HTML
- `style.css`   — base styles
- `src/`        — TypeScript source
  - `game.ts`
  - `ui.ts`
  - `storage.ts`
  - `index.ts`
- `package.json`, `tsconfig.json` — tooling/config

That's all — run `npm install` once, then `npm start` to build and play.


