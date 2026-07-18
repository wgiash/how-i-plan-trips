# How I plan trips

A one-page trip plan for a Hudson Valley day out, built as a small React app and shared with friends.

**Live:** https://hudson-roadtrip.vercel.app

Two day-trip options (Beacon + Cold Spring, or Cold Spring + Innisfree/Millbrook) with drive times that open the real Google Maps route, photos, community-sourced tips, and a scroll-condensing header.

## Stack

- React + Vite
- Framer Motion (scroll-linked header morph, tab transitions, layout animations)
- Lenis smooth scrolling
- Design ported 1:1 from a Paper.design mock

## Note on fonts

The site uses TWK Lausanne Pan, which is a licensed font and not included in this repo (`public/fonts/` is gitignored). Builds from source fall back to Inter/system-ui.

## Run

```sh
npm install
npm run dev
```
