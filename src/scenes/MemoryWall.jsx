import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Dialog } from '../components/ui/Dialog'
import { Photo } from '../components/Photo'
import { config } from '../config'
import { cn } from '../lib/media'

const ASPECTS = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-square', 'aspect-[3/4]']
const TILTS = [-2.4, 1.6, -1, 2.2, -1.8, 1.1, 2.6, -1.4, 0.8, -2.2, 1.8, -0.9]
const TAPES = ['bg-strawberry/60', 'bg-cherry/45', 'bg-blush-200/90', 'bg-strawberry/60']
const photoName = (i) => `photos/memories/${String(i + 1).padStart(2, '0')}`

export default function MemoryWall({ onNext }) {
  const [open, setOpen] = useState(null)
  const items = config.memories.slice(0, 12)
  const step = (d) => setOpen((i) => (i + d + items.length) % items.length)
  const cur = open != null ? items[open] : null

  return (
    <section className="min-h-dvh px-5 sm:px-10 py-12 bg-blush-100 bg-[repeating-linear-gradient(90deg,transparent_0_46px,rgba(217,20,63,.045)_46px_48px)]">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <h1 className="font-display font-extrabold text-[clamp(2.4rem,7vw,4.2rem)] leading-[0.95] tracking-[-0.03em]">
            Everything so far
          </h1>
          <p className="mt-3 text-muted-foreground">A few memories of us . Tap any photo to see it bigger.</p>
        </header>

        <div className="mt-12 columns-2 md:columns-3 lg:columns-4 gap-x-6 sm:gap-x-9">
          {items.map((m, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid mb-10"
              initial={{ opacity: 0, y: -36, rotate: TILTS[i] + 7, scale: 1.06 }}
              animate={{ opacity: 1, y: 0, rotate: TILTS[i], scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.15 + i * 0.07 }}
              whileHover={{ rotate: 0, y: -4 }}
            >
              <button
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${m.title}`}
                className="group relative block w-full bg-white p-2.5 pb-3 text-left shadow-[0_1px_0_rgba(74,13,34,.08),0_14px_26px_-12px_rgba(74,13,34,.45)] rounded-[3px]"
              >
                <span aria-hidden className={cn('absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 [clip-path:polygon(0_8%,6%_0,12%_8%,18%_0,24%_8%,30%_0,36%_8%,42%_0,48%_8%,54%_0,60%_8%,66%_0,72%_8%,78%_0,84%_8%,90%_0,96%_8%,100%_0,100%_92%,94%_100%,88%_92%,82%_100%,76%_92%,70%_100%,64%_92%,58%_100%,52%_92%,46%_100%,40%_92%,34%_100%,28%_92%,22%_100%,16%_92%,10%_100%,4%_92%,0_100%)]', TAPES[i % TAPES.length])} />
                <div className={cn('w-full overflow-hidden bg-blush-100', ASPECTS[i])}>
                  <Photo name={photoName(i)} alt={m.title} label={`Photo ${i + 1}`} />
                </div>
                <p className="mt-2.5 px-0.5 font-hand text-xl leading-tight text-wine">{m.title}</p>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pt-2 pb-6">
          <Button size="lg" onClick={onNext}>Play the birthday quiz</Button>
        </div>
      </div>

      <Dialog open={open != null} onClose={() => setOpen(null)} className="sheet-wide" label="Photo viewer">
        {cur && (
          <div
            className="p-3 sm:p-4"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') step(1)
              if (e.key === 'ArrowLeft') step(-1)
            }}
          >
            <div className="h-[56vh] rounded-lg overflow-hidden bg-blush-100">
              <Photo name={photoName(open)} alt={cur.title} label={`Photo ${open + 1}`} fit="contain" />
            </div>
            <div className="px-1 pt-4 pb-1">
              <h2 className="font-hand text-3xl leading-none text-cherry">{cur.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{cur.note}</p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => step(-1)} aria-label="Previous photo"><ChevronLeft className="size-4" /></Button>
              <span className="text-sm text-muted-foreground">{open + 1} of {items.length}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => step(1)} aria-label="Next photo"><ChevronRight className="size-4" /></Button>
                <Button variant="secondary" size="sm" onClick={() => setOpen(null)} aria-label="Close"><X className="size-4" /></Button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  )
}
