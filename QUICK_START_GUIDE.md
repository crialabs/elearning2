# 🚀 Guia Rápido de Uso - Componentes de Página de Detalhe de Curso

## ⚡ Quick Start (5 minutos)

### 1. Verificar Estrutura

```bash
# Verifique se todos os arquivos foram criados
ls -la apps/web/app/\(home\)/cursos/\[...\]/components/
ls -la apps/web/app/\(home\)/cursos/\[...\]/lib/
```

### 2. Usar os Componentes (page.tsx)

```tsx
import { CourseHeader, MediaWithText, ItemGrid } from "./components";
import type { Course, ThemeColors } from "./lib/types";

export default function CourseDetailPage() {
  const course = fetchCourseData(); // TODO: implementar
  const theme = fetchTheme(); // TODO: implementar

  return (
    <div>
      <CourseHeader {...courseHeaderProps} theme={theme} />
      <MediaWithText {...mediaProps} />
      <ItemGrid {...gridProps} />
    </div>
  );
}
```

### 3. Integração com CMS/API

```tsx
// 1. Criar função de fetch
async function getCourseData(slug: string) {
  const response = await fetch(`https://seu-cms.com/api/courses/${slug}`);
  if (!response.ok) throw new Error("Curso não encontrado");
  return response.json();
}

// 2. Usar no page.tsx
const { course, theme } = await getCourseData(slug);
const courseHeader = findFirstSection(
  course.body,
  "course-header.course-header-section-v2"
);

// 3. Passar para componente
<CourseHeader
  title={courseHeader.title}
  description={courseHeader.description}
  {...courseHeader}
  theme={theme}
/>;
```

---

## 📋 Mapeamento de Componententes por Seção

O JSON do CMS usa `componentName` para indicar qual componente usar:

| componentName                            | Componente        | Uso                  |
| ---------------------------------------- | ----------------- | -------------------- |
| `course-header.course-header-section-v2` | CourseHeader      | Hero section         |
| `media-with-text.template-bullets`       | MediaWithText     | Seções com imagem    |
| `blocks.blocks-section`                  | ItemGrid          | Grade de cards       |
| `carousel.carousel-section`              | CarouselSection   | Carrossel            |
| `faq.faq-section`                        | FAQSection        | Perguntas frequentes |
| Personalizado                            | CurriculumSection | Grade de disciplinas |

---

## 🎨 Exemplos de Uso

### CourseHeader

```tsx
<CourseHeader
  title="Administração de Condomínios"
  description="Transforme sua carreira em 6 meses..."
  certificationType="Profissionalizante"
  image={{
    url: "https://cdn.../image.png",
    alt: "Descrição",
  }}
  breadcrumbs={[
    { label: "Início", slug: "/" },
    { label: "Cursos", slug: "/cursos" },
    { label: "Administração", slug: "#" },
  ]}
  duration="6 meses"
  learningModels={[
    {
      id: 1,
      title: "Digital (EAD)",
      description: "Estude onde quiser...",
    },
  ]}
  button={{
    type: "primario_conversao",
    label: "Inscreva-se",
    link: "https://...",
  }}
  theme={theme}
/>
```

### MediaWithText

```tsx
<MediaWithText
  title="Objetivos do Curso"
  description="Capacitar a gerenciar..."
  image={imageData}
  bullets={[
    {
      title: "Gestão de Equipes",
      description: "Desenvolver habilidades de liderança...",
    },
    {
      title: "Comunicação",
      description: "Ensinar técnicas de comunicação eficaz...",
    },
  ]}
  position="right"
  variant="neutral"
/>
```

### ItemGrid

```tsx
<ItemGrid
  title="Competências Desenvolvidas"
  items={[
    {
      id: 1,
      title: "Liderança",
      description: "Desenvolver habilidades de liderança...",
    },
    {
      id: 2,
      title: "Trabalho em Equipe",
      description: "Aprender a colaborar efetivamente...",
    },
  ]}
  columns={3}
  mode="primary"
