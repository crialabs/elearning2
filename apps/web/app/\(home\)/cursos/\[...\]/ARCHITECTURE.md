# 🏗️ Arquitetura de Componentes - Página de Detalhe de Curso

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│                      CMS / API / Backend                        │
│  { course, theme, header, footer, brandContext, ... }           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              page.tsx (Client Component)                         │
│  - Fetcha dados                                                  │
│  - Parse estrutura do course.body                               │
│  - Orquestra componentes                                        │
│  - Aplica tema                                                   │
└─────────────────────────────┬───────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  CourseHeader    │  │  MediaWithText   │  │    ItemGrid      │
│                  │  │                  │  │                  │
│ - Breadcrumb     │  │ - Image (left)   │  │ - 3-4 col grid   │
│ - Badges         │  │ - Bullets        │  │ - Card cards     │
│ - Learning       │  │ - Right/Left     │  │ - Minimal cards  │
│   Models         │  │   variant        │  │ - Variant        │
│ - CTA Button     │  │ - CTA button     │  │ - Mode color     │
└──────────────────┘  └──────────────────┘  └──────────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│CarouselSection   │  │   FAQSection     │  │ CurriculumSection│
│                  │  │                  │  │                  │
│ - Carousel nav   │  │ - Accordion      │  │ - Accordion      │
│ - Card slides    │  │ - Markdown body  │  │ - Semestre group │
│ - Next/Prev      │  │ - CTA button     │  │ - Table          │
│   buttons        │  │ - Accessibility  │  │ - Horas col      │
└──────────────────┘  └──────────────────┘  └──────────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  QuickStatsGrid  │  │   CTASection     │  │ RelatedCourses   │
│                  │  │                  │  │                  │
│ - Cards 2-4 col  │  │ - Fundo colorido │  │ - Carousel or    │
│ - Icons          │  │ - Imagem bg      │  │   grid           │
│ - Values large   │  │ - Button         │  │ - Cursos similar │
│ - Variants       │  │ - Centered       │  │ - Reutiliza      │
└──────────────────┘  └──────────────────┘  │   Carousel       │
                                             └──────────────────┘
```

## Estrutura de Arquivos

```
apps/web/app/(home)/cursos/[...slug]/
│
├── page.tsx                          ← Página principal (orquestrador)
│   ├── Fetcha dados do CMS/API
│   ├── Parse course.body
│   ├── Orquestra componentes
│   └── Aplica tema
│
├── lib/
│   ├── types.ts                      ← TypeScript interfaces
│   │   ├── ThemeColors
│   │   ├── Course, CourseHeader, etc
│   │   └── Props interfaces
│   │
│   ├── theme-mapper.ts               ← Mapeamento de cores
│   │   ├── mapThemeToCSSVariables()
│   │   ├── getSectionColorsByMode()
│   │   └── generateThemeStyles()
│   │
│   └── utils.ts                      ← Funções utilitárias
│       ├── formatBreadcrumbs()
│       ├── formatDuration()
│       ├── mapButtonType()
│       ├── normalizeUrl()
│       └── ~10+ mais funções
│
├── components/
│   ├── course-header/
│   │   └── index.tsx                 ← Hero section com breadcrumb
│   │
│   ├── media-with-text/
│   │   └── index.tsx                 ← Imagem + conteúdo alternado
│   │
│   ├── item-grid/
│   │   └── index.tsx                 ← Grid de cards
│   │
│   ├── carousel-section/
│   │   └── index.tsx                 ← Carousel com slides
│   │
│   ├── faq-section/
│   │   └── index.tsx                 ← Accordion FAQ
│   │
│   ├── curriculum-section/
│   │   └── index.tsx                 ← Accordion + tabela
│   │
│   ├── quick-stats/
│   │   └── index.tsx                 ← Grid de estatísticas
│   │
│   ├── cta-section/
│   │   └── index.tsx                 ← Seção de CTA
│   │
│   ├── related-courses/
│   │   └── index.tsx                 ← Cursos relacionados
│   │
│   └── README.md                     ← Documentação de componentes
│
├── IMPLEMENTATION.md                 ← Documentação completa
│
└── layout.tsx                        ← Layout específico (opcional)
```

## Fluxo de Componentes

```
┌─────────────────────────────────────────────────────────┐
│                   page.tsx                              │
│                (Client Component)                       │
│                                                         │
│  const courseData = fetchCourse(slug);                 │
│  const theme = fetchTheme();                           │
│                                                         │
│  return (                                              │
│    <div style={{ theme: themeStyles }}>                │
│      <Component1 />                                    │
│      <Component2 />                                    │
│      ...                                               │
│    </div>                                              │
│  )                                                     │
└─────────────────┬───────────────────────────────────────┘
                  │
      ┌───────────┼───────────┐
      │           │           │
      ▼           ▼           ▼
   comp1       comp2       comp3
   (props)     (props)     (props)
      │           │           │
      └─────┬─────┴─────┬─────┘
            │
    Design-System Primitives
    ├── Button
    ├── Badge
    ├── Card
    ├── Accordion
    ├── Carousel
    ├── Table
    └── ... (11 componentes)
            │
    Tailwind CSS + CSS Variables
    ├── Colors (tema)
    ├── Spacing (layout)
    ├── Typography (fontes)
    └── Responsive (breakpoints)
            │
    🎨 UI Renderizada
```

## Modelo de Props por Componente

```
CourseHeader
├── title: string
├── description: string
├── image: ImageData
├── breadcrumbs: BreadcrumbItem[]
├── duration: string
├── learningModels: LearningModel[]
├── certificationType: string
├── button: ButtonConfig
└── theme?: ThemeColors

