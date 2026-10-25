import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import confetti from 'canvas-confetti'
import { Mic, MicOff } from 'lucide-react'
import { Button } from '../components/ui/Button'
import CatCake from '../illustrations/CatCake'
import { startBlowDetector } from '../lib/blow'
import { playSong } from '../lib/song'
import { config } from '../config'

const COLORS = ['#d9143f', '#ff7b9c', '#ffd3de', '#ffffff', '#b30e32']

export default function Cake({ onNext }) {
  // idle -> asking -> listening -> out   (or denied / unsupported)
  const [phase, setPhase] = useState('idle')
  const [songDone, setSongDone] = useState(false)
  const [canContinue, setCanContinue] = useState(false)
  const svgWrap = useRef(null)
  const stopRef = useRef(null)
  const firedRef = useRef(false)

  const lit = phase === 'out'

  const blowOut = () => {
    if (firedRef.current) return
    firedRef.current = true
    stopRef.current?.()
    stopRef.current = null
    setPhase('out')
    svgWrap.current?.style.setProperty('--blow', 0)
    setTimeout(() => {
      playSong(() => setSongDone(true))
      const shot = (x) => confetti({ particleCount: 70, spread: 75, angle: x ? 120 : 60, origin: { x, y: 0.7 }, colors: COLORS })
      shot(0); shot(1)
      setTimeout(() => { shot(0.1); shot(0.9) }, 700)
    }, 650)
    setTimeout(() => setCanContinue(true), 4500)
  }

  const askMic = async () => {
    setPhase('asking')
    try {
      stopRef.current = await startBlowDetector({
        onLevel: (v) => svgWrap.current?.style.setProperty('--blow', v.toFixed(2)),
        onBlow: blowOut,
      })
      setPhase('listening')
    } catch (err) {
      setPhase(err?.name === 'NotAllowedError' || err?.name === 'SecurityError' ? 'denied' : 'unsupported')
    }
  }

  useEffect(() => () => stopRef.current?.(), [])
  useEffect(() => { if (songDone) setCanContinue(true) }, [songDone])

  return (
    <section
      className="relative min-h-dvh overflow-hidden flex flex-col items-center px-6 pt-14 pb-10 transition-colors duration-[1400ms]"
      style={{ background: lit ? 'var(--color-background)' : 'var(--color-ember)', color: lit ? 'var(--color-foreground)' : '#ffe8ed' }}
    >
      {/* candle glow in the dark room */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] size-[140vmin] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-1000"
        style={{ background: 'radial-gradient(closest-side, rgba(255,150,120,.38), transparent)', opacity: lit ? 0 : 1 }}
      />

      <div className="relative z-10 text-center max-w-xl">
        <h1 className="font-display font-extrabold text-[clamp(2.4rem,8vw,4rem)] leading-none tracking-[-0.03em]">
          {lit ? `Happy birthday, ${config.herName}!` : 'Make a wish.'}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed opacity-80 min-h-12">
          {phase === 'idle' && 'Then blow out the candles. We need your microphone to hear you blow.'}
          {phase === 'asking' && 'Choose "Allow" when your browser asks about the microphone.'}
          {phase === 'listening' && 'Take a deep breath and blow on your microphone.'}
          {phase === 'denied' && 'The microphone is blocked. Allow it in your browser\u2019s site settings and reload, or tap the candles below.'}
          {phase === 'unsupported' && 'This browser can\u2019t use the microphone here. Tap the candles below instead.'}
          {lit && !songDone && 'Listen closely.'}
          {lit && songDone && 'Hope every wish comes true.'}
        </p>
      </div>

      <motion.div
        ref={svgWrap}
        className="relative z-10 mt-2 w-[min(86vw,23rem)]"
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
      >
        <CatCake out={lit} happy={lit} className="w-full h-auto overflow-visible" />
      </motion.div>

      <div className="relative z-10 mt-6 flex flex-col items-center gap-3 min-h-24">
        {phase === 'idle' && (
          <Button size="lg" onClick={askMic}>
            <Mic className="size-4" /> Turn on microphone
          </Button>
        )}
        {phase === 'asking' && <Button size="lg" disabled>Waiting for permission</Button>}
        {phase === 'listening' && (
          <span className="inline-flex items-center gap-2 text-sm font-medium opacity-90">
            <span className="size-2.5 rounded-full bg-strawberry animate-pulse" /> Listening
          </span>
        )}
        {(phase === 'denied' || phase === 'unsupported') && (
          <Button size="lg" variant="light" onClick={blowOut}><MicOff className="size-4" /> Blow out the candles</Button>
        )}
        {(phase === 'idle' || phase === 'listening') && (
          <button onClick={blowOut} className="text-sm underline underline-offset-4 opacity-60 hover:opacity-100">
            Microphone not working? Tap here
          </button>
        )}
        {lit && canContinue && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Button size="lg" onClick={onNext}>Continue</Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