/>
```

### CarouselSection

```tsx
<CarouselSection
  title="Área de Atuação"
  items={[
    {
      id: 1,
      title: "Assistente de Administração",
      description: "Auxilia na gestão...",
      image: imageData,
    },
  ]}
  mode="primary"
/>
```

### FAQSection

```tsx
<FAQSection
  title="Perguntas Frequentes"
  items={[
    {
      id: 1,
      title: "O que faz um administrador?",
      detail: "O administrador é responsável por...",
    },
  ]}
  button={{
    type: "primary",
    label: "Fale Conosco",
    link: "https://...",
  }}
  textCta="Ainda com dúvidas?"
/>
```

### CurriculumSection

```tsx
<CurriculumSection
  title="Grade de Disciplinas"
  disciplines={[
    {
      name: "Habilidades Comportamentais",
      hours: 40,
      period: "obrigatória",
    },
  ]}
  mode="neutral"
/>
```

---

## 🔧 Integração Passo a Passo

### Passo 1: Preparar Dados

```tsx
// Dentro de page.tsx
const course = await fetchCourseData(slug);
const { theme } = await fetchThemeData();

// Preparar dados para cada seção
const courseHeader = findFirstSection(
  course.body,
  "course-header.course-header-section-v2"
);
const mediaWithTextSections = filterSectionsByType(
  course.body,
  "media-with-text.template-bullets"
);
const blocksSections = filterSectionsByType(
  course.body,
  "blocks.blocks-section"
);
```

### Passo 2: Renderizar Componentes

```tsx
return (
  <main className="bg-white">
    {/* Header */}
    {courseHeader && (
      <CourseHeader {...formatCourseHeader(courseHeader)} theme={theme} />
    )}

    {/* Seções Media + Text */}
    {mediaWithTextSections.map((section) => (
      <MediaWithText key={section.id} {...formatMediaWithText(section)} />
    ))}

    {/* Cards em Grid */}
    {blocksSections.map((section) => (
      <ItemGrid key={section.id} {...formatBlocksSection(section)} />
    ))}
  </main>
);
```

### Passo 3: Funções de Formatação

```tsx
// lib/formatters.ts
export function formatCourseHeader(raw: any) {
  return {
    title: raw.title,
    description: raw.description,
    image: raw.backgroundImage,
    breadcrumbs: formatBreadcrumbs(raw.breadcrumb.slugs, raw.breadcrumb.labels),
    duration: formatDuration(raw.metadata?.duration),
    certificationType: raw.certificationType,
    learningModels: raw.learningModels,
    button: raw.button,
  };
}

export function formatMediaWithText(raw: any) {
  return {
    title: raw.templateTitle,
    description: raw.templateBullets.templateDescription,
    image: raw.imageDesktop,
    imageMobile: raw.imageMobile,
    bullets: raw.templateBullets.bullets,
    position: raw.position.toLowerCase(),
    variant: raw.mode.toLowerCase(),
    button: raw.templateButton?.[0],
  };
}
```

---

## 💾 Tratamento de Dados

### Estrutura Esperada (JSON)

```json
{
  "course": {
    "pageName": "Curso",
    "body": [
      {
        "componentName": "course-header.course-header-section-v2",
        "title": "...",
        "description": "..."
      }
    ],
    "metadata": {
      "duration": "SEIS_MESES",
      "certification": "PROFISSIONALIZANTE"
    }
  },
  "theme": {
    "primaryActionColorPure": "#144BC8",
    "secondaryActionColorPure": "#EE325D",
    ...
  }
}
```

### Parsing com Type Safety

```tsx
import type { Course, ThemeColors } from "./lib/types";
import { findFirstSection, formatDuration } from "./lib/utils";

