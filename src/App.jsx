import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import Wordmark from './Wordmark'
import { OPTIONS, FOOTER_TEXT, L400, L500 } from './data'

// ---------- motion variants ----------

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.1, 0, 0.1, 1] } },
}

const spring = { type: 'spring', stiffness: 400, damping: 34 }

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

function Photo({ img }) {
  return (
    <motion.div
      className="photo"
      whileHover={{ scale: 1.015 }}
      transition={spring}
      style={{
        backgroundImage: `url(/img/${img.src}.jpg)`,
        backgroundPosition: img.pos,
        backgroundSize: 'cover',
        width: `calc(${img.w}px * var(--photo-scale, 1))`,
        aspectRatio: `${img.w} / 210`,
        borderRadius: img.radius ?? undefined,
      }}
    />
  )
}

function PhotoRow({ row }) {
  return (
    <div style={row.groupStyle}>
      <div style={{ ...row.rowStyle, maxWidth: '100%' }}>
        {row.imgs.map((img) => (
          <Photo key={img.src} img={img} />
        ))}
      </div>
      {row.caption && <figcaption style={row.captionStyle}>{row.caption}</figcaption>}
    </div>
  )
}

function StopHeading({ stop, optionId }) {
  return (
    <div style={{ alignItems: 'baseline', alignSelf: stop.nested ? 'stretch' : undefined, display: 'flex', gap: '12px' }}>
      {stop.sup ? (
        <div style={{ alignItems: 'flex-start', display: 'flex', gap: '3px' }}>
          <h3 style={{ color: '#DADADA', fontFamily: L500, fontSize: '22px', fontWeight: 500, lineHeight: '28px', margin: 0 }}>
            {stop.name}
          </h3>
          <div style={{ paddingTop: '2px' }}>
            <a
              className="sup"
              href={`#${optionId}-sources`}
              style={{ color: '#8A8A8A', fontFamily: L500, fontSize: '12px', fontWeight: 500, lineHeight: '16px', textDecoration: 'none' }}
            >
              {stop.sup}
            </a>
          </div>
        </div>
      ) : (
        <h3 style={{ color: '#DADADA', fontFamily: L500, fontSize: '22px', fontWeight: 500, lineHeight: '28px', margin: 0 }}>
          {stop.name}
        </h3>
      )}
      <div style={{ color: '#777777', fontFamily: L500, fontSize: '13px', fontWeight: 500, lineHeight: '16px' }}>
        {stop.time}
      </div>
    </div>
  )
}

