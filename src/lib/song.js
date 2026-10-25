import { asset } from './media'
import { config } from '../config'

let audioEl = null
let synth = null

export function stopSong() {
  if (audioEl) { audioEl.pause(); audioEl = null }
  if (synth) { synth.stop(); synth = null }
}

/** Plays /public/audio/happy-birthday.mp3. If it is missing, plays a simple beep melody. */
export function playSong(onEnd) {
  stopSong()
  const el = new Audio(asset(config.song))
  audioEl = el
  let fell = false
  const fallback = () => {
    if (fell) return
    fell = true
    if (audioEl === el) audioEl = null
    synth = playSynth(onEnd)
  }
  el.addEventListener('error', fallback, { once: true })
  el.addEventListener('ended', () => onEnd?.(), { once: true })
  el.play().catch(fallback)
}

function playSynth(onEnd) {
  const Ctx = window.AudioContext || window.webkitAudioContext
  const ctx = new Ctx()
  const beat = 60 / 112
  const notes = [
    [67, 0.75], [67, 0.25], [69, 1], [67, 1], [72, 1], [71, 2],
    [67, 0.75], [67, 0.25], [69, 1], [67, 1], [74, 1], [72, 2],
    [67, 0.75], [67, 0.25], [79, 1], [76, 1], [72, 1], [71, 1], [69, 1],
    [77, 0.75], [77, 0.25], [76, 1], [72, 1], [74, 1], [72, 2.5],
  ]
  let t = ctx.currentTime + 0.1
  notes.forEach(([m, b]) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'triangle'
    o.frequency.value = 440 * 2 ** ((m - 69) / 12)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.linearRampToValueAtTime(0.22, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.001, t + b * beat * 0.95)
    o.connect(g).connect(ctx.destination)
    o.start(t)
    o.stop(t + b * beat)
    t += b * beat
  })
  const timer = setTimeout(() => { onEnd?.(); ctx.close() }, (t - ctx.currentTime) * 1000 + 200)
  return { stop() { clearTimeout(timer); ctx.close() } }
}
