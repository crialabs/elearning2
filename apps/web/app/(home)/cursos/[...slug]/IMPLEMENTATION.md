# Implementação de Componentes Reutilizáveis para Página de Detalhe de Curso

## Resumo da Implementação

Foram criados **9 componentes reutilizáveis** que trabalham em conjunto para construir páginas dinâmicas de detalhe de cursos. A implementação segue boas práticas de React, Next.js e design de componentes, utilizando o design-system primitivo da aplicação.

## 📁 Estrutura de Arquivos

```
apps/web/app/(home)/cursos/[...slug]/
├── page.tsx                          # Página principal (orquestrador)
├── layout.tsx                        # Layout específico (se necessário)
├── components/
│   ├── course-header/
│   │   └── index.tsx                # Hero section com breadcrumb
│   ├── media-with-text/
│   │   └── index.tsx                # Seção com imagem + conteúdo
│   ├── item-grid/
│   │   └── index.tsx                # Grid de cards
│   ├── carousel-section/
│   │   └── index.tsx                # Carousel de items
│   ├── faq-section/
│   │   └── index.tsx                # Accordion FAQ
│   ├── curriculum-section/
│   │   └── index.tsx                # Accordion com tabela de disciplinas
│   ├── quick-stats/
│   │   └── index.tsx                # Grid de estatísticas
│   ├── cta-section/
│   │   └── index.tsx                # Seção de chamada à ação
│   ├── related-courses/
│   │   └── index.tsx                # Carousel de cursos relacionados
│   └── README.md                     # Documentação de componentes
├── lib/
│   ├── types.ts                     # Interfaces TypeScript
│   ├── theme-mapper.ts              # Mapeamento de cores/tema
│   └── utils.ts                     # Funções utilitárias
└── IMPLEMENTATION.md                # Este arquivo
```

## 🎯 Componentes Implementados

### 1. CourseHeader

**Localização:** `components/course-header/index.tsx`

**Responsabilidade:** Hero section com informações principais do curso

**Props:**

- `title: string` - Título do curso
- `description: string` - Descrição resumida
- `certificationType: string` - Tipo de certificação
- `image: ImageData` - Imagem de fundo
- `breadcrumbs: BreadcrumbItem[]` - Navegação por breadcrumb
- `duration: string` - Duração do curso
- `learningModels: LearningModel[]` - Modelos de ensino disponíveis
- `button: ButtonConfig` - Botão de chamada à ação
- `theme?: ThemeColors` - Tema de cores (opcional)

**Recursos:**

- Breadcrumb dinâmico
- Badges para certificação e duração
- Listagem de modelos de ensino
- Imagem otimizada com Next.js
- Responsivo (mobile, tablet, desktop)

---

### 2. MediaWithText

**Localização:** `components/media-with-text/index.tsx`

**Responsabilidade:** Seção com imagem e conteúdo textual em layout alternado

**Props:**

- `title: string` - Título da seção
- `description: string` - Descrição principal
- `image: ImageData` - Imagem
- `imageMobile?: ImageData` - Imagem otimizada para mobile
- `bullets?: BulletItem[]` - Lista de bullets com título e descrição
- `position?: 'left' | 'right'` - Posição da imagem
- `variant?: 'neutral' | 'primary'` - Variante de cor
- `button?: ButtonConfig` - Botão (opcional)

**Recursos:**

- Layout grid com imagem alternada
- Bullets numerados com ícones
- Suporte a botão opcional
- Variantes de cor (neutral/primary)

---

### 3. ItemGrid

**Localização:** `components/item-grid/index.tsx`

**Responsabilidade:** Grid de cards com informações estruturadas

**Props:**

- `title: string` - Título da seção
- `description?: string` - Descrição
- `items: CardItem[]` - Array de cards
- `columns?: 3 | 4` - Número de colunas
- `variant?: 'card' | 'minimal'` - Estilo dos items
- `mode?: 'neutral' | 'primary'` - Modo de cor

