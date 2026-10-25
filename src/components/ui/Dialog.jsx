import { useEffect, useRef } from 'react'
import { cn } from '../../lib/media'

/** Thin wrapper over the native <dialog>: focus trap, Esc to close and backdrop come for free. */
export function Dialog({ open, onClose, className, children, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={cn('sheet', className)}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose?.() }}
    >
      {open ? children : null}
    </dialog>
  )
}
