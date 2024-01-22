// Nextjs
import type { NextPage } from 'next'

// Layout
import { DefaultLayout } from '@layouts/Default'

// Components
import { ProjectList } from '@components/ProjectList'
import { About } from '@components/About'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <About />
      <ProjectList />
    </DefaultLayout>
  )
}

export default Home
