// Assemble the combined site: both trips under their paths, fonts shared at
// the root (the CSS points at /fonts absolutely), and a landing at /.
import { cpSync, writeFileSync, existsSync } from 'node:fs'

// absolute /fonts references resolve at the domain root for both apps
if (existsSync('public/fonts')) cpSync('public/fonts', 'dist/fonts', { recursive: true })
if (existsSync('montauk/public/fonts')) cpSync('montauk/public/fonts', 'dist/fonts', { recursive: true })
cpSync('public/favicon.svg', 'dist/favicon.svg')
cpSync('site/og.png', 'dist/og.png')

writeFileSync('dist/index.html', `<!doctype html>
<html lang="en" style="background:#0e0e0e">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0e0e0e" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
    <title>Roadtrips</title>
    <meta name="description" content="Trip plans built as small one-page apps." />
    <meta property="og:title" content="Roadtrips" />
    <meta property="og:description" content="Trip plans built as small one-page apps." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://roadtrips.vercel.app" />
    <meta property="og:image" content="https://roadtrips.vercel.app/og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://roadtrips.vercel.app/og.png" />
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-content: center; gap: 28px;
             font-family: 'TWK Lausanne Pan', Inter, system-ui, sans-serif; color: #eee; }
      @font-face { font-family: 'TWK Lausanne Pan'; src: url('/fonts/TWKLausannePan-300.otf'); font-weight: 300; }
      h1 { font-size: 15px; font-weight: 400; letter-spacing: .14em; text-transform: uppercase;
           color: #888; margin: 0; }
      a { display: block; color: #eee; text-decoration: none; font-size: 32px; font-weight: 300;
          padding: 6px 0; border-bottom: 1px solid #2a2a2a; }
      a:hover { color: #fff; border-color: #555; }
      a span { font-size: 13px; color: #777; display: block; margin-top: 2px; }
    </style>
  </head>
  <body>
    <h1>Roadtrips</h1>
    <div>
      <a href="/hudson">Hudson Valley<span>Beacon + Cold Spring, two ways</span></a>
      <a href="/montauk">Montauk<span>lighthouse, lunch, beach, the 5:15 home</span></a>
    </div>
  </body>
</html>
`)
console.log('dist assembled: /, /hudson, /montauk, shared /fonts')
