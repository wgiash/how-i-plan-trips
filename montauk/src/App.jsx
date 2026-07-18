import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import Wordmark from './Wordmark'
import { PLAN, FOOTER_TEXT, L400, L500, INTER } from './data'

// ---------- motion variants ----------

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.1, 0, 0.1, 1] } },
}

// The plan's blocks (THE PLAN, transit, each stop, callout) cascade in one at a
// time, starting just after the hero so it reads as a continuous top-down flow.
const sectionStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.32 } },
}

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.1, 0, 0.1, 1] } },
}

const TITLE_TEXT = 'Montauk Trip 𓆉 ❀⋆.ೃ࿔*'

// ---------- atoms ----------

// A bullet is a string, or an array of parts where a part is either a string or
// { biz, n } — a named business followed by a superscript ref number.
function renderBullet(content) {
  if (typeof content === 'string') return content
  return content.map((seg, i) =>
    typeof seg === 'string' ? (
      <span key={i}>{seg}</span>
    ) : (
      <span key={i} style={{ whiteSpace: 'nowrap' }}>
        {seg.biz}
        <a
          className="sup"
          href="#sources"
          style={{ color: '#948B77', fontFamily: L500, fontSize: '0.7em', fontWeight: 500, verticalAlign: 'super', marginLeft: '1px', textDecoration: 'none' }}
        >
          {seg.n}
        </a>
      </span>
    ),
  )
}

function Bullet({ content }) {
  return (
    <div style={{ alignSelf: 'stretch', display: 'flex', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '9px', width: '14px', flexShrink: 0 }}>
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#948B77', flexShrink: 0 }} />
      </div>
      <div style={{ color: '#443E33', fontFamily: L400, fontSize: '16px', lineHeight: '26px', flexBasis: '0%', flexGrow: 1 }}>
        {renderBullet(content)}
      </div>
    </div>
  )
}

function Photo({ img }) {
  return (
    <motion.div
      className="photo"
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
      style={{
        backgroundImage: `url(/img/${img.src}.jpg)`,
        backgroundPosition: img.pos,
        backgroundSize: 'cover',
        width: `calc(${img.w}px * var(--photo-scale, 1))`,
        aspectRatio: `${img.w} / 210`,
        borderRadius: img.radius,
      }}
    />
  )
}

function PhotoRow({ row }) {
  const right = row.align === 'right'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignSelf: 'stretch', alignItems: right ? 'end' : undefined, paddingTop: '4px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', alignSelf: 'stretch', justifyContent: right ? 'end' : undefined, maxWidth: '100%' }}>
        {row.imgs.map((img) => (
          <Photo key={img.src} img={img} />
        ))}
      </div>
      <figcaption style={{ alignSelf: 'stretch', color: '#8B8371', fontFamily: INTER, fontStyle: 'italic', fontSize: '13px', lineHeight: '16px', textAlign: right ? 'right' : 'left' }}>
        {row.caption}
      </figcaption>
    </div>
  )
}

function Stop({ stop }) {
  return (
    <motion.div variants={rise} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ alignItems: 'baseline', display: 'flex', gap: '12px' }}>
        <h3 style={{ color: '#262219', fontFamily: L500, fontSize: '22px', fontWeight: 500, lineHeight: '28px', margin: 0 }}>
          {stop.name}
        </h3>
        <div style={{ color: '#948B77', fontFamily: L500, fontSize: '13px', fontWeight: 500, lineHeight: '16px' }}>
          {stop.time}
        </div>
      </div>
      {stop.bullets.map((b, i) => (
        <Bullet key={i} content={b} />
      ))}
      {stop.photoRows?.map((row) => (
        <PhotoRow key={row.caption} row={row} />
      ))}
    </motion.div>
  )
}

