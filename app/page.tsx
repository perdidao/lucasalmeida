import { Hero } from '@/components/sections/Hero/Hero'
import { WhatIDo } from '@/components/sections/WhatIDo/WhatIDo'
import { Philosophy } from '@/components/sections/Philosophy/Philosophy'
import { Impact } from '@/components/sections/Impact/Impact'
import { SelectedWork } from '@/components/sections/SelectedWork/SelectedWork'
import { HowIWork } from '@/components/sections/HowIWork/HowIWork'
import { DesignMindset } from '@/components/sections/DesignMindset/DesignMindset'
import { Capabilities } from '@/components/sections/Capabilities/Capabilities'
import { About } from '@/components/sections/About/About'
import { Contact } from '@/components/sections/Contact/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <Philosophy />
      <Impact />
      <SelectedWork />
      <HowIWork />
      <DesignMindset />
      <Capabilities />
      <About />
      <Contact />
    </>
  )
}
