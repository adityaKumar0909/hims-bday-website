import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import Password from './scenes/Password'
import Cake from './scenes/Cake'
import Newspaper from './scenes/Newspaper'
import Hug from './scenes/Hug'
import MemoryWall from './scenes/MemoryWall'
import Quiz from './scenes/Quiz'

// The order of the experience. Re-order or remove entries to change the flow.
const ORDER = ['password', 'cake', 'newspaper', 'hug', 'wall', 'quiz']
const SCENES = { password: Password, cake: Cake, newspaper: Newspaper, hug: Hug, wall: MemoryWall, quiz: Quiz }

export default function App() {
  // Handy for previewing: open the site with ?scene=quiz (or cake, hug, ...)
  const fromUrl = new URLSearchParams(window.location.search).get('scene')
  const [scene, setScene] = useState(ORDER.includes(fromUrl) ? fromUrl : ORDER[0])

  useEffect(() => { window.scrollTo(0, 0) }, [scene])

  const next = () => setScene((s) => ORDER[Math.min(ORDER.indexOf(s) + 1, ORDER.length - 1)])
  const restart = () => setScene(ORDER[0])
  const Scene = SCENES[scene]

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Scene onNext={next} onRestart={restart} />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
