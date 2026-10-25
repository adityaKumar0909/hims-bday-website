import { useEffect, useId, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/* ---------- geometry (figure-local coordinates; origin = feet on the ground) ---------- */
const INK = '#4a0d22'
const FUR = '#fff8f9'
const GROUND = 340
const HIP = -76
const NECK = -130
const SHOULDER_Y = -122
const SH = 18 // shoulder half-width
const ARM = 80
const LEG = 76
const FACE = { cx: 0, cy: -172, rx: 33, ry: 43 }

/* ---------- timeline (ms) ---------- */
const WALK = 3600 // walking in
const OPEN = 4400 // stop + open arms
const STEP = 5200 // step in + hug closes
export const HUG_DONE = STEP + 900

const D_STOP = 165
const D_HUG = 90
const HUG_ARM = 71.6 // angle that lands the hand on the partner's back

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)
const rad = (d) => (d * Math.PI) / 180

// constant speed, then a smooth stop (position fraction for time fraction p)
function walkS(p) {
  const tau = 0.8
  const v = 2 / (1 + tau)
  const a = v / (1 - tau)
  if (p <= tau) return v * p
  const u = p - tau
  return v * tau + v * u - 0.5 * a * u * u
}

function pose(t) {
  const phase = (t / 1000) * Math.PI * 2 * 1.9
  let gx, bx, amp = 0, inner = 8, outer = -8, lean = 0, tilt = 0, hop = 0
  const swingBase = Math.sin(phase)

  if (t < WALK) {
    const p = t / WALK
    const s = walkS(p)
    gx = lerp(-90, 400 - D_STOP / 2, s)
    bx = lerp(890, 400 + D_STOP / 2, s)
    const speed = p <= 0.8 ? 1 : 1 - (p - 0.8) / 0.2
    amp = 28 * speed
    const sw = 22 * speedSwing(speed) * swingBase
    inner = 8 + sw
    outer = -8 - sw
  } else if (t < OPEN) {
    const q = ease((t - WALK) / (OPEN - WALK))
    gx = 400 - D_STOP / 2
    bx = 400 + D_STOP / 2
    inner = lerp(8, 100, q)
    outer = lerp(-8, -150, q)
    hop = -9 * Math.sin(Math.PI * q)
  } else {
    const q = clamp((t - OPEN) / (STEP - OPEN))
    const r = ease(q)
    gx = lerp(400 - D_STOP / 2, 400 - D_HUG / 2, r)
    bx = lerp(400 + D_STOP / 2, 400 + D_HUG / 2, r)
    amp = 20 * Math.sin(Math.PI * q)
    inner = lerp(100, HUG_ARM, r)
    outer = -150
    lean = 3 * r
    tilt = 5 * r
    if (t > STEP) {
      lean += 0.8 * Math.sin(t / 420)
      hop = 1.6 * Math.sin(t / 420)
    }
  }
  if (t >= OPEN) outer += 10 * Math.sin(t / 170)

  const th = amp * swingBase
  return { gx, bx, legs: [th, -th], inner, outer, lean, tilt, hop, hugging: t > STEP }
}
const speedSwing = (s) => s

/* ---------- pieces ---------- */
function Face({ src, label, idBase }) {
  const clipId = `${idBase}-clip`
  return (
    <g>
      <ellipse {...FACE} fill={FUR} />
      {src ? (
        <>
          <clipPath id={clipId}><ellipse {...FACE} /></clipPath>
          <image
            href={src}
            x={FACE.cx - FACE.rx}
            y={FACE.cy - FACE.ry}
            width={FACE.rx * 2}
            height={FACE.ry * 2}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        </>
      ) : (
        <>
          <ellipse cx={FACE.cx} cy={FACE.cy} rx={FACE.rx - 6} ry={FACE.ry - 6} fill="none" stroke="#ff7b9c" strokeWidth="2" strokeDasharray="5 5" />
          <text x="0" y={FACE.cy + 5} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize="15" fill="#d9143f">{label}</text>
        </>
      )}
      <ellipse {...FACE} fill="none" stroke={INK} strokeWidth="4.5" />
    </g>
  )
}