function TransitStats({ transit }) {
  const cellBase = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignSelf: 'stretch',
    textDecoration: 'none',
  }
  const label = (em) => ({
    color: em ? '#171410' : '#948B77',
    fontFamily: L500,
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.02em',
    lineHeight: '16px',
  })
  const value = (em) => ({
    color: em ? '#171410' : '#262219',
    fontFamily: L500,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '30px',
  })
  const border = '1px solid #DFD7C3'
  const cellBorders = [
    { borderBottom: border },
    { borderBottom: border, borderLeft: border },
    {},
    { borderLeft: border },
  ]
  return (
    <motion.div variants={rise} style={{ border, display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', alignSelf: 'stretch' }}>
      {transit.map((d, i) => (
        <a key={d.label} className="stat" href={d.maps} target="_blank" rel="noreferrer" title="Open in Google Maps" style={{ ...cellBase, ...cellBorders[i] }}>
          <div style={label(d.em)}>{d.label}</div>
          <div style={value(d.em)}>{d.value}</div>
        </a>
      ))}
    </motion.div>
  )
}

function Callout({ callout }) {
  return (
    <motion.div
      variants={rise}
      style={{
        alignItems: 'center',
        backgroundImage: 'linear-gradient(in oklab 180deg, oklab(99% 0 0.015 / 0.9) 0%, oklab(100% 0 0 / 0%) 100%)',
        backgroundOrigin: 'border-box',
        border: '1px solid #DFD7C3',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        paddingBlock: '12px',
        paddingInline: '16px',
        alignSelf: 'stretch',
      }}
    >
      <div style={{ alignSelf: 'stretch', color: '#8B8371', fontFamily: L500, fontSize: '12px', fontWeight: 500, letterSpacing: '0.02em', lineHeight: '16px' }}>
        {callout.label}
      </div>
      <div style={{ alignItems: 'start', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {callout.lines.map((line) => (
          <div key={line.slice(0, 24)} style={{ alignSelf: 'stretch', color: '#443E33', fontFamily: L400, fontSize: '15px', lineHeight: '24px' }}>
            {line}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ---------- page ----------

export default function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [vw, setVw] = useState(1280)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = () => {
      setIsMobile(mq.matches)
      setVw(document.documentElement.clientWidth)
    }
    onChange()
    mq.addEventListener('change', onChange)
    window.addEventListener('resize', onChange)
    const ro = new ResizeObserver(onChange)
    ro.observe(document.documentElement)
    window.visualViewport?.addEventListener('resize', onChange)
    return () => {
      mq.removeEventListener('change', onChange)
      window.removeEventListener('resize', onChange)
      window.visualViewport?.removeEventListener('resize', onChange)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.6, wheelMultiplier: 0.9 })
    let rafId
    const raf = (t) => {
      lenis.raf(t)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Scroll-linked condense, same behavior as the roadtrip app.
  const { scrollY } = useScroll()
  const raw = useTransform(scrollY, [10, 80], [0, 1])
  const p = useSpring(raw, { stiffness: 380, damping: 36, mass: 0.5 })

  // Measure the real rendered title width (the ornament glyphs are much wider
  // than any per-character estimate) at a 100px reference size; ratio = px of
  // line per px of font size. Re-measured once fonts finish loading.
  const [titleRatio, setTitleRatio] = useState(10.6)
  const measRef = useRef(null)
  // useLayoutEffect: measure before first paint so the entrance animation
  // starts at the final size instead of visibly resizing mid-load
  useLayoutEffect(() => {
    const measure = () => {
      if (measRef.current) setTitleRatio(measRef.current.offsetWidth / 100)
    }
    measure()
    document.fonts?.ready?.then(measure)
  }, [])

  const gutter = vw <= 640 ? 16 : vw <= 1024 ? 24 : 96
  const contentW = vw - 2 * gutter
  // small inset so the last glyph never kisses the edge
  const fitSize = Math.floor((contentW - 10) / titleRatio)
  const expandedH1 = Math.min(isMobile ? 38 : 54, Math.max(28, fitSize))
  const h1Size = useTransform(p, [0, 1], [`${expandedH1}px`, isMobile ? '24px' : '32px'])
  const h1Line = useTransform(p, [0, 1], [`${Math.round(expandedH1 * 1.075)}px`, isMobile ? '30px' : '38px'])
  const needsBreak = fitSize < 28
  const [twoLine, setTwoLine] = useState(false)
  useMotionValueEvent(p, 'change', (v) => setTwoLine(needsBreak && v < 0.7))
  useEffect(() => {
    setTwoLine(needsBreak && p.get() < 0.7)
  }, [needsBreak, p])

  const collapseMaxH = useTransform(p, [0, 1], ['80px', '0px'])
  const collapseOpacity = useTransform(p, [0, 0.55], [1, 0])
  const heroGap = useTransform(p, [0, 1], ['18px', '8px'])
  const heroPadTop = useTransform(p, [0, 1], ['0px', '14px'])
  const heroPadBottom = useTransform(p, [0, 1], ['52px', '16px'])

  // Pure CSS-calc expansion: --gutter comes from the stylesheet cascade and the
  // viewport term from 100vw, so no React state can ever be stale mid-scroll.
  const heroMarginInline = useTransform(p, (v) => `calc(-1 * var(--gutter) - ${v.toFixed(4)} * ((100vw - min(100vw, 803px)) / 2))`)
  const heroPaddingInline = useTransform(p, (v) => `calc(var(--gutter) + ${v.toFixed(4)} * ((100vw - min(100vw, 803px)) / 2))`)

  const spring = { type: 'spring', stiffness: 400, damping: 34 }

  return (
    <div className="page">
      {/* offscreen measurer for the title's true rendered width */}
      <div
        ref={measRef}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-99999px', top: 0, visibility: 'hidden', pointerEvents: 'none', whiteSpace: 'nowrap', fontFamily: L500, fontWeight: 500, fontSize: '100px', letterSpacing: '-0.02em' }}
      >
        {TITLE_TEXT}
      </div>
      <motion.header
        className="hero"
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ gap: heroGap, paddingTop: heroPadTop, paddingBottom: heroPadBottom, marginInline: heroMarginInline, paddingInline: heroPaddingInline }}
      >
        <motion.div variants={fadeUp}>
          <motion.div className="logo" style={{ maxHeight: collapseMaxH, opacity: collapseOpacity, overflow: 'hidden', alignItems: 'start', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
            <Wordmark />
            <div style={{ alignItems: 'center', display: 'flex', gap: '4px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="13" viewBox="0 -960 520 520" width="13" style={{ flexShrink: 0 }}>
                <path d="M132.502-494.168q-23.611 0-40.143-16.407Q75.833-526.982 75.833-550.42v-298.745q0-23.611 16.526-40.143Q108.891-905.835 132.502-905.835h231.666v331.669H132.502q-10.043 0-17.105 6.813Q108.334-560.533 108.334-550.453q0 10.075 7.063 16.933Q122.46-526.668 132.502-526.668H411.667v-335.834h32.5v368.334H132.502Zm55.831-112.499h143.335V-873.335H188.333v266.669Zm-32.5 0V-873.335h-23.331q-10.276 0-17.219 7.063Q108.334-859.208 108.334-849.165v248.787q5.622-2.665 11.494-4.48 5.872-1.809 12.675-1.809h23.33ZM108.334-873.335v272.957V-873.335Z" fill="#5E574A" />
              </svg>
              <div style={{ color: '#5E574A', fontFamily: L500, fontSize: '11px', fontWeight: 500, lineHeight: '14px', textAlign: 'center' }}>
                Notes
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} style={{ alignSelf: 'stretch' }}>
          <motion.div style={{ maxHeight: collapseMaxH, opacity: collapseOpacity, overflow: 'hidden' }}>
            <div style={{ color: '#7C7466', fontFamily: L500, fontSize: '13px', fontWeight: 500, letterSpacing: '0.02em', lineHeight: '16px' }}>
              {PLAN.kicker}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} style={{ alignSelf: 'stretch' }}>
          <motion.h1 className="h1" style={{ fontSize: h1Size, lineHeight: h1Line, color: '#171410', fontFamily: L500, fontWeight: 500, letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap' }}>
            <motion.span layout transition={spring} style={{ display: 'inline-block' }}>
              Montauk
            </motion.span>{' '}
            <motion.span layout transition={spring} style={{ display: twoLine ? 'block' : 'inline-block' }}>
              Trip <span style={{ color: '#35A7FF' }}>𓆉 ❀⋆.ೃ࿔*</span>
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.div variants={fadeUp} style={{ alignSelf: 'stretch' }}>
          <motion.div style={{ maxHeight: collapseMaxH, opacity: collapseOpacity, overflow: 'hidden' }}>
            <div style={{ color: '#5E574A', fontFamily: L400, fontSize: '18px', lineHeight: '28px', maxWidth: '520px' }}>
              {PLAN.tagline}
            </div>
          </motion.div>
        </motion.div>
      </motion.header>

      <motion.section
        variants={sectionStagger}
        initial="hidden"
        animate="show"
        style={{
          borderBottom: '1px solid #DFD7C3',
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
          paddingTop: '52px',
          paddingBottom: '52px',
          alignSelf: 'stretch',
        }}
      >
        <motion.div variants={rise} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ color: '#171410', fontFamily: L500, fontSize: '13px', fontWeight: 500, lineHeight: '16px', letterSpacing: '0.02em' }}>
            THE PLAN
          </div>
          <div style={{ color: '#5E574A', fontFamily: L400, fontSize: '17px', lineHeight: '27px', maxWidth: '640px' }}>
            {PLAN.desc}
          </div>
        </motion.div>

        <TransitStats transit={PLAN.transit} />

        {PLAN.stops.map((stop) => (
          <Stop key={stop.name} stop={stop} />
        ))}

        <Callout callout={PLAN.callout} />
      </motion.section>

      <div id="sources" style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '44px' }}>
        <div style={{ color: '#8B8371', fontFamily: L500, fontSize: '12px', fontWeight: 500, letterSpacing: '0.02em', lineHeight: '16px' }}>
          SOURCES
        </div>
        {PLAN.sources.map((s) => (
          <a
            key={s.n}
            className="source-link"
            href={s.url}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#6B6454', fontFamily: L400, fontSize: '14px', lineHeight: '22px', textDecoration: 'none' }}
          >
            <sup style={{ color: '#948B77', fontFamily: L500, fontSize: '10px', fontWeight: 500, marginRight: '5px' }}>{s.n}</sup>
            <span style={{ textDecoration: 'underline 1px', textUnderlinePosition: 'from-font' }}>{s.text}</span>
          </a>
        ))}
        <div style={{ paddingTop: '12px' }}>
          <div style={{ color: '#A69D89', fontFamily: L400, fontSize: '13px', lineHeight: '16px' }}>{FOOTER_TEXT}</div>
        </div>
      </div>
    </div>
  )
}
