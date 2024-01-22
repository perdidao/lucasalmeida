import { color, fontBody, spacing } from '@helpers/designSystem'
import styled from 'styled-components'

// Helpers
// import { } from '@helpers/designSystem'

// Types

// Core element styles
export const Container = styled.div`
  width: 90vw;
  margin: 0 auto ${spacing('lg')};
`

export const AboutText = styled.p`
  ${fontBody('lg')};
  margin-bottom: ${spacing('lg')};
  max-width: 40vw;
`

export const AboutNote = styled.p`
  ${fontBody('sm')};
  color: ${color('content-tertiary')};
  max-width: 40vw;
`