**Recursos:**

- Grid responsivo (1, 2, 3 ou 4 colunas)
- Suporte a variantes card/minimal
- Componentes Card do design-system
- Modo primary/neutral

---

### 4. CarouselSection

**Localização:** `components/carousel-section/index.tsx`

**Responsabilidade:** Carousel horizontal com items customizáveis

**Props:**

- `title: string` - Título
- `description?: string` - Descrição
- `items: CarouselItemData[]` - Items do carousel
- `columns?: 3 | 4` - Quantidade de colunas
- `variant?: 'card' | 'minimal'` - Estilo
- `mode?: 'neutral' | 'primary'` - Modo de cor

**Recursos:**

- Componente Carousel nativo do design-system
- Controles next/previous (desktop)
- Imagens otimizadas
- Cards com hover effects
- Responsivo com touch support

---

### 5. FAQSection

**Localização:** `components/faq-section/index.tsx`

**Responsabilidade:** Accordion com perguntas e respostas

**Props:**

- `title: string` - Título da seção
- `description?: string` - Descrição
- `items: FAQItem[]` - Array de FAQs
- `mode?: 'primary' | 'neutral'` - Modo de cor
- `textCta?: string` - Texto chamada à ação
- `button?: ButtonConfig` - Botão (opcional)

**Recursos:**

- Accordion com single collapse
- Suporte a markdown no detalhe
- CTA button na base
- Acessibilidade keyboard

---

### 6. CurriculumSection

**Localização:** `components/curriculum-section/index.tsx`

**Responsabilidade:** Accordion com semestres e tabela de disciplinas

**Props:**

- `title: string` - Título
- `description?: string` - Descrição
- `disciplines: Discipline[]` - Array de disciplinas
- `expandMode?: 'all' | 'first' | 'none'` - Modo de expansão
- `mode?: 'neutral' | 'primary'` - Modo de cor

**Recursos:**

- Agrupamento automático por semestre
- Tabela com horas e tipo de disciplina
- Badges para obrigatória/eletiva
- Responsivo (oculta colunas em mobile)

---

### 7. QuickStatsGrid

**Localização:** `components/quick-stats/index.tsx`

**Responsabilidade:** Grid de estatísticas/informações rápidas

**Props:**

- `title?: string` - Título (opcional)
- `stats: QuickStatProps[]` - Array de estatísticas
- `columns?: 2 | 3 | 4` - Número de colunas
- `theme?: ThemeColors` - Tema (opcional)

**Recursos:**

- Grid responsivo com 2-4 colunas
- Suporte a ícones
- Cards com variantes de cor
- Valores grandes e legíveis

---

### 8. CTASection

**Localização:** `components/cta-section/index.tsx`

**Responsabilidade:** Seção de chamada à ação com fundo colorido

**Props:**

- `title: string` - Título
- `description?: string` - Descrição
- `button: ButtonConfig` - Botão
- `backgroundImage?: ImageData` - Imagem de fundo
- `backgroundColor?: string` - Cor de fundo
- `theme?: ThemeColors` - Tema

**Recursos:**

- Fundo colorido customizável
- Imagem de fundo com opacidade
- Botão destacado
- Centrado e responsivo

---

### 9. RelatedCourses

**Localização:** `components/related-courses/index.tsx`

**Responsabilidade:** Carousel ou grid de cursos relacionados

**Props:**

- `title: string` - Título
- `courses: CarouselItemData[]` - Cursos relacionados
- `showCarousel?: boolean` - Usar carousel ou grid
- `theme?: ThemeColors` - Tema

**Recursos:**

- Fallback entre carousel e grid
- Reutiliza CarouselSection

## 🎨 Arquivos de Suporte

### types.ts

Definições de tipos TypeScript para toda a estrutura de dados:

- `ThemeColors` - Paleta de cores da Estácio
- `Course` - Estrutura principal do curso
- `CourseHeader`, `MediaWithTextSection`, etc. - Tipos de seções
- Props interfaces para cada componente
- Tipos auxiliares (ImageData, ButtonConfig, etc.)

### theme-mapper.ts

Funções para mapeamento de cores e tema:

- `mapThemeToCSSVariables()` - Converte tema em CSS variables
- `getSectionColorsByMode()` - Retorna cores baseadas em modo
- `generateThemeStyles()` - Gera string de inline styles
- `getCSSVariableClass()` - Retorna classe Tailwind para cor

### utils.ts

Utilitários para manipulação de dados:

- `formatBreadcrumbs()` - Formata slugs em breadcrumb
- `formatDuration()` - Converte código para texto legível
- `formatCertification()` - Converte tipo de certificação
- `mapButtonType()` - Mapeia tipo de button para variante
- `isExternalUrl()`, `normalizeUrl()` - Validação e normalização de URLs
- `groupDisciplinesBySemester()` - Agrupa disciplinas por semestre
- E mais...

## 🚀 Como Usar

### Uso Básico

```tsx
// page.tsx
import { CourseHeader } from "./components/course-header";
import { MediaWithText } from "./components/media-with-text";
import { ItemGrid } from "./components/item-grid";

export default function CourseDetailPage({ params }) {
  const { course, theme } = useFetchCourseData(params.slug);

  return (
    <div>
      <CourseHeader
        title={course.title}
        description={course.description}
        {...courseProps}
        theme={theme}
      />

      <MediaWithText
        title="Objetivos"
        description={course.objectives}
        image={course.image}
        bullets={course.objectives_list}
      />

      <ItemGrid title="Competências" items={course.competencies} columns={3} />
    </div>
  );
}
```

### Integração com CMS/API

```tsx
// Substituir mockCourseData com chamada real
async function getCourseData(slug: string) {
  const response = await fetch(`/api/courses/${slug}`);
  return response.json();
}

// No page.tsx
const { course, theme } = await getCourseData(slug);
```

## 🎯 Próximos Passos

1. **Integração com CMS/API**

   - Substituir `mockCourseData` com chamada real
   - Implementar caching e revalidação ISR
   - Adicionar tratamento de erro e fallbacks

2. **Otimização de Performance**

   - Implementar lazy loading de imagens
   - Code splitting de componentes
   - Image optimization com next/image

3. **SEO**

   - Gerar meta tags dinâmicos
   - Structured data (JSON-LD)
   - Open Graph images

4. **Acessibilidade**

   - Audit WCAG 2.1
   - Keyboard navigation
   - ARIA labels completos

5. **Testes**

   - Unit tests para componentes
   - Integration tests para fluxos
   - Visual regression tests

6. **Monitoramento**
   - Analytics de eventos
   - Performance metrics
   - Error tracking

## 🔧 Troubleshooting

### Erro de imports

Se receber erro sobre paths não encontrados:

1. Verifique se todos os arquivos estão no lugar correto
2. Execute `npm install` se adicionar novos packages
3. Restart do dev server

### Tema não aplicando cores

1. Verifique se `theme` prop está sendo passado
2. Confirme estrutura ThemeColors em types.ts
3. Use browser devtools para verificar CSS variables

### Carousel não funcionando

1. Verifique se Carousel component está instalado no design-system
2. Confirme uso correto do CarouselContent e CarouselItem
3. Ajuste width em CarouselItem se necessário

## 📚 Referências

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [React Hooks Docs](https://react.dev/reference/react)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📝 Notas de Desenvolvimento

- Componentes usam `'use client'` pois dependem de React hooks e interações
- Page.tsx poderia ser convertida para Server Component se dados fossem fetched lá
- Design segue padrão de composition over inheritance
- Styling usa Tailwind para consistência com design-system

---

**Última atualização:** 13 de janeiro de 2026
**Versão:** 1.0.0
