import { useCallback, useState } from 'react'
import { motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { Button } from '../components/ui/Button'
import StickHug from '../illustrations/StickHug'
import { useImage } from '../lib/media'
import { config } from '../config'

export default function Hug({ onNext }) {
  const herFace = useImage(config.photos.herFace)
  const hisFace = useImage(config.photos.hisFace)
  const [run, setRun] = useState(0)
  const [letter, setLetter] = useState(false)
  const onDone = useCallback(() => setLetter(true), [])
  const { greeting, paragraphs, signOff } = config.letter

  return (
    <section className="min-h-dvh px-4 pt-6 pb-14 flex flex-col items-center bg-background bg-[linear-gradient(rgba(217,20,63,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(217,20,63,.07)_1px,transparent_1px)] bg-[size:32px_32px]">
      <div className="w-full max-w-4xl pt-6 sm:pt-12">
        {/* wait for the face images to resolve so they are in place when the figures walk in */}
        {herFace !== undefined && hisFace !== undefined && (
          <StickHug key={run} herFace={herFace} hisFace={hisFace} onDone={onDone} className="w-full h-auto overflow-visible" />
        )}
      </div>

      <div className="h-10">
        {letter && (
          <button
            onClick={() => { setLetter(false); setRun((r) => r + 1) }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="size-3.5" /> Watch again
          </button>
        )}
      </div>

      {letter && (
        <motion.article
          initial={{ opacity: 0, y: 40, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: -0.6 }}
          transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          className="relative w-full max-w-xl rounded-md bg-[#fff8f9] pl-14 pr-6 sm:pr-10 py-8 shadow-[0_24px_50px_-24px_rgba(74,13,34,.5)] border border-border bg-[repeating-linear-gradient(transparent_0_33px,rgba(217,20,63,.16)_33px_34px)] bg-[position:0_32px]"
        >
          <span aria-hidden className="absolute left-10 inset-y-0 w-px bg-cherry/40" />
          <span aria-hidden className="absolute left-3.5 top-9 size-3.5 rounded-full bg-background border border-border shadow-inner" />
          <span aria-hidden className="absolute left-3.5 bottom-9 size-3.5 rounded-full bg-background border border-border shadow-inner" />
          <div className="font-hand text-[1.45rem] leading-[34px] text-wine">
            <p className="text-cherry text-[1.7rem]">{greeting}</p>
            {paragraphs.map((t, i) => <p key={i} className="mt-[34px]">{t}</p>)}
            <p className="mt-[34px] text-right text-cherry">{signOff}</p>
          </div>
        </motion.article>
      )}

      {letter && (
        <motion.div className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Button size="lg" onClick={onNext}>See our memories</Button>
        </motion.div>
      )}
    </section>
  )
}
