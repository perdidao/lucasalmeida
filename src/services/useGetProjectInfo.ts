import axios from 'axios'

import { useQuery, UseQueryResult } from 'react-query'

// TYPES
interface Response {
  title: string
  description: string
}

const getProjectInfo = async (): Promise<Response> => {
  const { data } = await axios.get(
    `https://run.mocky.io/v3/2abfa75a-3be0-4a2d-951c-250c95208c34`
  )

  return data
}

export const useGetProjectInfo = (): UseQueryResult<Response> => {
  return useQuery<Response>(['ProjectInfo'], () => getProjectInfo(), {
    keepPreviousData: false,
    refetchOnWindowFocus: false,
  })
}
