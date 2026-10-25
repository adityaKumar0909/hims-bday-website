import { useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { Heart, KeyRound } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { config } from '../config'
import { cn } from '../lib/media'

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

function Tape({ className, style }) {
  const items = Array.from({ length: 14 })
  return (
    <div
      aria-hidden
      className={cn(
        'absolute left-[-25vw] w-[150vw] h-14 flex items-center overflow-hidden bg-blush-200 text-wine',
        'border-y-[7px] border-transparent [border-image:repeating-linear-gradient(135deg,#d9143f_0_12px,#ffd3de_12px_24px)_7]',
        'transition-transform duration-[900ms] ease-[cubic-bezier(.6,0,.9,.4)]',
        className,
      )}
      style={style}
    >
      {items.map((_, i) => (
        <span key={i} className="flex items-center gap-5 pr-5 font-display font-extrabold text-xl tracking-tight whitespace-nowrap">
          cheeku zone
          <Heart className="size-4 fill-cherry text-cherry" />
        </span>
      ))}
    </div>
  )
}

export default function Password({ onNext }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [hint, setHint] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [shaking, setShaking] = useState(false)
  const formRef = useRef(null)

  const submit = (e) => {
    e.preventDefault()
    const v = normalize(value)
    const ok = v && config.passwords.some((p) => v.includes(normalize(p)))
    if (ok) {
      setError('')
      setUnlocked(true)
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.65 }, colors: ['#ffd3de', '#ff7b9c', '#ffffff', '#fff5f7'] })
      setTimeout(onNext, 1300)
    } else {
      setError('Not quite. Try our date as DD/MM/YYYY.')
      setShaking(true)
      setTimeout(() => setShaking(false), 450)
    }
  }

  return (
    <section className="relative min-h-dvh overflow-hidden bg-cherry-deep text-blush-100 flex items-center">
      <Tape
        className="top-[3%]"
        style={{ transform: `rotate(-3deg) translateX(${unlocked ? '-120%' : '0'})` }}
      />
      <Tape
        className="bottom-[3%]"
        style={{ transform: `rotate(2.5deg) translateX(${unlocked ? '120%' : '0'})` }}
      />

      <svg
        aria-hidden
        viewBox="0 0 400 420"
        className="hidden lg:block absolute right-[6vw] top-1/2 w-[34vw] max-w-[30rem] -translate-y-1/2 rotate-6 overflow-visible"
      >
        <path
          d="M150 160 V100 a50 50 0 0 1 100 0 V160"
          fill="none" stroke="#ffd3de" strokeWidth="24" strokeLinecap="round"
          style={{ transition: 'transform .7s cubic-bezier(.3,1.4,.5,1)', transform: unlocked ? 'translateY(-34px) rotate(-14deg)' : 'none', transformOrigin: '150px 160px' }}
        />
        <path d="M200 390 C 30 270, 10 140, 105 130 C 160 124, 190 150, 200 178 C 210 150, 240 124, 295 130 C 390 140, 370 270, 200 390Z" fill="#d9143f" />
        <circle cx="200" cy="235" r="26" fill="#8a0a27" />
        <path d="M185 250 H215 L225 310 H175 Z" fill="#8a0a27" />
      </svg>

      <div
        className={cn(
          'relative z-10 w-full max-w-3xl px-7 sm:px-12 md:pl-[8vw] py-32 transition-all duration-700',
          unlocked && 'opacity-0 -translate-y-4',
        )}
      >
        <h1 className="font-display font-extrabold text-[clamp(3.2rem,11vw,6.5rem)] leading-[0.92] tracking-[-0.035em] text-white">
          Halt!
          <br />
          Cheeku zone.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-blush-200">
          Restricted area. Enter our secret date to unlock your birthday surprise.
        </p>

        <form ref={formRef} onSubmit={submit} className={cn('mt-9 flex max-w-md flex-col sm:flex-row gap-3', shaking && 'shake')}>
          <label htmlFor="pw" className="sr-only">Secret date</label>
          <input
            id="pw"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="14/02/2023"
            autoComplete="off"
            inputMode="text"
            aria-invalid={!!error}
            aria-describedby="pw-msg"
            className="h-12 flex-1 min-w-0 rounded-full border border-blush-200/50 bg-white/10 px-6 text-lg font-medium tracking-wide text-white placeholder:text-blush-200/60 outline-none transition focus:border-white focus:bg-white/15 focus:ring-4 focus:ring-white/20"
          />
          <Button type="submit" variant="light" size="lg" disabled={unlocked}>
            <KeyRound className="size-4" />
            {unlocked ? 'Unlocked' : 'Unlock'}
          </Button>
        </form>

        <div id="pw-msg" className="mt-4 min-h-12 text-sm">
          {error && <p role="alert" className="font-medium text-white">{error}</p>}
          {hint ? (
            <p className="mt-1 text-blush-200">{config.hint}</p>
          ) : (
            <button type="button" onClick={() => setHint(true)} className="mt-1 text-blush-200 underline underline-offset-4 decoration-blush-200/50 hover:text-white">
              Need a hint?
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
