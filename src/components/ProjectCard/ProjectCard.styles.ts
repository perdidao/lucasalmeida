import { color, spacing } from '@helpers/designSystem'
import styled from 'styled-components'

// Helpers
// import { } from '@helpers/designSystem'

// Types

// Core element styles
export const Container = styled.div`
  position: relative;
`

export const ProjectInfo = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${color('background-primary')}DD;
  
  padding: ${spacing('xxs')};
`

export const ImageBlock = styled.figure`
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 0;

  img {
    display: block;
    width: 100%;
  }
`
