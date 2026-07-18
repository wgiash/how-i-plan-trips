import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import Wordmark from './Wordmark'
import { PLAN, FOOTER_TEXT, L400, L500 } from './data'

// ---------- motion variants ----------

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.1, 0, 0.1, 1] } },
}

// title width ≈ RATIO px of line per px of font size ("Montauk Trip")
const TITLE_RATIO = 6.3

// ---------- atoms ----------

function Bullet({ children }) {
  return (
    <div style={{ alignSelf: 'stretch', display: 'flex', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '9px', width: '14px', flexShrink: 0 }}>
        <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#777777', flexShrink: 0 }} />
      </div>
      <div style={{ color: '#C9C9C9', fontFamily: L400, fontSize: '16px', lineHeight: '26px', flexBasis: '0%', flexGrow: 1 }}>
        {children}
      </div>
    </div>
  )
}

function Stop({ stop }) {
  return (
    <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ alignItems: 'baseline', display: 'flex', gap: '12px' }}>
        <h3 style={{ color: '#DADADA', fontFamily: L500, fontSize: '22px', fontWeight: 500, lineHeight: '28px', margin: 0 }}>
          {stop.name}
        </h3>
        <div style={{ color: '#777777', fontFamily: L500, fontSize: '13px', fontWeight: 500, lineHeight: '16px' }}>
          {stop.time}
        </div>
      </div>
      {stop.bullets.map((b) => (
        <Bullet key={b.slice(0, 24)}>{b}</Bullet>
      ))}
      {/* photos wired here later: pairs alternate right → left, stack4 left */}
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
    color: em ? '#F2F0EF' : '#777777',
    fontFamily: L500,
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.02em',
    lineHeight: '16px',
  })
  const value = (em) => ({
    color: em ? '#F2F0EF' : '#DADADA',
    fontFamily: L500,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '30px',
  })
  const border = '1px solid #363636'
  const cellBorders = [
    { borderBottom: border },
    { borderBottom: border, borderLeft: border },
    {},
    { borderLeft: border },
  ]
  return (
    <motion.div variants={fadeUp} style={{ border, display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', alignSelf: 'stretch' }}>
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
      variants={fadeUp}
      style={{
        alignItems: 'center',
        backgroundImage: 'linear-gradient(in oklab 180deg, oklab(17.8% 0 0) 0%, oklab(0% 0 0 / 0%) 100%)',
        backgroundOrigin: 'border-box',
        border: '1px solid #363636',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        paddingBlock: '12px',
        paddingInline: '16px',
        alignSelf: 'stretch',
      }}
    >
      <div style={{ alignSelf: 'stretch', color: '#8A8A8A', fontFamily: L500, fontSize: '12px', fontWeight: 500, letterSpacing: '0.02em', lineHeight: '16px' }}>
        {callout.label}
      </div>
      <div style={{ alignItems: 'start', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {callout.lines.map((line) => (
          <div key={line.slice(0, 24)} style={{ alignSelf: 'stretch', color: '#C9C9C9', fontFamily: L400, fontSize: '15px', lineHeight: '24px' }}>
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
    const lenis = new Lenis({ duration: 1.6, wheelMultiplier: 0.9, smoothWheel: true })
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

  const gutter = vw <= 640 ? 16 : vw <= 1024 ? 24 : 96
  const contentW = vw - 2 * gutter
  const fitSize = Math.floor(contentW / TITLE_RATIO)
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

  const sideExtra = Math.max(0, (vw - 803) / 2)
  const heroMarginInline = useTransform(p, [0, 1], [`-${gutter}px`, `-${gutter + sideExtra}px`])
  const heroPaddingInline = useTransform(p, [0, 1], [`${gutter}px`, `${gutter + sideExtra}px`])

  const spring = { type: 'spring', stiffness: 400, damping: 34 }

  return (
    <div className="page">
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
                <path d="M132.502-494.168q-23.611 0-40.143-16.407Q75.833-526.982 75.833-550.42v-298.745q0-23.611 16.526-40.143Q108.891-905.835 132.502-905.835h231.666v331.669H132.502q-10.043 0-17.105 6.813Q108.334-560.533 108.334-550.453q0 10.075 7.063 16.933Q122.46-526.668 132.502-526.668H411.667v-335.834h32.5v368.334H132.502Zm55.831-112.499h143.335V-873.335H188.333v266.669Zm-32.5 0V-873.335h-23.331q-10.276 0-17.219 7.063Q108.334-859.208 108.334-849.165v248.787q5.622-2.665 11.494-4.48 5.872-1.809 12.675-1.809h23.33ZM108.334-873.335v272.957V-873.335Z" fill="#B3B3B3" />
              </svg>
              <div style={{ color: '#B3B3B3', fontFamily: L500, fontSize: '11px', fontWeight: 500, lineHeight: '14px', textAlign: 'center' }}>
                Notes
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} style={{ alignSelf: 'stretch' }}>
          <motion.div style={{ maxHeight: collapseMaxH, opacity: collapseOpacity, overflow: 'hidden' }}>
            <div style={{ color: '#999999', fontFamily: L500, fontSize: '13px', fontWeight: 500, letterSpacing: '0.02em', lineHeight: '16px' }}>
              {PLAN.kicker}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} style={{ alignSelf: 'stretch' }}>
          <motion.h1 className="h1" style={{ fontSize: h1Size, lineHeight: h1Line, color: '#F2F0EF', fontFamily: L500, fontWeight: 500, letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap' }}>
            <motion.span layout transition={spring} style={{ display: 'inline-block' }}>
              Montauk
            </motion.span>{' '}
            <motion.span layout transition={spring} style={{ display: twoLine ? 'block' : 'inline-block' }}>
              Trip
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.div variants={fadeUp} style={{ alignSelf: 'stretch' }}>
          <motion.div style={{ maxHeight: collapseMaxH, opacity: collapseOpacity, overflow: 'hidden' }}>
            <div style={{ color: '#B3B3B3', fontFamily: L400, fontSize: '18px', lineHeight: '28px', maxWidth: '520px' }}>
              {PLAN.tagline}
            </div>
          </motion.div>
        </motion.div>
      </motion.header>

      <motion.section
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          borderBottom: '1px solid #363636',
          display: 'flex',
          flexDirection: 'column',
          gap: '36px',
          paddingTop: '76px',
          paddingBottom: '52px',
          alignSelf: 'stretch',
        }}
      >
        <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ color: '#F2F0EF', fontFamily: L500, fontSize: '13px', fontWeight: 500, lineHeight: '16px', letterSpacing: '0.02em' }}>
            THE PLAN
          </div>
          <div style={{ color: '#B3B3B3', fontFamily: L400, fontSize: '17px', lineHeight: '27px', maxWidth: '640px' }}>
            {PLAN.desc}
          </div>
        </motion.div>

        <TransitStats transit={PLAN.transit} />

        {PLAN.stops.map((stop) => (
          <Stop key={stop.name} stop={stop} />
        ))}

        <Callout callout={PLAN.callout} />
      </motion.section>

      <div style={{ paddingTop: '44px' }}>
        <div style={{ color: '#5A5A5A', fontFamily: L400, fontSize: '13px', lineHeight: '16px' }}>{FOOTER_TEXT}</div>
      </div>
    </div>
  )
}
