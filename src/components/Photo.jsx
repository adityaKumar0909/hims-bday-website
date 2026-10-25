import { ImagePlus } from 'lucide-react'
import { useImage, cn } from '../lib/media'

/** Shows /public/<name>.(jpg|png|webp) if it exists, otherwise a tidy empty slot. */
export function Photo({ name, alt, label = 'Photo goes here', className, fit = 'cover' }) {
  const src = useImage(name)
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={cn('size-full', fit === 'cover' ? 'object-cover' : 'object-contain', className)}
      />
    )
  }
  return (
    <div
      className={cn(
        'size-full flex flex-col items-center justify-center gap-2 text-center p-3',
        'text-cherry-deep/70 bg-[repeating-linear-gradient(135deg,rgba(217,20,63,.07)_0_10px,transparent_10px_20px)]',
        className,
      )}
    >
      <ImagePlus className="size-6 opacity-70" strokeWidth={1.6} />
      <span className="font-hand text-lg leading-tight">{label}</span>
    </div>
  )
}