function Stop({ stop, optionId }) {
  if (!stop.nested) {
    // Flat stop (B's Cold Spring, Millbrook): one column, gap 16.
    return (
      <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <StopHeading stop={stop} optionId={optionId} />
        {stop.bullets.map((b) => (
          <Bullet key={b.slice(0, 24)}>{b}</Bullet>
        ))}
      </motion.div>
    )
  }
  return (
    <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ alignItems: 'start', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '100%' }}>
        <StopHeading stop={stop} optionId={optionId} />
        <div
          style={{
            alignItems: 'start',
            alignSelf: stop.bulletsStretch ? 'stretch' : undefined,
            display: 'flex',
            flexDirection: 'column',
            gap: stop.bulletsGap,
          }}
        >
          {stop.bullets.map((b) => (
            <Bullet key={b.slice(0, 24)}>{b}</Bullet>
          ))}
        </div>
      </div>
      {stop.photosGroup && (
        <div style={stop.photosGroup.style}>
          {stop.photosGroup.rows.map((row) => (
            <PhotoRow key={row.imgs[0].src} row={row} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function DriveStats({ drive }) {
  const cellBase = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignSelf: 'stretch',
    flex: 1,
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
  // equal-height cells: grid rows share the tallest cell's height
  const cellBorders = [
    { borderBottom: border },
    { borderBottom: border, borderLeft: border },
    {},
    { borderLeft: border },
  ]
  return (
    <motion.div variants={fadeUp} style={{ border, display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', alignSelf: 'stretch' }}>
      {drive.map((d, i) => (
        <a
          key={d.label}
          className="stat"
          href={d.maps}
          target="_blank"
          rel="noreferrer"
          title="Open route in Google Maps"
          style={{ ...cellBase, ...cellBorders[i], textDecoration: 'none' }}
        >
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
        width: callout.width ?? undefined,
        maxWidth: '100%',
        alignSelf: callout.width ? undefined : 'stretch',
      }}
    >
      <div
        style={{
          alignSelf: 'stretch',
          color: '#8A8A8A',
          fontFamily: L500,
          fontSize: '12px',
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: callout.labelLetterSpacing ?? undefined,
        }}
      >
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

function Sources({ option }) {
  return (
    <div id={`${option.id}-sources`} style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '44px' }}>
      <div style={{ color: '#777777', fontFamily: L500, fontSize: '12px', fontWeight: 500, letterSpacing: '0.02em', lineHeight: '16px' }}>
        SOURCES
      </div>
      {option.sources.map((s) => (
        <div key={s.n} style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flexShrink: 0, paddingTop: '1px', width: '12px' }}>
            <div style={{ color: '#8A8A8A', fontFamily: L500, fontSize: '12px', fontWeight: 500, lineHeight: '16px' }}>{s.n}</div>
          </div>
          <a
            className="source-link"
            href={s.url}
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#B3B3B3',
              flexBasis: '0%',
              flexGrow: 1,
              fontFamily: L400,
              fontSize: '14px',
              lineHeight: '22px',
              textDecoration: 'underline 1px',
              textUnderlinePosition: 'from-font',
            }}
          >
            {s.text}
          </a>
        </div>
      ))}
      <div style={{ paddingTop: '12px' }}>
        <div style={{ color: '#5A5A5A', fontFamily: L400, fontSize: '13px', lineHeight: '16px' }}>{FOOTER_TEXT}</div>
      </div>
    </div>
  )
}

// ---------- tabs ----------

function Chip({ option, active, onClick, idBase = 'hero', dep }) {
  const isStar = option.star
  return (
    <button
      type="button"
      className="chip"
      onClick={(e) => {
        // if the chip is partially out of the horizontal scroller, bring it in
        e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
        onClick()
      }}
      style={{
        position: 'relative',
        border: '1px solid #363636',
        borderRadius: '12px',
        background: 'none',
        display: 'flex',
        flexDirection: isStar ? 'row' : 'column',
        alignItems: isStar ? 'center' : undefined,
        gap: '8px',
        paddingBlock: '8px',
        paddingLeft: isStar ? '8px' : '16px',
        paddingRight: '16px',
        cursor: 'pointer',
      }}
    >
      {active && (
        <motion.span
          layoutId={`chip-bg-${idBase}`}
          layoutDependency={dep}
          transition={spring}
          style={{ position: 'absolute', inset: '-1px', backgroundColor: 'color(display-p3 0.166 0.166 0.166)', borderRadius: '12px' }}
        />
      )}
      {isStar && (
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 640 640" width="16" style={{ flexShrink: 0, position: 'relative' }}>
          <path d="M175.333-427.694l38.207-164.513-127.64-110.613 168.407-14.614L320-872.56l65.693 155.126 168.407 14.614-127.64 110.613L464.667-427.694 320-514.974 175.333-427.694Z" fill="#B3B3B3" />
        </svg>
      )}
      <span
        className="chip-label"
        style={{
          position: 'relative',
          color: active ? option.activeChipColor : '#B3B3B3',
          fontFamily: L500,
          fontSize: '13px',
          fontWeight: 500,
          lineHeight: '16px',
          textAlign: 'left',
        }}
      >
        {option.chip}
      </span>
    </button>
  )
}

// ---------- page ----------

export default function App() {
  const [tab, setTab] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [vw, setVw] = useState(1280)
  const option = OPTIONS[tab]

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = () => {
      setIsMobile(mq.matches)
      // clientWidth, not innerWidth: innerWidth includes the scrollbar, which
      // made the full-width condensed bar overflow the page horizontally
      setVw(document.documentElement.clientWidth)
    }
    onChange()
    mq.addEventListener('change', onChange)
    window.addEventListener('resize', onChange)
    // window.resize doesn't always fire in embedded/preview contexts;
    // ResizeObserver on the root element always does
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

  // Lenis smooth scrolling, tuned a touch slower than default
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.6, wheelMultiplier: 0.9 })
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // Scroll-linked condense: progress 0→1 over the first stretch of scroll,
  // smoothed with a spring so every intermediate frame is intentional.
  const { scrollY } = useScroll()
  const raw = useTransform(scrollY, [10, 80], [0, 1])
  const p = useSpring(raw, { stiffness: 380, damping: 36, mass: 0.5 })

  // Fluid expanded title: shrink toward the largest size that still fits one
  // line at this viewport (≈11px of line width per px of font size), capped at
  // the design size. Only if even 28px can't fit does the two-line break kick in.
  // gutters: 16 mobile / 24 tablet / 96 desktop (mirrors the CSS --gutter)
  const gutter = vw <= 640 ? 16 : vw <= 1024 ? 24 : 96
  const contentW = vw - 2 * gutter
  const fitSize = Math.floor(contentW / 11)
  const expandedH1 = Math.min(isMobile ? 38 : 54, Math.max(28, fitSize))
  const h1Size = useTransform(p, [0, 1], [`${expandedH1}px`, isMobile ? '24px' : '32px'])
  const h1Line = useTransform(p, [0, 1], [`${Math.round(expandedH1 * 1.075)}px`, isMobile ? '30px' : '38px'])
  // Explicit title line break, only for viewports too narrow even at 28px.
  // Flipped at a fixed point of the morph instead of letting width re-wrap
  // mid-animation.
  const needsBreak = fitSize < 28
  // flip at 0.7: on expansion the break lands while the growing single line
  // still fits (~28px), well before the text would hit the edge
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

  // Expand the bar to the full viewport width as it condenses. The page column
  // is 803px centered, so the extra reach per side is (vw - 803) / 2; matching
  // padding keeps the content aligned with the column.
  // Pure CSS-calc expansion: --gutter comes from the stylesheet cascade and the
  // viewport term from 100vw, so no React state can ever be stale mid-scroll
  // (stale vw/gutter was why the chips sometimes lost their side margins).
  const heroMarginInline = useTransform(p, (v) => `calc(-1 * var(--gutter) - ${v.toFixed(4)} * ((100vw - min(100vw, 803px)) / 2))`)
  const heroPaddingInline = useTransform(p, (v) => `calc(var(--gutter) + ${v.toFixed(4)} * ((100vw - min(100vw, 803px)) / 2))`)

  return (
    <div className="page">
      {/* hero: sticky; condenses continuously with scroll */}
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
              SUNDAY · JULY 26
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} style={{ alignSelf: 'stretch' }}>
          <motion.h1 className="h1" style={{ fontSize: h1Size, lineHeight: h1Line, color: '#F2F0EF', fontFamily: L500, fontWeight: 500, letterSpacing: '-0.02em', margin: 0, whiteSpace: 'nowrap' }}>
            <motion.span layout transition={spring} style={{ display: 'inline-block' }}>
              Hudson Valley
            </motion.span>{' '}
            <motion.span layout transition={spring} style={{ display: twoLine ? 'block' : 'inline-block' }}>
              Roadtrip
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.div variants={fadeUp} style={{ alignSelf: 'stretch' }}>
          <motion.div style={{ maxHeight: collapseMaxH, opacity: collapseOpacity, overflow: 'hidden' }}>
            <div style={{ color: '#B3B3B3', fontFamily: L400, fontSize: '18px', lineHeight: '28px', maxWidth: '520px' }}>
              Two ideas for a relaxed day in Hudson Valley.
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="chips" style={{ alignItems: 'start', alignSelf: 'stretch', display: 'flex', gap: '16px' }}>
          {OPTIONS.map((o, i) => (
            <Chip key={o.id} option={o} active={i === tab} onClick={() => setTab(i)} dep={tab} />
          ))}
        </motion.div>
      </motion.header>

      {/* option section + sources — siblings, keyed together per tab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={option.id}
          variants={stagger}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
          style={{ display: 'flex', flexDirection: 'column', alignSelf: 'stretch' }}
        >
        <section
          style={{
            borderBottom: '1px solid #363636',
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
            paddingTop: '52px',
            paddingBottom: '52px',
            alignSelf: 'stretch',
          }}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ color: '#F2F0EF', fontFamily: L500, fontSize: '13px', fontWeight: 500, lineHeight: '16px', letterSpacing: option.labelLetterSpacing ?? undefined }}>
              {option.label}
            </div>
            <h2 className="h2" style={{ color: '#DADADA', letterSpacing: '-0.02em', margin: 0, ...option.titleFont }}>
              {option.title}
            </h2>
            <div style={{ color: '#B3B3B3', fontSize: '17px', lineHeight: '27px', maxWidth: '640px', ...option.descFont }}>
              {option.desc}
            </div>
          </motion.div>

          <DriveStats drive={option.drive} />

          {option.stops.map((stop) => (
            <Stop key={stop.name} stop={stop} optionId={option.id} />
          ))}

          <Callout callout={option.callout} />
        </section>

        <motion.div variants={fadeUp}>
          <Sources option={option} />
        </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
