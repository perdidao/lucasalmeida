import type { Messages } from '@/lib/i18n/types'

/**
 * Brazilian Portuguese.
 *
 * Written as copy in Portuguese rather than a literal translation — the English
 * is editorial and a word-for-word rendering reads stiff. Conventions:
 *   - Brazilian usage ("desempenho", "experiência do usuário"), not European.
 *   - Established English technical terms stay in English where a Brazilian
 *     engineer would actually use them: frontend, onboarding, deploy, discovery,
 *     design system, developer experience.
 *   - Section numbers, Roman numerals and metrics are identical in both locales.
 */
export const ptBR = {
  meta: {
    role: 'Engenheiro de Produto',
    tagline: 'Engenharia × Produto × Design',
    description:
      'Lucas Almeida é Engenheiro de Produto com mais de 15 anos construindo produtos digitais — engenharia, estratégia de produto, UX e impacto no negócio. Arquitetura frontend, developer experience e liderança técnica.',
    keywords: [
      'Engenheiro de Produto',
      'Engenheiro de Produto Sênior',
      'Desenvolvedor Full Stack',
      'Arquiteto de Software',
      'Arquitetura Frontend',
      'Engenharia de UX',
      'Desenvolvimento de Produtos Digitais',
      'Estratégia de Produto',
      'Developer Experience',
      'Liderança Técnica',
    ],
  },

  a11y: {
    skipToContent: 'Ir para o conteúdo',
    languageLabel: 'Idioma',
    switchLanguagePrefix: 'Mudar para',
    navPrimary: 'Principal',
    navMobile: 'Principal, mobile',
    menuOpen: 'Menu',
    menuClose: 'Fechar menu',
  },

  nav: {
    labels: { work: 'Trabalhos', approach: 'Abordagem', about: 'Sobre' },
    cta: 'Entre em contato',
  },

  social: {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    email: 'E-mail',
    x: 'X',
    whatsapp: 'WhatsApp',
    discord: 'Discord',
  },

  hero: {
    headingBefore: 'Eu construo produtos que as pessoas ',
    headingEmphasis: 'realmente',
    headingAfter: ' gostam de usar.',
    paragraphs: [
      'Sou Engenheiro de Produto com mais de 15 anos de experiência ajudando empresas a transformar ideias em produtos digitais escaláveis. Meu trabalho fica na interseção entre engenharia, estratégia de produto, experiência do usuário e negócio.',
      'Seja melhorando o onboarding, reconstruindo sistemas legados, otimizando desempenho ou desenhando novas experiências, o objetivo é sempre o mesmo: criar produtos que as pessoas amem usar e que os times amem construir.',
    ],
    primaryCta: 'Ver trabalhos selecionados',
    secondaryCta: 'Vamos construir algo juntos',
  },

  whatIDo: {
    eyebrow: '01 — O que eu faço',
    heading: 'Construir produtos, não apenas software.',
    body: 'Escrever código é só parte do trabalho. O desafio de verdade é entender pessoas, objetivos de negócio e restrições técnicas ao mesmo tempo.',
    pullQuote: {
      lead: 'A tecnologia muda constantemente.',
      trail: 'Produtos excelentes, não.',
    },
    listLabel: 'Em todo o ciclo de vida do produto',
    items: [
      'Descobrir problemas',
      'Desenhar experiências melhores',
      'Construir software escalável',
      'Melhorar o desempenho',
      'Medir o impacto',
    ],
  },

  philosophy: {
    eyebrow: '02 — Filosofia',
    heading: 'Quatro princípios por trás de tudo que eu entrego.',
    principles: [
      {
        numeral: 'I.',
        title: 'Pense antes de construir.',
        body: 'Entenda o negócio antes de escrever código.',
      },
      {
        numeral: 'II.',
        title: 'Desenhe com propósito.',
        body: 'Toda interface deve resolver um problema, não criar um.',
      },
      {
        numeral: 'III.',
        title: 'Mantenha a complexidade invisível.',
        body: 'As pessoas devem sentir simplicidade mesmo quando o sistema por trás é complexo.',
      },
      {
        numeral: 'IV.',
        title: 'Meça tudo.',
        body: 'Se não melhora os resultados, não está pronto.',
      },
    ],
  },

  impact: {
    eyebrow: '03 — Impacto',
    aside: 'Resultados, não tecnologias.',
    stats: [
      {
        value: '15+',
        label: 'Anos construindo produtos digitais',
        accent: false,
      },
      { value: '100+', label: 'Projetos entregues', accent: false },
      {
        value: 'Milhões',
        label: 'Usuários impactados por produtos que ajudei a construir',
        accent: true,
      },
      {
        value: '10k+',
        label: 'Interações diárias em produtos que ajudei a melhorar',
        accent: false,
      },
      {
        value: '34k+',
        label: 'Assinantes mensais atendidos em produtos de infraestrutura para games',
        accent: false,
      },
    ],
  },

  selectedWork: {
    eyebrow: '04 — Trabalhos selecionados',
    heading: 'Três histórias sobre decisões de produto.',
    intro:
      'Não é uma lista de repositórios. Cada uma começa com um problema e termina com o que mudou por causa dele.',
    cases: [
      {
        kicker: 'Destaque · Plataforma de esports',
        title: 'Gamers Club',
        summary:
          'Uma das maiores plataformas de esports da América Latina — milhões de jogadores competitivos e partidas acontecendo a qualquer hora do dia.',
        mediaCaption: 'Interface da experiência de partida',
        blocks: [
          {
            label: 'O desafio',
            body: 'Um frontend que cresceu mais rápido que a própria arquitetura. A velocidade de entrega caía, a experiência era inconsistente entre as telas, e o desempenho nos horários de pico definia como os jogadores percebiam o produto inteiro.',
          },
          {
            label: 'Decisões',
            body: 'Reestruturar o frontend em torno de domínios de produto em vez de páginas. Padronizar os componentes de interface compartilhados para que os times parem de redecidir as mesmas coisas. Tratar desempenho como requisito de produto, com responsável definido, e não como tarefa de limpeza.',
          },
          {
            label: 'Minha contribuição',
            body: 'Arquitetura e escalabilidade do frontend, a base de componentes compartilhados e o trabalho de produto em torno da experiência competitiva — atuando entre os times de design, produto e plataforma em vez de esperar por especificações.',
          },
        ],
        outcomeLabel: 'O que mudou',
        outcomeStats: [
          { value: '10k+', label: 'interações diárias nas telas melhoradas' },
          { value: '34k+', label: 'assinantes mensais atendidos' },
        ],
      },
      {
        kicker: 'Onboarding · Conversão',
        title: 'Minehut',
        summary:
          'Uma das maiores plataformas de hospedagem de Minecraft do mundo, onde a maior parte dos novos usuários são adolescentes criando seu primeiro servidor.',
        mediaCaption: 'Fluxo de criação de servidor',
        blocks: [
          {
            label: 'O desafio',
            body: 'Criar um servidor exigia entender conceitos de infraestrutura antes de chegar à parte divertida. Muitos cadastros e bem menos jogadores que realmente chegavam a um mundo rodando — e os planos premium eram apresentados como funcionalidades, não como resultados que as pessoas queriam.',
          },
          {
            label: 'Decisões',
            body: 'Antecipar ao máximo o primeiro momento de sucesso e adiar toda decisão de configuração que não fosse necessária para jogar. Explicar o premium pelo que ele libera para a comunidade do jogador. Instrumentar o funil passo a passo antes de mudá-lo.',
          },
          {
            label: 'Minha contribuição',
            body: 'A experiência de onboarding e criação de servidores, as telas de conversão para premium e as decisões de UX por trás delas — do desenho do fluxo à implementação e à medição.',
          },
        ],
        outcomeLabel: 'O que mudou',
        outcomeBody:
          'Um caminho mais curto entre o cadastro e um servidor no ar, uma proposta de premium mais clara e um funil que o time conseguia analisar com dados em vez de opiniões.',
      },
      {
        kicker: 'Discovery → Deploy',
        title: 'Freelance e Consultoria',
        summary:
          'Produtos digitais completos nos setores de saúde, finanças, varejo, beleza e serviços.',
        tags: ['Saúde', 'Finanças', 'Varejo', 'Beleza', 'Serviços'],
        blocks: [
          {
            label: 'O desafio',
            body: 'A maioria dos clientes chegava com a solução já escrita. O trabalho real era separar o pedido do problema que estava por baixo dele — muitas vezes antes de uma única linha de código se justificar.',
          },
          {
            label: 'Decisões',
            body: 'Começar todo projeto com discovery e uma definição de sucesso por escrito. Entregar cedo uma fatia pequena e real em vez de uma especificação longa. Escolher tecnologia sem graça e sustentável, que o time do cliente consiga manter depois da entrega.',
          },
          {
            label: 'Minha contribuição',
            body: 'Responsabilidade de ponta a ponta: discovery, definição do produto, design de interface, arquitetura, implementação, deploy e o acompanhamento depois do lançamento.',
          },
        ],
        outcomeLabel: 'O que mudou',
        outcomeBody:
          'Mais de 100 produtos entregues em cinco setores — vários substituindo operações manuais por completo, e a maioria mantida depois pelo próprio time do cliente.',
      },
    ],
  },

  howIWork: {
    eyebrow: '05 — Como eu trabalho',
    heading: 'Um processo que mantém as decisões baratas.',
    steps: [
      { index: '01', title: 'Entender', body: 'Conhecer o negócio.' },
      {
        index: '02',
        title: 'Simplificar',
        body: 'Reduzir complexidade desnecessária.',
      },
      { index: '03', title: 'Prototipar', body: 'Validar ideias rapidamente.' },
      { index: '04', title: 'Construir', body: 'Criar sistemas escaláveis.' },
      {
        index: '05',
        title: 'Medir',
        body: 'Otimizar com dados e feedback real.',
      },
    ],
  },

  designMindset: {
    eyebrow: '06 — Mentalidade de design',
    statement:
      'Comecei como designer e depois me tornei engenheiro. Essa ordem mudou tudo.',
    paragraphs: [
      'O design me ensinou a olhar o produto de fora para dentro — o que a pessoa está tentando fazer, onde ela hesita, aquilo em que ela nunca deveria precisar pensar. A engenharia me ensinou quanto custa entregar isso.',
      'Então usabilidade, acessibilidade, hierarquia visual, developer experience e impacto no negócio fazem parte de como eu penso antes de a implementação começar — e não de uma etapa de revisão depois. Traduzir entre essas duas linguagens é a coisa mais útil que eu faço.',
    ],
  },

  capabilities: {
    eyebrow: '07 — Competências',
    heading: 'Organizadas pelo que elas me permitem fazer.',
    aside:
      'Ferramentas são substituíveis. O que um time contrata de verdade é a competência.',
    groups: [
      { label: 'Frontend', items: ['React', 'Next.js', 'Vue', 'TypeScript'] },
      { label: 'Backend', items: ['Node.js', 'NestJS', 'PHP', 'Go'] },
      {
        label: 'Infraestrutura',
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
        items: ['Arquitetura', 'Desempenho', 'Testes', 'CI/CD'],
      },
      {
        label: 'Produto',
        items: [
          'UX',
          'Analytics',
          'Design Systems',
          'Experimentação',
          'Integrações com IA',
        ],
      },
    ],
  },

  about: {
    eyebrow: '08 — Sobre',
    milestones: [
      {
        when: 'Início',
        what: 'Como designer, aprendendo como as pessoas realmente usam as coisas.',
        current: false,
      },
      {
        when: 'Depois',
        what: 'Migrei para engenharia de software para construir o que eu desenhava.',
        current: false,
      },
      {
        when: 'Mais tarde',
        what: 'Expandi para arquitetura, porque escala é uma questão de produto.',
        current: false,
      },
      {
        when: 'Hoje',
        what: 'Engenharia de Produto — profundidade técnica, pensamento de design e entendimento de negócio em um só papel.',
        current: true,
      },
    ],
    closing:
      'O fio condutor é o mesmo em cada etapa: construir produtos mais fáceis de usar, mais fáceis de escalar e mais valiosos para as empresas por trás deles. Quinze anos depois, esse ainda é o único placar em que eu confio.',
    portraitCaption: 'Retrato',
  },

  contact: {
    eyebrow: '09 — Contato',
    heading: 'Tem um desafio de produto interessante?',
    body: 'Se você está lançando algo novo, modernizando uma plataforma existente ou apenas explorando uma ideia, eu vou gostar de ouvir sobre isso. Vamos construir junto algo que faça sentido.',
  },

  footer: {
    backToTop: 'Voltar ao topo',
  },

  og: {
    footnote: 'Mais de 15 anos construindo produtos',
  },
} satisfies Messages
