import { spacing } from '@helpers/designSystem'
import styled from 'styled-components'

// Helpers
// import { } from '@helpers/designSystem'

// Types

// Core element styles
export const Container = styled.div`
  width: 90vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${spacing('sm')};
`
