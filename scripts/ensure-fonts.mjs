// The TWK Lausanne files are licensed and stay out of git, so a Vercel build
// has no public/fonts. They are, however, served publicly by our own live
// deployment — every visitor downloads them — so a build that lacks them
// fetches them from ourselves. Local builds use the local files untouched.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
const LIVE = 'https://hudson-roadtrip.vercel.app'
const SETS = [
  ['public/fonts', ['TWKLausannePan-300.otf', 'TWKLausannePan-400.ttf', 'TWKLausannePan-500.ttf', 'TWKLausannePan-600.ttf']],
  ['montauk/public/fonts', ['TWKLausannePan-300.otf', 'TWKLausannePan-400.ttf', 'TWKLausannePan-500.ttf', 'TWKLausannePan-600.ttf']],
]
for (const [dir, files] of SETS) {
  mkdirSync(dir, { recursive: true })
  for (const f of files) {
    const path = `${dir}/${f}`
    if (existsSync(path)) continue
    const res = await fetch(`${LIVE}/fonts/${f}`)
    if (!res.ok) { console.warn(`missing ${f}: ${res.status}`); continue }
    writeFileSync(path, Buffer.from(await res.arrayBuffer()))
    console.log(`fetched ${path}`)
  }
}
