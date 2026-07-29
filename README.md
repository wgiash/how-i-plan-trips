# How I plan trips

Trip plans built as small one-page React apps and shared with friends.

One site — **https://roadtrips.vercel.app**
**Hudson Valley** — https://roadtrips.vercel.app/hudson
**Montauk** — https://roadtrips.vercel.app/montauk

## The trips

- **Hudson Valley** (`/hudson`) — two day-trip options (Beacon + Cold Spring, or Cold Spring + Innisfree/Millbrook) you can tab between, with drive times that open the real Google Maps route.
- **Montauk** (`/montauk`) — a single train-based day: lighthouse, lunch, Kirk Park Beach, then the village before the 5:15 home. Light cream theme.

Both share the same format: timed stops, photo pairs that alternate sides, superscripted sources, and a scroll-condensing header.

## Stack

- React + Vite
- Framer Motion (scroll-linked header morph, tab transitions, layout animations)
- Lenis smooth scrolling
- Designs ported 1:1 from Paper.design mocks

## Note on fonts

The sites use TWK Lausanne Pan, which is a licensed font and not included in this repo (`public/fonts/` is gitignored). Builds from source fall back to Inter/system-ui.

## Run

```sh
npm install && npm run dev          # Hudson Valley
cd montauk && npm install && npm run dev   # Montauk
```