function Heart({ size = 1, fill = '#d9143f' }) {
  return <path d="M0 6 C -14 -8 -26 8 0 26 C 26 8 14 -8 0 6Z" transform={`scale(${size})`} fill={fill} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
}

function Arm({ dir, side, a }) {
  const sx = side * dir * SH
  const al = rad(dir * a)
  const hx = sx + ARM * Math.sin(al)
  const hy = SHOULDER_Y + ARM * Math.cos(al)
  const cx = (sx + hx) / 2
  const cy = (SHOULDER_Y + hy) / 2 + 6
  return (
    <g>
      <path d={`M${sx} ${SHOULDER_Y} Q${cx} ${cy} ${hx} ${hy}`} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <circle cx={hx} cy={hy} r="6.5" fill={FUR} stroke={INK} strokeWidth="3.5" />
    </g>
  )
}

function Figure({ kind, dir, x, p, src, label, layer, idBase }) {
  const [t1, t2] = p.legs
  const dy = LEG * (1 - Math.cos(rad(t1))) + p.hop
  const leg = (ox, th) => {
    const fx = ox + LEG * Math.sin(rad(th))
    const fy = HIP + LEG * Math.cos(rad(th))
    return (
      <g key={ox}>
        <line x1={ox} y1={HIP} x2={fx} y2={fy - 3} stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <ellipse cx={fx + dir * 3} cy={fy} rx="10" ry="5.5" fill="#d9143f" stroke={INK} strokeWidth="3" />
      </g>
    )
  }
  const outerT = `translate(${x} ${GROUND + dy})`
  const leanT = `rotate(${p.lean * dir} 0 ${HIP})`

  if (layer === 'arms') {
    return (
      <g transform={outerT}>
        <g transform={leanT}>
          <Arm dir={dir} side={-1} a={p.outer} />
          <Arm dir={dir} side={1} a={p.inner} />
        </g>
      </g>
    )
  }

  const girl = kind === 'girl'
  return (
    <g transform={outerT}>
      {leg(-7, t1)}
      {leg(7, t2)}
      <g transform={leanT}>
        <line x1="0" y1={NECK} x2="0" y2={SHOULDER_Y + 4} stroke={INK} strokeWidth="6" strokeLinecap="round" />
        {girl ? (
          <>
            <path d="M-16 -126 L16 -126 L32 -52 L-32 -52 Z" fill="#d9143f" stroke={INK} strokeWidth="4.5" strokeLinejoin="round" />
            <g transform="translate(0 -96) scale(.42)"><Heart fill="#fff8f9" /></g>
          </>
        ) : (
          <>
            <rect x="-17" y="-130" width="34" height="54" rx="9" fill="#ff7b9c" stroke={INK} strokeWidth="4.5" />
            <g transform="translate(0 -112) scale(.42)"><Heart fill="#fff8f9" /></g>
          </>
        )}
        <g transform={`rotate(${p.tilt * dir} 0 ${NECK})`}>
          {/* hair behind the face */}
          <ellipse cx="0" cy={FACE.cy - 5} rx={FACE.rx + 6} ry={FACE.ry + 5} fill={INK} />
          {girl ? (
            <>
              <circle cx="-40" cy="-152" r="13" fill={INK} />
              <circle cx="40" cy="-152" r="13" fill={INK} />
              <circle cx="-36" cy="-164" r="5" fill="#ff7b9c" stroke={INK} strokeWidth="2" />
              <circle cx="36" cy="-164" r="5" fill="#ff7b9c" stroke={INK} strokeWidth="2" />
            </>
          ) : (
            <g fill={INK}><path d="M-34 -196 Q-30 -236 4 -232 Q34 -230 36 -196 Q16 -219 -34 -196Z" /><path d="M2 -231 Q8 -250 24 -244 Q12 -243 12 -230Z" /></g>
          )}
          <Face src={src} label={label} idBase={idBase} />
          {girl && (
            <g transform="translate(-24 -214) rotate(-18)">
              <path d="M0 0 L-16 -9 L-16 9 Z M0 0 L16 -9 L16 9 Z" fill="#d9143f" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
              <circle r="4.5" fill="#ff7b9c" stroke={INK} strokeWidth="2.5" />
            </g>
          )}
        </g>
      </g>
    </g>
  )
}