MediaWithText
├── title: string
├── description: string
├── image: ImageData
├── imageMobile?: ImageData
├── bullets?: BulletItem[]
├── position?: "left" | "right"
├── variant?: "neutral" | "primary"
└── button?: ButtonConfig

ItemGrid
├── title: string
├── description?: string
├── items: CardItem[]
├── columns?: 3 | 4
├── variant?: "card" | "minimal"
└── mode?: "neutral" | "primary"

CarouselSection
├── title: string
├── description?: string
├── items: CarouselItemData[]
├── columns?: 3 | 4
├── variant?: "card" | "minimal"
└── mode?: "neutral" | "primary"

FAQSection
├── title: string
├── description?: string
├── items: FAQItem[]
├── mode?: "primary" | "neutral"
├── textCta?: string
└── button?: ButtonConfig

CurriculumSection
├── title: string
├── description?: string
├── disciplines: Discipline[]
├── expandMode?: "all" | "first" | "none"
└── mode?: "neutral" | "primary"

QuickStatsGrid
├── title?: string
├── stats: QuickStatProps[]
├── columns?: 2 | 3 | 4
└── theme?: ThemeColors

CTASection
├── title: string
├── description?: string
├── button: ButtonConfig
├── backgroundImage?: ImageData
├── backgroundColor?: string
└── theme?: ThemeColors

RelatedCourses
├── title: string
├── courses: CarouselItemData[]
├── showCarousel?: boolean
└── theme?: ThemeColors
```

## Fluxo de Integração com CMS

```
┌──────────────────────────┐
│   CMS / Backend API      │
│  (Estácio Portal)        │
└────────────┬─────────────┘
             │
             │ JSON Response:
             │ {
             │   course: Course,
             │   theme: ThemeColors,
             │   header: Header,
             │   footer: Footer
             │ }
             │
             ▼
┌──────────────────────────────────────────┐
│  fetchCourseData(slug)                   │
│  ─────────────────────────────────────   │
│  1. GET /api/courses/{slug}              │
│  2. Parse & validate (Zod)               │
│  3. Transform data structure             │
│  4. Cache with ISR                       │
│  5. Return typed data                    │
└────────────┬─────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────┐
│  page.tsx Component                      │
│  ─────────────────────────────────────   │
│  1. Receive courseData                   │
│  2. Parse course.body                    │
│  3. Filter sections by componentName     │
│  4. Map to appropriate component         │
│  5. Apply theme colors                   │
│  6. Render with props                    │
└────────────┬─────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────┐
│  Rendered Components                     │
│  ─────────────────────────────────────   │
│  <CourseHeader /> - Hero section         │
│  <MediaWithText /> - Seções              │
│  <ItemGrid /> - Cards                    │
│  <CarouselSection /> - Slides            │
│  <FAQSection /> - Perguntas              │
│  ... mais componentes ...                │
└──────────────────────────────────────────┘
```

## Estratégia de CSS Variables

```
Theme (JSON)
├── Cores Primárias
│   ├── primaryActionColorPure: #144BC8
│   ├── primaryActionColorHigh: #C2D4FF
│   └── primaryActionColorLow: #001F66
│
├── Cores Secundárias
│   ├── secondaryActionColorPure: #EE325D
│   ├── secondaryActionColorHigh: #FD8FA8
│   └── secondaryActionColorLow: #AE052B
│
├── Cores Neutras
│   ├── neutralColorDarkPure: #121212
│   ├── neutralColorLightPure: #FFFFFF
│   └── ... variações ...
│
└── Cores de Feedback
    ├── feedbackColorPositivePure: #54D073
    ├── feedbackColorNegativePure: #FF8771
    └── feedbackWarningPure: #FFAA33

           ↓ mapThemeToCSSVariables()

CSS Variables
├── --color-primary-pure: #144BC8
├── --color-primary-high: #C2D4FF
├── --color-primary-low: #001F66
├── --color-secondary-pure: #EE325D
├── --color-secondary-high: #FD8FA8
├── --color-secondary-low: #AE052B
├── --color-neutral-dark-pure: #121212
├── --color-neutral-light-pure: #FFFFFF
└── ... etc ...

           ↓ Aplicar ao DOM

<div style="--color-primary-pure: #144BC8; ...">
  <button class="bg-[var(--color-primary-pure)]">
    Clique aqui
  </button>
</div>
```

## Responsividade

```
Breakpoints (Tailwind)
├── Default (mobile): 0px
├── sm: 640px
├── md: 768px
├── lg: 1024px
├── xl: 1280px
└── 2xl: 1536px

Aplicação nos Componentes
├── CourseHeader
│   ├── Mobile: 1 coluna, padding 4
│   ├── Tablet: 2 colunas, padding 6
│   └── Desktop: 2 colunas, padding 8
│
├── ItemGrid
│   ├── Mobile: 1 coluna
│   ├── Tablet: 2 colunas
│   └── Desktop: 3 ou 4 colunas
│
├── Carousel
│   ├── Mobile: 1 item visível
│   ├── Tablet: 2 itens visíveis
│   └── Desktop: 3 itens visíveis
│
└── Table (Curriculum)
    ├── Mobile: Oculta colunas (md e lg)
    ├── Tablet: Mostra algumas colunas
    └── Desktop: Todas as colunas
```

---

**Este diagrama representa a estrutura completa da implementação.**

Para mais detalhes, consulte:

- [IMPLEMENTATION.md](./IMPLEMENTATION.md)
- [QUICK_START_GUIDE.md](../QUICK_START_GUIDE.md)
- [components/README.md](./components/README.md)
