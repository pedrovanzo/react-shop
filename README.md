# React Shop

Pedro Vanzo's Skill Shop: a personal project where you browse frontend concepts as skills and equip them into a build.

Live: https://react-shop-alpha-sage.vercel.app/

Built with React 19, TypeScript, Vite, Tailwind CSS v4 and React Router.

## Running locally

```sh
npm install
npm run dev
```

Other scripts:

- `npm run build`: type-check and build for production into `dist/`
- `npm run preview`: serve the production build locally
- `npm run lint`: run ESLint

## Feature flags

Feature flags are read from a `.env` file at the project root. The file is gitignored, so create it after cloning.

```sh
FEATURE_FLAG_SANDBOX=true
FEATURE_FLAG_SNAKE=false
FEATURE_FLAG_MENU=true
```

| Variable | Controls | Default |
|---|---|---|
| `FEATURE_FLAG_SANDBOX` | Sandbox page and its menu link | off |
| `FEATURE_FLAG_SNAKE` | Snake game page | on |
| `FEATURE_FLAG_MENU` | Feature flag page and its menu link | off |

- A flag missing from `.env` uses its default.
- Flags are read when the dev server starts, so restart it after changing `.env`.
- Only variables prefixed with `FEATURE_FLAG_` reach the browser (see `envPrefix` in `vite.config.ts`). Never put secrets in them.

### Adding a flag

1. Add it to `FEATURE_FLAG_DEFINITIONS` in `src/lib/featureFlags.ts` (env var, default, description).
2. Wrap the UI in `<FeatureEnabled featureFlag="NAME">` (`src/components/feature/featureEnabled.tsx`), or check `FEATURE_FLAGS.NAME` directly, for example to register a route only when enabled.
3. Set it in `.env` if it should differ from the default.

The Options page (`/options`) lists every flag with its current value and default.

## Contact widget

A draggable button sits in a corner of every page. Click it to open the contact links (`src/data/contactLinks.ts`). Drag it to snap it to another corner; the position is remembered.

## Components library

`/components` previews the app's UI components, grouped by type. To add a section, add an entry to `src/pages/components/sections.ts` with a preview component from `src/pages/components/previews/`.

## Project structure

```
src/
  components/   reusable UI (button, modal, list items, loading states, navbar, timeline, contact widget)
  contexts/     React context providers (build, theme)
  data/         skill data, history timeline, contact links
  hooks/        custom hooks (useSimulatedLoading)
  lib/          plain helpers (feature flags, theme, favicon, skill URLs)
  pages/        one folder per route, entry file page.tsx
```

There is no backend. Loading states are simulated with `useSimulatedLoading` to showcase loading feedback, and the build (equipped skills) is saved in `localStorage`.
