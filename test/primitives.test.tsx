import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MediaFrame } from '@/components/primitives/MediaFrame/MediaFrame'
import { ButtonLink } from '@/components/primitives/ButtonLink/ButtonLink'
import { ExternalLink } from '@/components/primitives/ExternalLink/ExternalLink'
import { Eyebrow } from '@/components/primitives/Eyebrow/Eyebrow'
import { StatBlock } from '@/components/primitives/StatBlock/StatBlock'

describe('MediaFrame', () => {
  it('renders the placeholder caption while the slot is empty', () => {
    render(<MediaFrame caption="Portrait" />)
    expect(screen.getByText('Portrait')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('renders an image with its alt text once a source is supplied', () => {
    render(
      <MediaFrame
        caption="Portrait"
        src="/portrait.jpg"
        alt="Lucas Almeida at his desk"
      />,
    )
    const image = screen.getByRole('img', {
      name: 'Lucas Almeida at his desk',
    })
    expect(image).toBeInTheDocument()
    // The caption is placeholder-only copy and must not survive the swap.
    expect(screen.queryByText('Portrait')).not.toBeInTheDocument()
  })

  it('requires alt whenever src is given', () => {
    // @ts-expect-error — `src` without `alt` must remain a type error. If the
    // union in MediaFrame is ever loosened, `npm run typecheck` fails here.
    const invalid = <MediaFrame caption="Portrait" src="/portrait.jpg" />
    expect(invalid).toBeTruthy()
  })
})

describe('ButtonLink', () => {
  it('renders an anchor with the given href', () => {
    render(<ButtonLink href="#work">View selected work</ButtonLink>)
    expect(
      screen.getByRole('link', { name: /view selected work/i }),
    ).toHaveAttribute('href', '#work')
  })

  it('hides the decorative arrow from assistive tech', () => {
    const { container } = render(
      <ButtonLink href="#work" withArrow>
        View selected work
      </ButtonLink>,
    )
    // The accessible name must not pick up the arrow glyph.
    expect(
      screen.getByRole('link', { name: 'View selected work' }),
    ).toBeInTheDocument()
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
  })
})

describe('ExternalLink', () => {
  it('guards off-site destinations', () => {
    render(<ExternalLink href="https://github.com/perdidao">GitHub</ExternalLink>)
    const link = screen.getByRole('link', { name: 'GitHub' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
  })

  it.each(['#contact', 'mailto:contato@lucasalmeida.dev', '/cv', 'tel:+5543'])(
    'leaves %s in the same tab',
    (href) => {
      render(<ExternalLink href={href}>Link</ExternalLink>)
      const link = screen.getByRole('link', { name: 'Link' })
      expect(link).not.toHaveAttribute('target')
      expect(link).not.toHaveAttribute('rel')
    },
  )
})

describe('Eyebrow', () => {
  it('renders as a paragraph by default', () => {
    const { container } = render(<Eyebrow>01 — What I do</Eyebrow>)
    expect(container.querySelector('p')).not.toBeNull()
  })

  it('can carry a section heading role when it is the only title', () => {
    render(
      <Eyebrow as="h2" id="impact-title">
        03 — Impact
      </Eyebrow>,
    )
    expect(
      screen.getByRole('heading', { level: 2, name: /03 — Impact/ }),
    ).toHaveAttribute('id', 'impact-title')
  })

  it('hides the status dot from assistive tech', () => {
    const { container } = render(<Eyebrow withDot>Tagline</Eyebrow>)
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull()
  })
})

describe('StatBlock', () => {
  it('keeps the figure and its explanation associated', () => {
    const { container } = render(
      <StatBlock value="15+" label="Years building digital products" />,
    )
    const list = container.querySelector('dl')!
    expect(list.querySelector('dt')).toHaveTextContent('15+')
    expect(list.querySelector('dd')).toHaveTextContent(
      'Years building digital products',
    )
  })
})
