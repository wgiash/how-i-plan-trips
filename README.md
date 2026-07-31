# How I plan trips

Trip plans built as small one-page React apps and shared with friends. What started as one Hudson Valley page is now a small collection: a hub site with each trip living under its own path, all deployed together.

**Hub** — https://hudson-roadtrip.vercel.app
**Hudson Valley** — https://hudson-roadtrip.vercel.app/hudson/
**Montauk** — https://hudson-roadtrip.vercel.app/montauk/

## How the repo is laid out

Each trip is its own Vite app with its own `package.json`, built under its own base path. A build script assembles everything into one deployable `dist/`.

```
/            the Hudson Valley app (the original, base /hudson/)
/montauk     the Montauk app (base /montauk/)
/site        hub assets (landing og image)
/scripts     ensure-fonts + finish-dist (assembles dist/: hub, /hudson, /montauk, shared /fonts)
```

`npm run build` at the root builds it all: Hudson into `dist/hudson`, Montauk into `dist/montauk`, then `finish-dist.mjs` writes the hub page and shared assets. Vercel serves the result as one static deploy.

## The trips

- **Hudson Valley** (`/hudson/`) — two day-trip options (Beacon + Cold Spring, or Cold Spring + Innisfree/Millbrook) you can tab between, with drive times that open the real Google Maps route.
- **Montauk** (`/montauk/`) — a single train-based day: lighthouse, lunch, Kirk Park Beach, then the village before the 5:15 home. Light cream theme.

Both share the same format: timed stops, photo pairs that alternate sides, superscripted sources, and a scroll-condensing header. Each app ships its own link-preview card (`public/og.png`).

## Stack

- React + Vite
- Framer Motion (scroll-linked header morph, tab transitions, layout animations)
- Lenis smooth scrolling
- Designs ported 1:1 from Paper.design mocks

## Note on fonts

The sites use TWK Lausanne Pan, which is a licensed font and not included in this repo (`public/fonts/` is gitignored). Builds from source fall back to Inter/system-ui.

## Run

```sh
npm install && npm run dev                 # Hudson Valley (root app)
cd montauk && npm install && npm run dev   # Montauk
npm run build                              # full assembly: hub + both apps in dist/
```

## Gotcha worth remembering

Anything referenced from a runtime-built string (like the photo URLs) must be prefixed with `import.meta.env.BASE_URL`. Vite only rewrites paths it can see statically, and each app lives under a base path here, not at the domain root.
