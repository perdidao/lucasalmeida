// Nextjs
import type { NextPage } from 'next'

// Layout
import { DefaultLayout } from '@layouts/Default'

// Components
import { ProjectList } from '@components/ProjectList'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <ProjectList />
    </DefaultLayout>
  )
}

export default Home
