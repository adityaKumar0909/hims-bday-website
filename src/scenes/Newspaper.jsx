import { motion } from 'motion/react'
import { Button } from '../components/ui/Button'
import { Photo } from '../components/Photo'
import { config } from '../config'

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .29 0 0 0 0 .05 0 0 0 0 .13 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")"

function Story({ title, children }) {
  return (
    <article>
      <h3 className="font-paper font-extrabold text-xl leading-tight">{title}</h3>
      <p className="mt-1.5 font-paper text-[15px] leading-snug text-justify hyphens-auto">{children}</p>
    </article>
  )
}

export default function Newspaper({ onNext }) {
  const date =
    config.newspaper.dateLabel ??
    new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <section className="min-h-dvh px-3 sm:px-6 py-8 flex items-center justify-center bg-background overflow-hidden">
      <motion.div
        initial={{ scale: 0.05, rotate: -720, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.15, ease: [0.18, 0.85, 0.25, 1] }}
        className="relative w-full max-w-5xl text-wine"
      >
        <div
          className="relative bg-[#ffd5de] px-5 sm:px-9 pt-6 pb-8 shadow-[0_2px_0_#f3b5c4,0_30px_60px_-25px_rgba(74,13,34,.55)]"
          style={{ backgroundImage: grain }}
        >
          {/* fold creases */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-wine/10 shadow-[1px_0_0_rgba(255,255,255,.35)]" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-wine/10 shadow-[0_1px_0_rgba(255,255,255,.35)]" />

          <div className="relative">
          {/* top strip */}
          <div className="flex justify-between gap-3 text-[11px] sm:text-xs font-paper italic border-b border-wine/70 pb-1.5">
            <span>Special edition</span>
            <span className="text-center">{date}</span>
            <span className="text-right">Price: 1 million kisses</span>
          </div>

          {/* masthead */}
          <header className="text-center pt-3 pb-2 border-b-[5px] border-double border-wine">
            <h1 className="font-fraktur text-[clamp(2.4rem,9vw,5.2rem)] leading-[1.05]">The Daily Cheeku Gazette</h1>
            <p className="font-paper italic text-sm sm:text-base pb-1">The only newspaper dedicated to her majesty's cuteness</p>
          </header>

          {/* headline */}
          <div className="text-center pt-5 pb-4 border-b border-wine/70">
            <h2 className="font-paper font-black text-[clamp(1.9rem,5.6vw,3.6rem)] leading-[1.02] tracking-tight text-cherry-deep text-balance">
              Cheeku&rsquo;s birthday officially declared a national holiday
            </h2>
            <p className="mt-2 font-paper italic text-base sm:text-lg">
              Scientists confirm global happiness levels spiked by 1000% today.
            </p>
          </div>

          {/* columns */}
          <div className="grid md:grid-cols-[1fr_1.7fr_1fr] gap-x-6 gap-y-6 pt-5">
            <div className="space-y-5 md:pr-5 md:border-r border-wine/40 order-2 md:order-1">
              <Story title="Local boy overwhelmed">
                Reports confirm that her boyfriend is once again totally mesmerized by her smile. Sources say he was spotted trying to build this entire website just to see her blush.
              </Story>
              <hr className="border-wine/40" />
              <Story title="Global sweetness alert">
                Sugar levels worldwide have been declared all-time high as Cheeku&rsquo;s cheekiness provides sufficient sweetness for the entire planet.
              </Story>
            </div>

            <figure className="order-1 md:order-2">
              <div className="aspect-[4/3] overflow-hidden border border-wine bg-[#ffc6d3]">
                <Photo name={config.photos.newspaper} alt="Cheeku" label="Her photo goes here" />
              </div>
              <figcaption className="mt-1.5 font-paper italic text-sm text-center">{config.newspaper.photoCaption}</figcaption>
            </figure>

            <div className="space-y-5 md:pl-5 md:border-l border-wine/40 order-3">
              <section className="border-2 border-wine p-3">
                <h3 className="font-paper font-extrabold text-lg leading-tight">Today&rsquo;s forecast</h3>
                <p className="mt-1 font-paper text-[15px] leading-snug">
                  A hundred percent chance of cake & fun.
                </p>
              </section>
              <section className="border border-dashed border-wine/70 p-3 text-center">
                <h3 className="font-paper font-bold text-base">Wanted</h3>
                <p className="mt-1 font-paper italic text-[15px] leading-snug">
                  One more hug, no experience necessary. Apply within.
                </p>
              </section>
            </div>
          </div>

          <div className="mt-7 flex justify-center">
            <Button size="lg" variant="ink" onClick={onNext}>Turn the page</Button>
          </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
