import React from 'react'

// Helpers

// Components

// Assets

// Env

// Types
import { Project } from '@models/projects'

// Styles
import * as S from './ProjectCard.styles'

const ProjectCard = (props: Project): JSX.Element => {
  const {
    title,
    source,
    releaseYear,
    url,
    thumbnail
  } = props

  return (
    <S.Container>
      <S.ProjectInfo>
        <div>
          <S.Title>{title} ({releaseYear})</S.Title>
          <S.Source>{source}</S.Source>
        </div>
        <S.LivePreview href={url} target='_blank'>
          Live Preview
        </S.LivePreview>
      </S.ProjectInfo>
      <S.ImageBlock>
        <img src={thumbnail} alt={`Pré-visualização do projeto ${title}`} />
      </S.ImageBlock>
    </S.Container>
  )
}

export default ProjectCard
