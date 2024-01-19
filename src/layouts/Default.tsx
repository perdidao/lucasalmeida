import React from 'react'
import { ThemeProvider } from 'styled-components'

// Nextjs
import Head from 'next/head'

// Types
import { LayoutProps } from '@layouts/Default.types'

// Styles
import { theme } from '@theme/default'
import { Header } from '@components/Header'

// Components

const DefaultLayout = ({ children, title, description }: LayoutProps) => {
  const pageTitle = title
    ? `${title} | Lucas Almeida - Consultoria e desenvolvimento web`
    : 'Lucas Almeida - Consultoria e desenvolvimento web'

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={description}
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      {children}
    </ThemeProvider>
  )
}

export { DefaultLayout }
