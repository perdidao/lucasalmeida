import React from 'react'

// Helpers

// Components

// Assets

// Env

// Types


// Styles
import * as S from './ProjectList.styles'
import { useGetProjects } from '@services/useGetProjects'
import { ProjectCard } from '..'

const ProjectList = (): JSX.Element => {
  const {isLoading, error, data} = useGetProjects()

  if (isLoading) return <div>Loading</div>

  if (error) return <div>Error</div>

  return (
    <S.Container>
      {data?.projects.map((project) => (
        <ProjectCard key={`${project.id}-${project.slug}`} {...project} />
      ))}
    </S.Container>
  )
}

export default ProjectList
