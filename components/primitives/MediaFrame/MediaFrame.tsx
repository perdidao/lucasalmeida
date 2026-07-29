import Image from 'next/image'
import { Logo } from '@/components/primitives/Logo/Logo'
import styles from './MediaFrame.module.css'

type MediaFrameBase = {
  /** Describes what belongs in the slot. Shown only while the slot is empty. */
  caption: string
  variant?: 'wide' | 'portrait'
  /** Overlays the oversized accent monogram (the About portrait in the design). */
  monogram?: boolean
}

/**
 * `alt` is required the moment `src` is supplied — an image slot cannot be
 * filled without an accessible name. The union makes that a type error rather
 * than something a reviewer has to notice.
 */
type MediaFrameProps = MediaFrameBase &
  (
    | { src: string; alt: string; priority?: boolean }
    | { src?: undefined; alt?: undefined; priority?: undefined }
  )

/**
 * The hairline image slot from the design. Renders the diagonal-hatch
 * placeholder until an image is dropped in, at which point the same frame
 * crops the image to the identical footprint — no markup change required.
 */
export function MediaFrame({
  caption,
  variant = 'wide',
  monogram = false,
  src,
  alt,
  priority,
}: MediaFrameProps) {
  const className = [styles.frame, styles[variant], !src && styles.empty]
    .filter(Boolean)
    .join(' ')

  if (src) {
    return (
      <div className={className}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={styles.image}
          sizes="(max-width: 860px) 100vw, 45vw"
        />
      </div>
    )
  }

  return (
    <div className={className}>
      {monogram && <Logo size={180} className={styles.monogram} />}
      <span className={styles.caption}>{caption}</span>
    </div>
  )
}
