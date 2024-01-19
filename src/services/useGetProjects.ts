import axios from 'axios'

import { Projects } from '@models/projects'
import { useQuery, UseQueryResult } from 'react-query'

// TYPES
interface Response {
  projects: Projects
}

const getProjects = async (): Promise<Response> => {
  const { data } = await axios.get(
    `/api/projects`
  )

  return data
}

export const useGetProjects = (): UseQueryResult<Response> => {
  return useQuery<Response>(['ProjectInfo'], () => getProjects(), {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
  })
}
