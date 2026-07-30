import Image from 'next/image'
import styles from './MediaFrame.module.css'

type Variant = 'wide' | 'portrait'

type MediaFrameBase = {
  variant?: Variant
}

/**
 * Either a filled slot or an empty one — never both, and never neither.
 *
 * `alt` is required the moment `src` is supplied, so an image cannot be added
 * without an accessible name. `caption` is placeholder-only copy and is rejected
 * alongside `src`, which stops a stale "Drop image here" string surviving into a
 * slot that now has a picture in it.
 */
type MediaFrameProps = MediaFrameBase &
  (
    | { src: string; alt: string; priority?: boolean; caption?: never }
    | { src?: undefined; alt?: undefined; priority?: never; caption: string }
  )

/*
 * The frame is a fixed height with `fill`, so the browser needs to be told how
 * wide it actually renders. Both slots sit in a column of the 1180px container
 * and go full-width below the layout's 60rem breakpoint.
 */
const SIZES: Record<Variant, string> = {
  wide: '(max-width: 60rem) 100vw, 490px',
  portrait: '(max-width: 60rem) 100vw, 460px',
}

/**
 * The hairline image slot from the design. Renders the diagonal-hatch
 * placeholder until an image is dropped in, at which point the same frame
 * crops the image to the identical footprint.
 */
export function MediaFrame({
  variant = 'wide',
  src,
  alt,
  priority,
  caption,
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
          sizes={SIZES[variant]}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <span className={styles.caption}>{caption}</span>
    </div>
  )
}
