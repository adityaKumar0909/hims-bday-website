import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import confetti from 'canvas-confetti'
import { Check, Copy } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Dialog } from '../components/ui/Dialog'
import { config } from '../config'
import { cn } from '../lib/media'

const COLORS = ['#d9143f', '#ff7b9c', '#ffd3de', '#ffffff', '#b30e32']
const LETTERS = ['A', 'B', 'C', 'D']

// the right answer is first in config.js, so shuffle once per question
const shuffled = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function sideCannons() {
  const end = Date.now() + 3000
  ;(function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors: COLORS })
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors: COLORS })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
}

function Ticket() {
  const [copied, setCopied] = useState(false)
  const { code, value, note } = config.coupon
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const i = document.createElement('input')
      i.value = code
      document.body.appendChild(i)
      i.select()
      document.execCommand('copy')
      i.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }
  return (
    <div className="relative rounded-2xl bg-cherry text-primary-foreground shadow-[0_26px_50px_-22px_rgba(179,14,50,.8)]">
      <div className="px-7 pt-7 pb-8">
        <p className="text-sm text-blush-200">Amazon gift voucher</p>
        <p className="mt-1 font-display font-extrabold text-7xl leading-none tracking-[-0.04em]">₹{value}</p>
      </div>
      <div className="relative border-t-2 border-dashed border-blush-200/60">
        <span aria-hidden className="absolute -left-3 -top-3 size-6 rounded-full bg-background" />
        <span aria-hidden className="absolute -right-3 -top-3 size-6 rounded-full bg-background" />
      </div>
      <div className="px-7 py-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs text-blush-200">Coupon code</p>
          <p className="mt-0.5 font-mono text-lg sm:text-xl font-bold tracking-wider break-all">{code}</p>
        </div>
        <Button variant="light" size="sm" onClick={copy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? 'Copied' : 'Copy code'}
        </Button>
      </div>
      <p className="sr-only">{note}</p>
    </div>
  )
}

export default function Quiz({ onRestart }) {
  const questions = useMemo(() => config.quiz.map((q) => ({ ...q, options: shuffled(q.options) })), [])
  const [qi, setQi] = useState(0)
  const [prize, setPrize] = useState(0)
  const [picked, setPicked] = useState(null)
  const [hint, setHint] = useState(null)
  const finished = qi >= questions.length
  const q = questions[qi]

  const choose = (opt, idx) => {
    if (picked != null) return
    if (opt.correct) {
      setPicked(idx)
      setPrize((p) => p + config.prizePerCorrect)
      confetti({ particleCount: 45, spread: 55, origin: { y: 0.75 }, colors: COLORS })
      setTimeout(() => {
        setPicked(null)
        setQi((n) => {
          if (n + 1 >= questions.length) setTimeout(sideCannons, 250)
          return n + 1
        })
      }, 750)
    } else {
      setHint(opt.hint || "That's not it. Try another answer.")
    }
  }

  return (
    <section className="min-h-dvh px-4 py-10 sm:py-16 flex justify-center bg-background">
      <div className="w-full max-w-xl">
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-none tracking-[-0.03em]">
            {finished ? 'You did it.' : 'Birthday quiz'}
          </h1>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Prize wallet</p>
            <p className="font-display font-bold text-3xl leading-none text-cherry tabular-nums">₹{prize}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={Math.min(qi, questions.length)}>
          {questions.map((_, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full bg-blush-200 overflow-hidden">
              <span className={cn('block h-full bg-cherry rounded-full transition-all duration-500', i < qi ? 'w-full' : 'w-0')} />
            </span>
          ))}
        </div>

        {!finished ? (
          <motion.div key={qi} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <p className="text-sm text-muted-foreground">
              Question {qi + 1} of {questions.length}. ₹{config.prizePerCorrect} for every right answer.
            </p>
            <h2 className="mt-2 font-display font-bold text-2xl sm:text-[1.7rem] leading-snug tracking-tight text-balance">{q.question}</h2>
            <div role="group" aria-label="Answers" className="mt-6 space-y-3">
              {q.options.map((opt, i) => {
                const isPicked = picked === i
                return (
                  <button
                    key={opt.text}
                    onClick={() => choose(opt, i)}
                    className={cn(
                      'w-full flex items-center gap-4 rounded-xl border px-4 py-4 text-left text-[15.5px] font-medium transition-colors active:scale-[.99]',
                      isPicked
                        ? 'border-cherry bg-cherry text-primary-foreground'
                        : 'border-border bg-white/70 hover:border-cherry/60 hover:bg-white',
                    )}
                  >
                    <span className={cn('grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold', isPicked ? 'bg-white/20' : 'bg-blush-100 text-cherry-deep')}>
                      {isPicked ? <Check className="size-4" /> : LETTERS[i]}
                    </span>
                    {opt.text}
                  </button>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <h2 className="font-display font-bold text-2xl tracking-tight">Congratulations, {config.herName}!</h2>
            <p className="mt-2 mb-7 text-muted-foreground leading-relaxed">
              You scored 100% and unlocked your grand Amazon gift voucher worth <b className="text-foreground">₹{config.coupon.value}</b>.
            </p>
            <Ticket />
            <p className="mt-4 text-sm text-muted-foreground">{config.coupon.note}</p>
            <Button variant="ghost" size="sm" className="mt-6 -ml-3" onClick={onRestart}>Replay the experience</Button>
          </motion.div>
        )}
      </div>

      <Dialog open={hint != null} onClose={() => setHint(null)} label="Wrong answer">
        <div className="p-6 text-center">
          <h3 className="font-display font-bold text-2xl tracking-tight">So close!</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{hint}</p>
          <Button className="mt-6 w-full" onClick={() => setHint(null)}>Try again</Button>
        </div>
      </Dialog>
    </section>
  )
}