/* ---------- the scene ---------- */
export default function StickHug({ herFace, hisFace, onDone, className }) {
  const reduced = useReducedMotion()
  const id = useId().replace(/:/g, '')
  const [t, setT] = useState(reduced ? HUG_DONE + 1000 : 0)
  const [done, setDone] = useState(false)
  const narrow = typeof window !== 'undefined' && window.innerWidth < 640

  useEffect(() => {
    if (reduced) return
    let raf
    const start = performance.now()
    const tick = (now) => { setT(now - start); raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  useEffect(() => {
    if (!done && t >= HUG_DONE) { setDone(true); onDone?.() }
  }, [t, done, onDone])

  const p = pose(t)
  const hearts = [
    { dx: -26, delay: 0, s: 0.9 }, { dx: 18, delay: 0.7, s: 1.2 }, { dx: -4, delay: 1.5, s: 0.7 },
    { dx: 36, delay: 2.1, s: 0.8 }, { dx: -40, delay: 2.7, s: 1 },
  ]

  return (
    <svg viewBox={narrow ? '140 60 520 340' : '0 0 800 400'} className={className} role="img" aria-label="Two stick figures walk toward each other and hug">
      {/* sky doodles */}
      <g fill="#fff8f9" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M90 92 q-26 0 -26 -20 q0 -18 22 -18 q6 -20 32 -16 q22 4 22 22 q22 0 22 16 q0 16 -22 16 Z" />
        <path d="M630 120 q-22 0 -22 -16 q0 -14 18 -14 q5 -16 26 -13 q18 3 18 18 q18 0 18 12 q0 13 -18 13 Z" />
      </g>
      {/* ground */}
      <path d="M10 343 Q 200 335 400 344 T 790 341" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      <g stroke={INK} strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M70 342 l-4 -14 M70 342 l2 -16 M70 342 l8 -12" />
        <path d="M730 341 l-5 -13 M730 341 l1 -16 M730 341 l9 -11" />
      </g>

      {/* shadows */}
      {[p.gx, p.bx].map((x, i) => (
        <ellipse key={i} cx={x} cy={GROUND + 5} rx="36" ry="6" fill="rgba(74,13,34,.14)" />
      ))}

      {/* names */}
      <g fontFamily="'Patrick Hand', cursive" fontSize="22" fill={INK} textAnchor="middle">
        <text x={p.gx - 14} y={GROUND + 36}>Cheeku</text>
        <text x={p.bx + 14} y={GROUND + 36}>me</text>
      </g>

      {/* bodies, then arms on top so the hug reads */}
      <Figure kind="girl" dir={1} x={p.gx} p={p} src={herFace} label="her face" idBase={`${id}g`} />
      <Figure kind="boy" dir={-1} x={p.bx} p={p} src={hisFace} label="your face" idBase={`${id}b`} />
      <Figure kind="girl" dir={1} x={p.gx} p={p} layer="arms" />
      <Figure kind="boy" dir={-1} x={p.bx} p={p} layer="arms" />

      {/* hearts rising from the hug */}
      {p.hugging && !reduced && hearts.map((h, i) => (
        <g key={i} transform={`translate(${400 + h.dx} 96)`}>
          <g className="heart-rise" style={{ animationDelay: `${h.delay}s` }}>
            <Heart size={h.s} fill={i % 2 ? '#ff7b9c' : '#d9143f'} />
          </g>
        </g>
      ))}
      {reduced && (
        <g transform="translate(400 90)"><Heart size={1.2} /></g>
      )}
    </svg>
  )
}