const typedCourse: Course = courseData;
const header = findFirstSection(
  typedCourse.body,
  "course-header.course-header-section-v2"
);
const duration = formatDuration(typedCourse.metadata.duration);
```

---

## 🎨 Customização

### Cores Dinâmicas

```tsx
import { generateThemeStyles } from './lib/theme-mapper';

// Gerar CSS variables
const themeStyles = generateThemeStyles(theme);

// Usar em elemento root
<div style={themeStyles}>
  {/* Componentes */}
</div>

// Ou em CSS
:root {
  --color-primary-pure: #144BC8;
  --color-secondary-pure: #EE325D;
  ...
}
```

### Variantes de Cor

```tsx
// Neutral (padrão)
<ItemGrid mode="neutral" />

// Primary (destaque)
<ItemGrid mode="primary" />
```

### Tamanhos e Layouts

```tsx
// Grid de 3 colunas
<ItemGrid columns={3} />

// Grid de 4 colunas
<ItemGrid columns={4} />

// Carousel
<CarouselSection columns={3} />
```

---

## ⚠️ Troubleshooting

### Componentes não aparecem

```tsx
// ✅ Certifique-se que está importando
import { CourseHeader } from "./components/course-header";

// ✅ Verifique se dados estão corretos
console.log("course:", course);
console.log("theme:", theme);

// ✅ Verifique JSX
{
  courseHeader && <CourseHeader {...props} />;
}
```

### Tema não aplicando

```tsx
// ✅ Passe theme prop
<CourseHeader theme={theme} {...props} />

// ✅ Verifique estrutura ThemeColors
// Em lib/types.ts

// ✅ Use browser devtools
// Inspect Element > Styles > CSS variables
```

### Imagens não carregam

```tsx
// ✅ Verifique URL da imagem
console.log(image.url);

// ✅ Adicione alt text
image={{ url: "...", alt: "Descrição" }}

// ✅ Verifique CORS se de CDN externo
// Adicionar em next.config.js se necessário
```

---

## 📊 Performance Tips

### 1. Lazy Load Sections

```tsx
import dynamic from "next/dynamic";

const RelatedCourses = dynamic(() => import("./components/related-courses"));

// Componente aparecerá apenas quando necessário
<Suspense fallback={<LoadingSkeleton />}>
  <RelatedCourses {...props} />
</Suspense>;
```

### 2. Otimizar Imagens

```tsx
// ✅ Use Next.js Image
import Image from 'next/image';
<Image src={url} alt={alt} fill className="object-cover" />

// ✅ Especifique dimensões
<Image src={url} alt={alt} width={400} height={300} />
```

### 3. Memoizar Dados

```tsx
const courseHeader = useMemo(
  () => findFirstSection(course.body, "course-header..."),
  [course.body]
);
```

---

## ✅ Checklist de Implementação

- [ ] Todos os arquivos criados com sucesso
- [ ] Types importáveis de `lib/types.ts`
- [ ] Funções utilitárias funcionando
- [ ] Componentes renderizando sem erros
- [ ] Theme aplicando corretamente
- [ ] Imagens otimizadas
- [ ] Breadcrumb dinâmico funcionando
- [ ] Accordions expansíveis
- [ ] Carousels navegáveis
- [ ] Botões linkando corretamente
- [ ] Responsivo em mobile/tablet/desktop
- [ ] Acessibilidade ok (keyboard nav, ARIA)

---

## 📞 Próximos Passos

1. **Integração Real com CMS**

   - Implement `fetchCourseData(slug)`
   - Setup caching strategy
   - Error handling

2. **SEO**

   - Meta tags dinâmicos
   - Structured data
   - OG images

3. **Analytics**

   - Track eventos de clique
   - Monitor time on page
   - Form submissions

4. **Testes**
   - Unit tests (Jest)
   - E2E tests (Cypress)
   - Visual regression (Percy)

---

**Última atualização:** 13 de janeiro de 2026  
**Versão:** 1.0.0
