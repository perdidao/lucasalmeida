import React from 'react'

// Helpers

// Components
import Image from 'next/image'
import logo from '@assets/images/logo.svg'

// Types
// import { HeaderProps as Props } from './Header.types'

// Styles
import * as S from './Header.styles'

const Header = (): JSX.Element => {

  return (
    <S.Container>
      <Image
        src={logo.src}
        alt="Lucas Almeida - Consultoria e desenvolvimento web"
        width={170}
        height={80}
      />
    </S.Container>
  )
}

export default Header
