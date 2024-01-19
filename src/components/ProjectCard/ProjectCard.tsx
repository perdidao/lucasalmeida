import React from 'react'

// Helpers

// Components
import Link from 'next/link'

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
    categories,
    url,
    thumbnail
  } = props

  return (
    <S.Container>
      <S.ProjectInfo>
        <h2>{title}</h2>
        <p>{source}</p>
        <p>{categories.map((category) => category.name).join(', ')}</p>

        <Link href={url} target='_blank'>
          Visit
        </Link>
      </S.ProjectInfo>
      <S.ImageBlock>
        <img src={thumbnail} alt={`Pré-visualização do projeto ${title}`} />
      </S.ImageBlock>
    </S.Container>
  )
}

export default ProjectCard
