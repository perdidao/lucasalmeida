import type { Messages } from '@/lib/i18n/types'

export const en = {
  meta: {
    role: 'Product Engineer',
    tagline: 'Engineering × Product × Design',
    description:
      'Lucas Almeida is a Product Engineer with 15+ years building digital products — engineering, product strategy, UX and business impact. Frontend architecture, developer experience, technical leadership.',
    keywords: [
      'Product Engineer',
      'Senior Product Engineer',
      'Full Stack Engineer',
      'Software Architect',
      'Frontend Architecture',
      'UX Engineering',
      'Digital Product Development',
      'Product Strategy',
      'Developer Experience',
      'Technical Leadership',
    ],
  },

  a11y: {
    skipToContent: 'Skip to content',
    languageLabel: 'Language',
    switchLanguagePrefix: 'Switch to',
    navPrimary: 'Primary',
    navMobile: 'Primary, mobile',
    menuOpen: 'Menu',
    menuClose: 'Close menu',
  },

  nav: {
    labels: { work: 'Work', approach: 'Approach', about: 'About' },
    cta: 'Get in touch',
  },

  social: {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'Email',
    x: 'X',
    whatsapp: 'WhatsApp',
    discord: 'Discord',
  },

  hero: {
    headingBefore: 'I build products people ',
    headingEmphasis: 'actually',
    headingAfter: ' enjoy using.',
    paragraphs: [
      "I'm a Product Engineer with more than 15 years of experience helping companies transform ideas into scalable digital products. My work sits at the intersection of engineering, product strategy, user experience and business.",
      "Whether I'm improving onboarding, rebuilding legacy systems, optimizing performance or designing new experiences, the goal is always the same: create products that people love using and teams love building.",
    ],
    primaryCta: 'View selected work',
    secondaryCta: "Let's build something together",
  },

  whatIDo: {
    eyebrow: '01 — What I do',
    heading: 'Building products, not just software.',
    body: 'Writing code is only part of the job. The real challenge is understanding people, business goals and technical constraints at the same time.',
    pullQuote: {
      lead: 'Technology changes constantly.',
      trail: "Great products don't.",
    },
    listLabel: 'Across the full product lifecycle',
    items: [
      'Discovering problems',
      'Designing better experiences',
      'Building scalable software',
      'Improving performance',
      'Measuring impact',
    ],
  },

  philosophy: {
    eyebrow: '02 — Core philosophy',
    heading: 'Four principles behind everything I ship.',
    principles: [
      {
        numeral: 'I.',
        title: 'Think before building.',
        body: 'Understand the business before writing code.',
      },
      {
        numeral: 'II.',
        title: 'Design with purpose.',
        body: 'Every interface should solve a problem, not create one.',
      },
      {
        numeral: 'III.',
        title: 'Keep complexity invisible.',
        body: 'Users should experience simplicity even when the system behind it is complex.',
      },
      {
        numeral: 'IV.',
        title: 'Measure everything.',
        body: "If it doesn't improve outcomes, it isn't finished.",
      },
    ],
  },

  impact: {
    eyebrow: '03 — Impact',
    aside: 'Outcomes, not technologies.',
    stats: [
      { value: '15+', label: 'Years building digital products', accent: false },
      { value: '100+', label: 'Projects delivered', accent: false },
      {
        value: 'Millions',
        label: "Users impacted through products I've contributed to",
        accent: true,
      },
      {
        value: '10k+',
        label: "Daily platform interactions on products I've helped improve",
        accent: false,
      },
      {
        value: '34k+',
        label: 'Monthly subscribers supported on gaming infrastructure products',
        accent: false,
      },
    ],
  },

  selectedWork: {
    eyebrow: '04 — Selected work',
    heading: 'Three stories about product decisions.',
    intro:
      'Not a list of repositories. Each one starts with a problem and ends with what changed because of it.',
    cases: [
      {
        kicker: 'Featured · Esports platform',
        title: 'Gamers Club',
        summary:
          "One of Latin America's largest esports platforms — millions of competitive players, matches running around the clock.",
        mediaCaption: 'Match experience UI',
        blocks: [
          {
            label: 'The challenge',
            body: 'A frontend grown faster than its architecture. Feature velocity was slowing, the experience felt inconsistent across surfaces, and peak-traffic performance shaped how players perceived the whole product.',
          },
          {
            label: 'Decisions',
            body: 'Restructure the frontend around product domains instead of pages. Standardize shared interface patterns so teams stop re-deciding the same things. Treat performance as a product requirement with an owner, not a cleanup task.',
          },
          {
            label: 'My contribution',
            body: 'Frontend architecture and scalability, shared component foundations, and the product work around the competitive experience — sitting between design, product and platform teams rather than waiting for specs.',
          },
        ],
        outcomeLabel: 'What changed',
        outcomeStats: [
          { value: '10k+', label: 'daily interactions on improved surfaces' },
          { value: '34k+', label: 'monthly subscribers supported' },
        ],
      },
      {
        kicker: 'Onboarding · Conversion',
        title: 'Minehut',
        summary:
          "One of the world's largest Minecraft hosting platforms, where most new users are teenagers creating their first server.",
        mediaCaption: 'Server creation flow',
        blocks: [
          {
            label: 'The challenge',
            body: 'Creating a server required understanding infrastructure concepts before getting to the fun part. Plenty of signups, far fewer players who ever reached a running world — and premium upgrades were framed as features, not as outcomes people wanted.',
          },
          {
            label: 'Decisions',
            body: "Move the first success moment as early as possible and defer every configuration choice that isn't required to play. Explain premium in terms of what it unlocks for a player's community. Instrument the funnel step by step before changing it.",
          },
          {
            label: 'My contribution',
            body: 'Onboarding and server-creation experience, premium conversion surfaces, and the UX decisions behind them — from flow design through implementation and measurement.',
          },
        ],
        outcomeLabel: 'What changed',
        outcomeBody:
          'A shorter path from signup to a live server, a clearer premium story, and a funnel the team could reason about with data instead of opinions.',
      },
      {
        kicker: 'Discovery → Deployment',
        title: 'Freelance & Consulting',
        summary:
          'Complete digital products across healthcare, finance, retail, beauty and service industries.',
        tags: ['Healthcare', 'Finance', 'Retail', 'Beauty', 'Services'],
        blocks: [
          {
            label: 'The challenge',
            body: 'Most clients arrived with a solution already written down. The actual work was separating the request from the problem underneath it — often before a single line of code was justified.',
          },
          {
            label: 'Decisions',
            body: "Start every engagement with discovery and a written definition of success. Ship a small, real slice early instead of a long specification. Choose boring, maintainable technology the client's team can own after handover.",
          },
          {
            label: 'My contribution',
            body: 'End-to-end ownership: discovery, product definition, interface design, architecture, implementation, deployment and the follow-up work after launch.',
          },
        ],
        outcomeLabel: 'What changed',
        outcomeBody:
          "100+ products delivered across five industries — several replacing manual operations entirely, and most maintained by the client's own team afterwards.",
      },
    ],
  },

  howIWork: {
    eyebrow: '05 — How I work',
    heading: 'A process that keeps decisions cheap.',
    steps: [
      { index: '01', title: 'Understand', body: 'Learn the business.' },
      { index: '02', title: 'Simplify', body: 'Reduce unnecessary complexity.' },
      { index: '03', title: 'Prototype', body: 'Validate ideas quickly.' },
      { index: '04', title: 'Build', body: 'Create scalable systems.' },
      {
        index: '05',
        title: 'Measure',
        body: 'Optimize using real feedback and data.',
      },
    ],
  },

  designMindset: {
    eyebrow: '06 — Design mindset',
    statement:
      'I started as a designer, then became an engineer. That order changed everything.',
    paragraphs: [
      'Design taught me to look at a product from the outside in — what someone is trying to accomplish, where they hesitate, what they should never have to think about. Engineering taught me what it costs to deliver that.',
      'So usability, accessibility, visual hierarchy, developer experience and business impact are part of how I think before implementation starts — not a review step afterwards. Bridging those two languages is the most useful thing I do.',
    ],
  },

  capabilities: {
    eyebrow: '07 — Capabilities',
    heading: 'Organized by what it lets me do.',
    aside:
      'Tools are interchangeable. The capability is what a team actually hires.',
    groups: [
      { label: 'Frontend', items: ['React', 'Next.js', 'Vue', 'TypeScript'] },
      { label: 'Backend', items: ['Node.js', 'NestJS', 'PHP', 'Go'] },
      {
        label: 'Infrastructure',
        items: [
          'Docker',
          'Kubernetes',
          'Cloudflare',
          'Redis',
          'MySQL',
          'PostgreSQL',
        ],
      },
      {
        label: 'Developer Experience',
        items: ['Architecture', 'Performance', 'Testing', 'CI/CD'],
      },
      {
        label: 'Product',
        items: [
          'UX',
          'Analytics',
          'Design Systems',
          'Experimentation',
          'AI Integrations',
        ],
      },
    ],
  },

  about: {
    eyebrow: '08 — About',
    milestones: [
      {
        when: 'Started',
        what: 'As a designer, learning how people actually use things.',
        current: false,
      },
      {
        when: 'Then',
        what: 'Moved into software engineering to build what I was drawing.',
        current: false,
      },
      {
        when: 'Later',
        what: 'Expanded into architecture, because scale is a product concern.',
        current: false,
      },
      {
        when: 'Today',
        what: 'Product Engineering — technical depth, design thinking and business understanding in one role.',
        current: true,
      },
    ],
    closing:
      'The through line is the same at every step: build products that are easier to use, easier to scale and more valuable for the companies behind them. Fifteen years in, that’s still the only scorecard I trust.',
    portraitCaption: 'Portrait',
  },

  contact: {
    eyebrow: '09 — Contact',
    heading: 'Have an interesting product challenge?',
    body: "Whether you're launching something new, modernizing an existing platform or simply exploring an idea, I'd love to hear about it. Let's build something meaningful together.",
  },

  footer: {
    backToTop: 'Back to top',
  },

  og: {
    footnote: '15+ years building products',
  },
} satisfies Messages
