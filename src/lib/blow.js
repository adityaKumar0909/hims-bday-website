/**
 * Listens to the microphone and calls onBlow() when someone blows on it.
 * A blow = loud, sustained, low-frequency-heavy noise (wind rumble on the mic).
 * onLevel(0..1) is called every frame so the flames can lean while you blow.
 * Returns stop().
 */
export async function startBlowDetector({ onLevel, onBlow }) {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error('unsupported')

  // Noise suppression would remove the very sound we are listening for.
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
  })
  const Ctx = window.AudioContext || window.webkitAudioContext
  const ctx = new Ctx()
  await ctx.resume()
  const analyser = ctx.createAnalyser()
  analyser.fftSize = 2048
  ctx.createMediaStreamSource(stream).connect(analyser)

  const time = new Float32Array(analyser.fftSize)
  const freq = new Uint8Array(analyser.frequencyBinCount)
  const binHz = ctx.sampleRate / analyser.fftSize
  const lowEnd = Math.floor(500 / binHz)
  const midEnd = Math.floor(4000 / binHz)

  let raf = 0
  let stopped = false
  let smooth = 0
  let baseline = 0
  let samples = 0
  let held = 0
  let last = performance.now()
  let fired = false

  const loop = (now) => {
    if (stopped) return
    const dt = now - last
    last = now

    analyser.getFloatTimeDomainData(time)
    let sum = 0
    for (let i = 0; i < time.length; i++) sum += time[i] * time[i]
    const rms = Math.sqrt(sum / time.length)
    smooth = smooth * 0.7 + rms * 0.3

    analyser.getByteFrequencyData(freq)
    let low = 0, mid = 0
    for (let i = 1; i < lowEnd; i++) low += freq[i]
    for (let i = lowEnd; i < midEnd; i++) mid += freq[i]
    low /= Math.max(1, lowEnd - 1)
    mid /= Math.max(1, midEnd - lowEnd)

    // first ~0.8s: learn how noisy the room is
    if (samples < 48) {
      baseline = Math.max(baseline, smooth)
      samples++
    } else {
      const threshold = Math.max(0.05, baseline * 4)
      const loud = smooth > threshold
      const rumbly = low > mid * 0.9
      onLevel?.(Math.min(1, Math.max(0, (smooth - baseline) / 0.18)))
      if (loud && rumbly) held += dt
      else held = Math.max(0, held - dt * 1.5)
      if (held > 450 && !fired) {
        fired = true
        onBlow?.()
      }
    }
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  return function stop() {
    stopped = true
    cancelAnimationFrame(raf)
    stream.getTracks().forEach((t) => t.stop())
    ctx.close()
  }
}
