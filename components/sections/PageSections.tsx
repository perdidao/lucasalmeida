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
import { getMessages } from '@/content'
import type { Locale } from '@/lib/i18n/config'

/** The page body, in design order. Identical for every locale but the strings. */
export function PageSections({ locale }: { locale: Locale }) {
  const m = getMessages(locale)

  return (
    <>
      <Hero content={m.hero} tagline={m.meta.tagline} />
      <WhatIDo content={m.whatIDo} />
      <Philosophy content={m.philosophy} />
      <Impact content={m.impact} />
      <SelectedWork content={m.selectedWork} />
      <HowIWork content={m.howIWork} />
      <DesignMindset content={m.designMindset} />
      <Capabilities content={m.capabilities} />
      <About content={m.about} />
      <Contact content={m.contact} socialLabels={m.social} />
    </>
  )
}
