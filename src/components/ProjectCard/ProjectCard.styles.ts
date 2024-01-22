import styled from 'styled-components'

// Helpers
import { color, fontBody, fontSubtitle, spacing, toRem } from '@helpers/designSystem'

// Components
import Link from 'next/link'

// Core element styles
export const ImageBlock = styled.figure`
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 0;
  filter: grayscale(100%);
  transition: filter 400ms ease-in-out;

  img {
    display: block;
    width: 100%;
  }
`

export const ProjectInfo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${color('background-primary')}EE;
  
  padding: ${spacing('xxs')};
`

export const Title = styled.h2`
  ${fontSubtitle('sm')}
  color: ${color('content-primary')};
  transition: color 400ms ease-in-out;
`

export const Source = styled.p`
  ${fontBody('sm')};
  color: ${color('content-tertiary')};
`

export const LivePreview = styled(Link)`
  display: block;
  min-width: ${toRem(160)};
  border: 1px solid ${color('border-primary')};
  border-radius: ${spacing('sm')};
  padding: ${spacing('nano')};
  text-align: center;
  
  ${fontBody('sm')};
  color: ${color('content-secondary')};
  font-weight: 600;
  text-decoration: none;
  transition: all 400ms ease-in-out;
  
  &:hover {
    background-color: ${color('brand-primary')};
    color: ${color('background-primary')};
  }
`

export const Container = styled.div`
  position: relative;

  &:hover {
    ${ImageBlock} {
      filter: grayscale(0%);
    }
  }

  &:hover {
    ${Title} {
      color: ${color('brand-primary')};
    }
  }

  &:hover {
    ${LivePreview} {
      border: 1px solid ${color('brand-primary')};
      color: ${color('brand-primary')};

      &:hover {
        background-color: ${color('brand-primary')};
        color: ${color('background-primary')};
      }
    }
  }
`
